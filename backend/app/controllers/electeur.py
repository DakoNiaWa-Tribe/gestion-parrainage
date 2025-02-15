from fastapi import HTTPException, status, BackgroundTasks
from fastapi.responses import JSONResponse
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration
# from app.utils import send_sms #, send_email


async def parrain_registration(data: ElecteurCheckResponse):
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT * FROM electeurs WHERE cni = %s AND numero_electeur = %s AND nom = %s AND bureau_vote = %s
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        validoupas = cursor.fetchone()

        if validoupas is None:
            raise HTTPException(status_code=400, detail="Vous ne figurez pas sur la liste des électeurs.")

        cursor.execute("""
            INSERT INTO parrain_electeurs (cni, numero_electeur, nom, bureau_vote) 
            VALUES (%s, %s, %s, %s)
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        conn.commit()

        cursor.execute("""
            INSERT INTO contact_parrain (cni) VALUES (%s)
        """, (data.numero_id_national,))
        conn.commit()

    except Exception as e:
        print("Erreur:", e)
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK


async def electeur_registration(data: ElecteurRegistration, background_tasks: BackgroundTasks):
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM contact_parrain WHERE cni = %s", (data.numero_id_national,))
        if cursor.fetchone() is not None:
            raise HTTPException(status_code=400, detail="Vous figurez déjà sur la liste. KITT ICI")

        cursor.execute("SELECT * FROM contact_parrain WHERE numero_tel = %s", (data.numero_tel,))
        if cursor.fetchone() is not None:
            raise HTTPException(status_code=400, detail="Numéro déjà utilisé. KITT ICI")

        cursor.execute("SELECT * FROM contact_parrain WHERE email = %s", (data.adresse_mail,))
        if cursor.fetchone() is not None:
            raise HTTPException(status_code=400, detail="Email déjà utilisé. KITT ICI")

        cursor.execute("""
            UPDATE contact_parrain SET numero_tel = %s, email = %s WHERE cni = %s
        """, (data.numero_tel, data.adresse_mail, data.numero_id_national))
        conn.commit()

        # background_tasks.add_task(send_sms, data.numero_tel, "Votre inscription est confirmée.")
        #background_tasks.add_task(send_email, data.adresse_mail, "Confirmation d'inscription", "Votre inscription est réussie.")

    except Exception as e:
        print("Erreur:", e)
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK
