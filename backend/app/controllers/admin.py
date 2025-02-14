from fastapi import HTTPException
import mysql.connector
from app.database import connectionDb
import mysql

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
