from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration, ParrainerCandidatCheckRequest, ParrainerCandidatAuth
from app.controllers.electeur import parrainerCandidatCheck, confirmationParrainRegistration, electeurAuth
# from app.utils.notifications import send_sms #, send_email

router = APIRouter(prefix="/electeur", tags=["Électeurs"])

@router.post("/parrain-registration/")
async def parrain_registration(data: ElecteurCheckResponse):
    """Route pour enregistrer un parrain après vérification de son existence sur la liste électorale."""
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT * FROM electeurs 
            WHERE cni = %s AND numero_electeur = %s AND nom = %s AND bureau_vote = %s
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        isValid = cursor.fetchone()

        if isValid is None:
            return {"message": "Vous ne figurez pas sur la liste des électeurs."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("""
            INSERT INTO parrain_electeurs (cni, numero_electeur, nom, bureau_vote)
            VALUES (%s, %s, %s, %s)
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        conn.commit()

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")
    
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK


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