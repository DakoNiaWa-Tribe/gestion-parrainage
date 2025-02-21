from fastapi import FastAPI, status, HTTPException
from .routers import electeur, admin, candidat, auth
from app.database import connectionDb

# Création de l'application FastAPI
app = FastAPI()

app.include_router(admin.router)
app.include_router(candidat.router)
app.include_router(electeur.router)
app.include_router(auth.router)


@app.get('/')
def read_root():
    return {"message": "Bienvenue sur l'API de parrainage ! La base de données est connectée."}