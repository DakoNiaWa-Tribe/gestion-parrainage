from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request, status
import mysql.connector
from app.database import connectionDb
import mysql
import csv


router = APIRouter()

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

def controlerElecteur():
    try:
        conn = connectionDb()
        cursor = conn.cursor()

        # Sélectionner les enregistrements de la table temp_electeurs
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

@router.post('/admin/upload_electeur_csv/')
async def electeur_upload_csv(
    request: Request,
    file: UploadFile=File(...), 
    checksum: str = Form(...),
    userId: int = Form(...)
    ):
    try:
        conn = connectionDb()
        print(conn)
        if conn:
            cursor = conn.cursor()

        cursor.execute("""
            SELECT etat_upload_electeurs from etat_import
        """)
        etatUpload = cursor.fetchone()[0]
        print(etatUpload)

        if(etatUpload == 0): 
           return HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
                )
        if (file is None or checksum is None or userId is None) :
            raise HTTPException(status_code=400, detail={"error": "fournissez les champs necessaire"})
            

        if file.content_type != "text/csv":
            raise HTTPException(status_code=400, detail={"error": "invalid file type"})
        
        ipAdress = request.client.host
        contents = await file.read()

        isValid = controler_fichier_db(userId, ipAdress, checksum, contents)
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
        return {"message": "Fichier accepte et en attente de validation"}
    except Exception as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Veuillez verifier le fichier"})


@router.post("/admin/controler_electeurs")
def controler_electeur(request: Request):
    try:
        conn = connectionDb()
        print(conn)
        if conn:
            cursor = conn.cursor()

        cursor.execute("""
            SELECT etat_upload_electeurs from etat_import
        """)
        etatUpload = cursor.fetchone()[0]
        print(etatUpload)

        if(etatUpload == 0): 
           return HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
                )

        isValid = controlerElecteur()
        print(isValid)
        if isValid == 0:
            raise HTTPException(status_code=403, detail={"erreur":"tous les electeurs ne sont pas valides"})
        
        return {"message": "Le fichier electoral est valide et pret à etre importer definitivement",
                "status_code": status.HTTP_200_OK
                }
    except HTTPException as http_err:
        print(http_err)
        raise http_err
    
    except Exception as error:
        print(error)
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  # Use 500 for internal server errors
                detail={"erreur": "Une erreur interne s'est produite lors du contrôle des électeurs"}
            )


@router.post("/admin/valider_importation")
async def valider_importation():
    try:
        conn = connectionDb()
        print(conn)
        if conn:
            cursor = conn.cursor()

        cursor.execute("""
            SELECT etat_upload_electeurs from etat_import
        """)
        etatUpload = cursor.fetchone()[0]
        print(etatUpload)

        if(etatUpload == 0): 
           return HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
                )
        
        validerImportation()
        conn.commit()
        cursor.close
        conn.close()
        return {"message": "Transfere reuissi",
                "status_code": status.HTTP_200_OK
                }

    except HTTPException as http_error:
        print(http_error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
    except mysql.connector.Error as err:
        print(err)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
    


