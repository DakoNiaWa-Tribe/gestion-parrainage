from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration
from app.utils.notifications import send_sms #, send_email

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
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM parrain_electeurs WHERE cni = %s", (data.numero_id_national,))
        if cursor.fetchone() is None:
            return {"message": "Vous ne figurez pas sur la liste."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("SELECT * FROM parrain_electeurs WHERE numero_tel = %s", (data.numero_tel,))
        if cursor.fetchone():
            return {"message": "Numéro de téléphone déjà utilisé."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("SELECT * FROM parrain_electeurs WHERE email = %s", (data.adresse_mail,))
        if cursor.fetchone():
            return {"message": "Email déjà utilisé."}, status.HTTP_400_BAD_REQUEST

        cursor.execute("""
            UPDATE parrain_electeurs 
            SET numero_tel = %s, email = %s 
            WHERE cni = %s
        """, (data.numero_tel, data.adresse_mail, data.numero_id_national))
        conn.commit()

        message_sms = "Votre inscription est confirmée."
        message_email = "Bienvenue, votre inscription a été validée."
        
        background_tasks.add_task(send_sms, data.numero_tel, message_sms)
        # background_tasks.add_task(send_email, data.adresse_mail, "Confirmation d'inscription", message_email)

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")

    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme électeur"}, status.HTTP_200_OK
