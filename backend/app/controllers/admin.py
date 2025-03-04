import mysql.connector
from app.database import connectionDb
import mysql
import csv
from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request, status
import mysql.connector
from app.database import connectionDb
import mysql
from app.controllers import admin
from app.models import auth
from app.utils import oauth

async def uploadElecteurCsv(
    request: Request,
    file: UploadFile=File(...), 
    checksum: str = Form(...),
    userId: int = Form(...)
):
        conn = connectionDb()
        if conn:
            cursor = conn.cursor()

        cursor.execute("""
            SELECT etat_upload_electeurs from etat_import
        """)
        etatUpload = cursor.fetchone()


        if etatUpload is None:
            raise HTTPException(status_code=400, detail="Aucune donnée trouvée pour etat_upload_electeurs")

        etatUpload = etatUpload[0]

        if(etatUpload == 0): 
           return HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
                )
        
            

        if file.content_type != "text/csv":
            raise HTTPException(status_code=400, detail={"error": "invalid file type"})
        
        ipAdress = request.client.host
        contents = await file.read()

        isValid = admin.controler_fichier_db(userId, ipAdress, checksum, contents)
        if not isValid:
            raise HTTPException(status_code=400, detail="echec: fichier altere ou encodage incorrect")

        csvReader = csv.DictReader(contents.decode('UTF-8').splitlines())
        
        cursor = conn.cursor()

        for row in csvReader:
            numeroElecteur = row['numero_electeur']
            cni = row['cni']
            nom = row['nom']
            prenom = row['prenom']
            dateNaiss = row['date_naissance']
            lieuNaiss = row['lieu_naissance']
            sexe = row['sexe']
            bureauVote = row['bureau_vote']

            cursor.execute(""" 
                INSERT INTO temp_electeurs(numero_electeur, cni, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote)
                    VALUES(%s, %s, %s, %s, %s, %s, %s, %s) 
            """, (numeroElecteur, cni, nom, prenom, dateNaiss, lieuNaiss, sexe, bureauVote))

        conn.commit()
        cursor.close()
        conn.close()

def controler_fichier_db(userId, ipAdresse, fileCheckSum, fileContent):
    try:
        conn = connectionDb()
        cursor = conn.cursor()

        result = None
        errorMessage = None

        cursor.execute( """ SELECT ControlerFichierElecteurs(%s, %s, %s, %s)""",
                       (userId, ipAdresse, fileCheckSum, fileContent))
        
        result = cursor.fetchone()[0]

        conn.commit()
        cursor.close()
        conn.close()
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="Cannot proceed")

    return result 

async def controlerElecteur():
    try:
        conn = connectionDb()
        cursor = conn.cursor()

        cursor.execute(""" 
            SELECT cni, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe
            FROM temp_electeurs
        """)
        records = cursor.fetchall()
        cursor.execute("""
        SELECT COUNT(*) from uploads 
    """)
        uploadAttemps = cursor.fetchone()[0]
        print(uploadAttemps)
        cursor.execute("""
        SELECT COUNT(*) from temp_electeurs 
    """)
        tempElecteurCount =  cursor.fetchone()[0]

        if tempElecteurCount <= 0 :
            return 0

        for record in records:
            num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe = record

            cursor.execute(
                """
                SELECT ControlerElecteurs(%s ,%s, %s, %s, %s, %s, %s, %s)
            """, (uploadAttemps, num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe))
            
            result = cursor.fetchone()[0]

            # Si la fonction retourne 0, retourner 0 immédiatement
            if result == 0:
                cursor.close()
                conn.close()
                return 0

        cursor.close()
        conn.close()
        return 1

    except mysql.connector.Error as error:
        print(f"Erreur MySQL: {error}")
        raise HTTPException(status_code=500, detail="Unexcepted error")

def validerImportation():
    try:
        conn = connectionDb()
        cursor = conn.cursor()

        cursor.execute("CALL ValiderImportation")
        conn.commit()
        conn.close()

    except mysql.connector.Error as error:
        print(error)


def controlerEtatImport():
    conn = connectionDb()
    print(conn)
    if conn:
        cursor = conn.cursor()

    cursor.execute("""
        SELECT etat_upload_electeurs from etat_import
    """)
    etatUpload = cursor.fetchone()[0]
    print(etatUpload)
    return etatUpload

def adminLogin(data):
    conn = connectionDb()
    if conn:
        cursor = conn.cursor()
    
    cursor.execute("""
        SELECT * from admin_users WHERE username = %s AND password = %s           
    """, (data.username, data.password,))

    result = cursor.fetchone()
    print(result[0])

    accessToken = oauth.createAcessToken(data={"user_id": result[0], "name": result[3]})

    if result is None:
        return HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail={"erreur": "nom utilisateur ou mot de passe incorrect"})
    
    return {
        "message": "Connexion avec succes",
        "admin_info":[{
            "id": result[0],
            "name": result[3]
    }],
        "access_token": accessToken,
        "status_code": status.HTTP_200_OK
    }
