from fastapi import FastAPI
from app.routers import electeur, admin, candidat, auth
from fastapi.middleware.cors import CORSMiddleware
# Création de l'application FastAPI
app = FastAPI()

# Ajouter le middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "https://frontend-electeur.vercel.app"],  # Autorise uniquement localhost:4200 angualar et localhost:5173 react
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les en-têtes
)



app.include_router(admin.router)
app.include_router(candidat.router)
app.include_router(electeur.router)
app.include_router(auth.router)


@app.get('/')
def read_root():
    return {"message": "Bienvenue sur l'API de parrainage ! La base de données est connectée."}
