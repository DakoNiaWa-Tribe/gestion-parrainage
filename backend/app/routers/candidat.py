from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request, status
import mysql.connector
from app.database import connectionDb
import mysql

router = APIRouter()

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

        if isCandidatFound <= 0:
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={"Erreur": "Le candidat considéré n’est pas présent dans le fichier électoral"}
            )

        return {
            "message": "Candidat déjà enregistré !",
            "nom":f"{candidatFound[0]}",
            "prenom": f"{candidatFound[1]}",
            "date_de_naissance":f"{candidatFound[2]}",
            "status_code": status.HTTP_200_OK
        }

    except Exception as error:
        # Handle MySQL errors
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
        
@router.post('/candidat_check_request')
def check_electeur_request_candidat(numero_electeur: str):
    try:
        result = checkElecteurCheckRequesCandidat(numero_electeur)
        return result

    except HTTPException as http_err:
        raise http_err

    except Exception as err:
        print(f"Unexpected Error: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"erreur": "Une erreur inattendue s'est produite"}
        )

