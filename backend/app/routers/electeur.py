from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request
from app.database import connectionDb
import mysql
import csv


electeurData = [
    {
        "id": 1234,
        "numero_electeur": "134566",
        "numero_id_national": "892478210",
        "nom_famille": "seck"
    },
    {
        "id": 9983,
        "numero_electeur": "2383722",
        "numero_id_national": "387626137",
        "nom_famille": "Sambe"
    }
]

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
        cursor.execute(""" 
            SELECT cni, numero_electeur, nom, prenom, date_naissance, lieuNaissance, sexe
                        FROM temp_electeurs
        """)
        records = cursor.fetchall()
        for record in records:
            tentative_id, num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe = record

            cursor.execute(
                """
            SELECT ControlerElecteurs(%s, %s, %s, %s, %s, %s, %s, %s)
        """, (tentative_id, num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe))
            result = cursor.fetchone()[0]

            if(result == 0):
                conn.commit()
                cursor.close()
                conn.close()
                return result
        return 1
    except mysql.exception.Error as error:
        print(f"error: {error}")
        

@router.post('/electeur/upload_csv/')
async def electeur_upload_csv(
    request: Request,
    file: UploadFile=File(...), 
    checksum: str = Form(...),
    userId: int = Form(...)
    ):

    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail={"error": "invalid file type"})
    
    ipAdress = request.client.host
    contents = await file.read()

    isValid = controler_fichier_db(userId, ipAdress, checksum, contents)
    if not isValid:
        raise HTTPException(status_code=400, detail="echec: fichier altere ou encodage incorrect")

    csvReader = csv.DictReader(contents.decode('UTF-8').splitlines())
    
    conn = connectionDb()
    cursor = conn.cursor()

    for row in csvReader:
        print(row)
        numeroElecteur = row['numero_electeur']
        cni = row['cni']
        nom = row['nom']
        prenom = row['prenom']
        dateNaiss = row['date_naissance']
        lieuNaiss = row['lieu_naissance']
        sexe = row['sexe']

        cursor.execute(""" 
            INSERT INTO temp_electeurs(numero_electeur, cni, nom, prenom, date_naissance, lieu_naissance, sexe)
                VALUES(%s, %s, %s, %s, %s, %s, %s) 
        """, (numeroElecteur, cni, nom, prenom, dateNaiss, lieuNaiss, sexe))

    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Fichier accepte et en attente de validation"}


# @router.get('/electeur/controler-electeur/')
# async def controler_electeur():
#     try:
#         conn = connectionDb()
#         cur