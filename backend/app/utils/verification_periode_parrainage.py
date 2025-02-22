from fastapi import HTTPException, status
from fastapi.responses import JSONResponse
from app.database import connectionDb

def verif_parrainage():
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT etat FROM periode_parrainage")
        etat = cursor.fetchone()
        if etat and etat[0] == 'ferme':
            return {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "message": "La période de parrainage est fermée."
            }

        return {
            "status_code": status.HTTP_200_OK,
            "message": "La période de parrainage est ouverte."
        }

    except Exception as e:
            print("Erreur:", e)
            raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    finally:
            cursor.close()
            conn.close()


