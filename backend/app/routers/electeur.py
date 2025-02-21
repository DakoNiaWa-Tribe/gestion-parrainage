from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration, ParrainerCandidatCheckRequest, ParrainerCandidatAuth
from app.controllers.electeur import parrainerCandidatCheck, confirmationParrainRegistration, electeurAuth, parrain_registration
# from app.utils.notifications import send_sms #, send_email

router = APIRouter(prefix="/electeur", tags=["Électeurs"])

@router.post("/parrain-registration/")
async def parrainRegistration(data: ElecteurCheckResponse):
    """Route pour enregistrer un parrain après vérification de son existence sur la liste électorale."""
    try:
        result = await parrain_registration(data)
        return result

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")
    

@router.post("/confirmation_parrain_registration/")
async def confirmation_parrain_registration(data: ElecteurRegistration, background_tasks: BackgroundTasks):
    """Route pour enregistrer un électeur et lui envoyer un email et un SMS."""
    try:
        result = await confirmationParrainRegistration(data, background_tasks)
        return result

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")
    
@router.post("/parrainer_candidat_check")
def parrainer_check(data: ParrainerCandidatCheckRequest):
    try:
        result = parrainerCandidatCheck(data)
        return result

    except Exception as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"erreur": error})

@router.post("/auth")
def auth(data: ParrainerCandidatAuth):
    try:
        result = electeurAuth(data)

        return result

    except Exception as error:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail={"erreur":"Erreur interne"})