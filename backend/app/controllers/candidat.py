from fastapi import HTTPException, status, File
from app.database import connectionDb
from app.models.candidat import CadidatRegistration
import string
import random
from pathlib import Path
import uuid
import os
import base64


def generate_random_code(length=8):
    characters = string.ascii_uppercase + string.digits
    random_code = ''.join(random.choice(characters) for _ in range(length))
    return random_code

async def savePhoto(photo: File):
    UPLOAD_DIR = "uploads"
    Path(UPLOAD_DIR).mkdir(exist_ok=True)

    photo_path = None
    if not photo:
        return None

    try:
        file_extension = photo.filename.split(".")[-1] if "." in photo.filename else ""
        unique_filename = f"{uuid.uuid4()}.{file_extension}" if file_extension else f"{uuid.uuid4()}"
        photo_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save the photo
        with open(photo_path, "wb") as buffer:
            buffer.write(await photo.read())
        
        return unique_filename
    except Exception as e:
        print(f"Error saving photo: {e}")
        return None
    
def regeneratCode(numeroElecteur):
    try:
        codeSecurite = generate_random_code()
        conn = connectionDb()
        cursor =  conn.cursor()

        cursor.execute("""
            UPDATE candidats set code_securite = %s WHERE numero_electeur = %s
    """, (codeSecurite, numeroElecteur,))
        conn.commit()
        cursor.close()
        conn.close()
        return {
            "codeSecurite": codeSecurite,
            "Message": "Code de securite regenere avec succes",
            "status_code": status.HTTP_200_OK
            }
    except Exception as error:
        print(f"Error: {error}")
        return False


# def getAllCandidat():
#     try:
#         conn = connectionDb()
#         cursor = conn.cursor()

#         cursor.execute("""
#             SELECT * FROM candidats
#         """)

#         result = cursor.fetchall()

#         candidats = []
#         for row in result:
#             candidat = {
#                 "numero_electeur": row[0],
#                 "nom": row[1],
#                 "prenom": row[2],
#                 "date_naissance": row[3],
#                 "email": row[4],
#                 "telephone": row[5],
#                 "parti_politique": row[6],
#                 "slogan": row[7],
#                 "photo_url": row[8],  # This should match the photo field in your DB schema
#                 "couleur_parti_1": row[9],
#                 "page_info_url": row[10],
#                 "code_securite": row[11],
#                 "couleur_parti_2": row[12],
#                 "couleur_parti_3": row[13]
#             }

#             # Read the photo file and encode it in base64
#             photo_path = os.path.join("uploads", row[8])  # Corrected index
#             if os.path.exists(photo_path):
#                 with open(photo_path, "rb") as photo_file:
#                     candidat["photo"] = base64.b64encode(photo_file.read()).decode('utf-8')
#             else:
#                 candidat["photo"] = None

#             candidats.append(candidat)

#         return candidats
#     except Exception as error:
#         print(f"Erreur: {error}")
#         return None
#     finally:
#         if cursor:
#             cursor.close()
#         if conn:
#             conn.close()

def checkElecteurCheckRequesCandidat(numeroElecteur: str):
    try:
        conn = connectionDb()
        if conn is None:
            raise HTTPException(status_code=500, detail={"erreur": "Erreur de connexion à la base de données"})

        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM electeurs")
        electeurCount = cursor.fetchone()[0]

        if electeurCount <= 0:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={"Action impossible": "Veuillez contacter l'administrateur"}
            )

        cursor.execute("SELECT COUNT(*) FROM electeurs WHERE numero_electeur = %s", (numeroElecteur,))
        isCandidatFound = cursor.fetchone()[0]

        cursor.execute("""
                       SELECT nom, prenom, date_naissance FROM electeurs WHERE numero_electeur = %s
                       """,(numeroElecteur,))
        candidatFound = cursor.fetchone()
        print(candidatFound)

        return candidatFound
    except Exception as error:

        print(f"MySQL Error: {error}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"erreur": "Erreur interne de la base de données"}
        )

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        
async def saveCandidature(
        numeroElecteur: str,
        candidat: CadidatRegistration,
        filename: str | None = None
        ):
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT nom, prenom, date_naissance FROM electeurs WHERE numero_electeur = %s                 
        """, (numeroElecteur,))

        result = cursor.fetchall()
        nom = result[0][0]
        prenom = result[0][1]
        dateNaissance = result[0][2]
        codeSecurite = generate_random_code()

        print(f"code de securite {codeSecurite}")

        cursor.execute("""
            INSERT INTO candidats(numero_electeur, nom, prenom, date_naissance, email,
                    telephone, parti_politique, slogan, photo_url, couleur_parti_1,
                    page_info_url, code_securite, couleur_parti_2, couleur_parti_3)
            VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
        """, (numeroElecteur, nom, prenom, dateNaissance, candidat["adresse_mail"], candidat["numero_tel"], candidat["nom_parti"],
            candidat["slogan"], filename,candidat["couleur_parti_1"],
            candidat["url_page"], codeSecurite, candidat["couleur_parti_2"], candidat["couleur_parti_3"],
            ))
        conn.commit()
        cursor.close()
        conn.close()
    
    except Exception as error:
        print(error)
        return False
    
    return True
