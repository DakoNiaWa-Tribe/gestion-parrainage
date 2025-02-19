from fastapi import FastAPI, status, HTTPException
from .routers import electeur, admin, candidat
from app.database import connectionDb

# Création de l'application FastAPI
app = FastAPI()

def periode_parrainage():
    """
    Fonction pour vérifier si la période de parrainage est ouverte ou fermée.
    Si elle est ouverte, les routes pour les administrateurs, candidats et électeurs sont incluses.
    """
    try:
        # Connexion à la base de données
        with connectionDb() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT etat FROM periode_parrainage")
                value = cursor.fetchone()

                if value and value[0] == "ouvert":
                    app.include_router(admin.router)
                    app.include_router(candidat.router)
                    app.include_router(electeur.router)
                else:
                    return {"message": "La période de parrainage est fermée."}

    except Exception as e:
        print(f"Erreur lors de la vérification de la période de parrainage : {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur interne du serveur lors de la vérification de la période de parrainage."
        )

periode_parrainage()

@app.get('/')
def read_root():
    return {"message": "Bienvenue sur l'API de parrainage ! La base de données est connectée."}