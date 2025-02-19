from fastapi import HTTPException, status, BackgroundTasks
from fastapi.responses import JSONResponse
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration, ParrainerCandidatCheckRequest, ParrainerCandidatAuth
from app.utils.codeGeneration import generate_random_code
# from app.utils import send_sms #, send_email

async def parrain_registration(data: ElecteurCheckResponse):
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            SELECT * FROM electeurs WHERE cni = %s AND numero_electeur = %s AND nom = %s AND bureau_vote = %s
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        isValid = cursor.fetchone()

        if isValid is None:
            raise HTTPException(status_code=400, detail="Vous ne figurez pas sur la liste des électeurs.")

        cursor.execute("""
            INSERT INTO parrain_electeurs (cni, numero_electeur, nom, bureau_vote, numero_tel, email) 
            VALUES (%s, %s, %s, %s)
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        conn.commit()

    except Exception as e:
        print("Erreur:", e)
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK


async def confirmationParrainRegistration(data: ElecteurRegistration, background_tasks: BackgroundTasks):
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM parrain_electeurs WHERE cni = %s", (data.numero_id_national,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=400, detail="Vous ne figurez pas sur la liste electoral")

        cursor.execute("SELECT * FROM parrain_electeurs WHERE numero_tel = %s", (data.numero_tel,))
        if cursor.fetchone() is not None:
            raise HTTPException(status_code=400, detail="Numéro déjà utilisé.")

        cursor.execute("SELECT * FROM parrain_electeurs WHERE email = %s", (data.adresse_mail,))
        if cursor.fetchone() is not None:
            raise HTTPException(status_code=400, detail="Email déjà utilisé.")
        
        codeSecurite = generate_random_code()
        print(codeSecurite)

        cursor.execute("""
            UPDATE parrain_electeurs SET numero_tel = %s, email = %s, code_securite = %s
                       WHERE cni = %s
        """, (data.numero_tel, data.adresse_mail, codeSecurite ,data.numero_id_national))
        conn.commit()
        message_sms = "Votre inscription est confirmée."
        message_email = "Bienvenue, votre inscription a été validée."

        # background_tasks.add_task(send_sms, data.numero_tel, "Votre inscription est confirmée.")
        #background_tasks.add_task(send_email, data.adresse_mail, "Confirmation d'inscription", "Votre inscription est réussie.")

    except Exception as e:
        print("Erreur:", e)
        raise HTTPException(status_code=500, detail="Erreur interne du serveur")
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK

def parrainerCandidatCheck(data: ParrainerCandidatCheckRequest):
    try:
        conn = connectionDb()
        if conn:
            cursor = conn.cursor()

        cursor.execute("""
            SELECT * FROM parrain_electeurs WHERE cni = %s AND numero_electeur = %s
        """, (data.numero_id_national, data.numero_electeur,))
        isValid = cursor.fetchone()
        
        if isValid is None:
            return{
                "message": "Vous etes pas un parrain electeur",
                "status_code": status.HTTP_404_NOT_FOUND
            }
        
        cursor.execute("""
            SELECT nom,prenom,date_naissance,bureau_vote  FROM electeurs
                       WHERE cni = %s AND numero_electeur = %s
        """,(data.numero_id_national, data.numero_electeur))
        result = cursor.fetchone()
        # print(result)
        
        return {
                "data": {
                    "nom": result[0],
                    "prenom": result[1],
                    "date_naissance": result[2],
                    "bureau_de_vote": result[3]
                },
                "status_code": status.HTTP_200_OK
        }

    except Exception as error:
        print(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                             detail={"Erreur": f"une erreur interne s'est produite"})
    
def electeurAuth(data: ParrainerCandidatAuth):
    try:
        isParrain = parrainerCandidatCheck(data)

        if isParrain is None:
            return {
                "message":"Vous n'etes pas parrain",
                "status_code": status.HTTP_404_NOT_FOUND
            }

        conn = connectionDb()
        if conn:
            cursor = conn.cursor()
        
        cursor.execute("""
            SELECT code_securite FROM parrain_electeurs WHERE numero_electeur = %s AND cni = %s
        """, (data.numero_electeur, data.numero_id_national,))

        dbCodeSecurite = cursor.fetchone()
        print(dbCodeSecurite)

        db_code = dbCodeSecurite[0].decode('utf-8') if isinstance(dbCodeSecurite[0], bytearray) else dbCodeSecurite[0]

        if data.code_securite != db_code:
            return {
                "message":"Authentification refuser, Veuillez verifier le code de securite",
                "status_code": status.HTTP_401_UNAUTHORIZED
            }
        cursor.execute("""
                  SELECT id, numero_electeur, nom, prenom, date_naissance, email, telephone,
                         parti_politique, slogan, photo_url, couleur_parti_1, page_info_url,
                         couleur_parti_2, couleur_parti_3
                  FROM candidats
            """)
        candidatData = cursor.fetchall()

        # Format candidate data into a list of dictionaries
        formatted_candidats = [
            {
                "id": candidat[0],
                "numero_electeur": candidat[1],
                "nom": candidat[2],
                "prenom": candidat[3],
                "date_naissance": candidat[4],
                "email": candidat[5],
                "telephone": candidat[6],
                "parti_politique": candidat[7],
                "slogan": candidat[8],
                "photo": f"/uploads/{candidat[9]}" if candidat[9] else None,
                "couleur_parti_1": candidat[10],
                "page_info_url": candidat[11],
                "couleur_parti_2": candidat[12],
                "couleur_parti_3": candidat[13]
            }
            for candidat in candidatData
        ]

        return {
            "message": "Authentication acceptee",
            "candidats": formatted_candidats,
            "status_code": status.HTTP_200_OK
        }
    except Exception as error:
        return{
            "erreur": f"{error}",
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR
        }
