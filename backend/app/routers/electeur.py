from fastapi import APIRouter, HTTPException, status, BackgroundTasks
from app.database import connectionDb
from app.models.electeur import ElecteurCheckResponse, ElecteurRegistration
from app.utils.notifications import send_sms #, send_email

router = APIRouter()

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
        validoupas = cursor.fetchone()

        if validoupas is None:
            return {"message": "Vous ne figurez pas sur la liste des électeurs."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("""
            INSERT INTO parrain_electeurs (cni, numero_electeur, nom, bureau_vote)
            VALUES (%s, %s, %s, %s)
        """, (data.numero_id_national, data.numero_electeur, data.nom_famille, data.numero_bureau))
        conn.commit()

        cursor.execute("INSERT INTO contact_parrain (cni) VALUES (%s)", (data.numero_id_national,))
        conn.commit()

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")
    
    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme parrain"}, status.HTTP_200_OK


@router.post("/electeur-registration/")
async def electeur_registration(data: ElecteurRegistration, background_tasks: BackgroundTasks):
    """Route pour enregistrer un électeur et lui envoyer un email et un SMS."""
    conn = connectionDb()
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM contact_parrain WHERE cni = %s", (data.numero_id_national,))
        if cursor.fetchone():
            return {"message": "Vous figurez déjà sur la liste."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("SELECT * FROM contact_parrain WHERE numero_tel = %s", (data.numero_tel,))
        if cursor.fetchone():
            return {"message": "Numéro de téléphone déjà utilisé."}, status.HTTP_400_BAD_REQUEST
        
        cursor.execute("SELECT * FROM contact_parrain WHERE email = %s", (data.adresse_mail,))
        if cursor.fetchone():
            return {"message": "Email déjà utilisé."}, status.HTTP_400_BAD_REQUEST

        cursor.execute("""
            UPDATE contact_parrain 
            SET numero_tel = %s, email = %s 
            WHERE cni = %s
        """, (data.numero_tel, data.adresse_mail, data.numero_id_national))
        conn.commit()

        message_sms = "Votre inscription est confirmée."
        message_email = "Bienvenue, votre inscription a été validée."
        
        background_tasks.add_task(send_sms, data.numero_tel, message_sms)
        background_tasks.add_task(send_email, data.adresse_mail, "Confirmation d'inscription", message_email)

    except Exception as e:
        print(f"Erreur : {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erreur interne du serveur")

    finally:
        cursor.close()
        conn.close()

    return {"message": "Vous avez été enregistré comme électeur"}, status.HTTP_200_OK

# def controler_fichier_db(userId, ipAdresse, fileCheckSum, fileContent):
#     try:
#         conn = connectionDb()
#         cursor = conn.cursor()

#         result = None
#         errorMessage = None

#         cursor.execute( """ SELECT ControlerFichierElecteurs(%s, %s, %s, %s)""",
#                        (userId, ipAdresse, fileCheckSum, fileContent))
        
#         result = cursor.fetchone()[0]

#         conn.commit()
#         cursor.close()
#         conn.close()
#     except Exception as error:
#         print(error)
#         raise HTTPException(status_code=500, detail="Cannot proceed")

#     return result 

# def controlerElecteur():
#     try:
#         conn = connectionDb()
#         cursor = conn.cursor()

#         # Sélectionner les enregistrements de la table temp_electeurs
#         cursor.execute(""" 
#             SELECT cni, numero_electeur, nom, prenom, date_naissance, lieu_naissance, sexe
#             FROM temp_electeurs
#         """)
#         records = cursor.fetchall()
#         cursor.execute("""
#         SELECT COUNT(*) from uploads 
#     """)
#         uploadAttemps = cursor.fetchone()[0]
#         print(uploadAttemps)

#         for record in records:
#             num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe = record

#             cursor.execute(
#                 """
#                 SELECT ControlerElecteurs(%s ,%s, %s, %s, %s, %s, %s, %s)
#             """, (uploadAttemps, num_cni, num_electeur, nom, prenom, date_naissance, lieu_naissance, sexe))
            
#             result = cursor.fetchone()[0]

#             # Si la fonction retourne 0, retourner 0 immédiatement
#             if result == 0:
#                 cursor.close()
#                 conn.close()
#                 return 0

#         cursor.close()
#         conn.close()
#         return 1

#     except mysql.connector.Error as error:
#         print(f"Erreur MySQL: {error}")
#         raise HTTPException(status_code=500, detail="Unexcepted error")

# def validerImportation():
#     try:
#         conn = connectionDb()
#         cursor = conn.cursor()

#         cursor.execute("CALL ValiderImportation")
#         conn.commit()
#         conn.close()

#     except mysql.connector.Error as error:
#         print(error)



# @router.post('/electeur/upload_csv/')
# async def electeur_upload_csv(
#     request: Request,
#     file: UploadFile=File(...), 
#     checksum: str = Form(...),
#     userId: int = Form(...)
#     ):
#     try:
#         conn = connectionDb()
#         print(conn)
#         if conn:
#             cursor = conn.cursor()

#         cursor.execute("""
#             SELECT etat_upload_electeurs from etat_import
#         """)
#         etatUpload = cursor.fetchone()[0]
#         print(etatUpload)

#         if(etatUpload == 0): 
#            return HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
#                 )
#         if (file is None | checksum is None | userId is None) :
#             raise HTTPException(status_code=400, detail={"error": "provide all the required field"})
            

#         if file.content_type != "text/csv":
#             raise HTTPException(status_code=400, detail={"error": "invalid file type"})
        
#         ipAdress = request.client.host
#         contents = await file.read()

#         isValid = controler_fichier_db(userId, ipAdress, checksum, contents)
#         if not isValid:
#             raise HTTPException(status_code=400, detail="echec: fichier altere ou encodage incorrect")

#         csvReader = csv.DictReader(contents.decode('UTF-8').splitlines())
        
#         cursor = conn.cursor()

#         for row in csvReader:
#             numeroElecteur = row['numero_electeur']
#             cni = row['cni']
#             nom = row['nom']
#             prenom = row['prenom']
#             dateNaiss = row['date_naissance']
#             lieuNaiss = row['lieu_naissance']
#             sexe = row['sexe']
#             bureauVote = row['bureau_vote']

#             cursor.execute(""" 
#                 INSERT INTO temp_electeurs(numero_electeur, cni, nom, prenom, date_naissance, lieu_naissance, sexe, bureau_vote)
#                     VALUES(%s, %s, %s, %s, %s, %s, %s, %s) 
#             """, (numeroElecteur, cni, nom, prenom, dateNaiss, lieuNaiss, sexe, bureauVote))

#         conn.commit()
#         cursor.close()
#         conn.close()
#         return {"message": "Fichier accepte et en attente de validation"}
#     except Exception as error:
#         print(error)
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Veuillez verifier le fichier"})


# @router.post("/electeur/controlerElecteurs")
# def controler_electeur(request: Request):
#     try:
#         conn = connectionDb()
#         print(conn)
#         if conn:
#             cursor = conn.cursor()

#         cursor.execute("""
#             SELECT etat_upload_electeurs from etat_import
#         """)
#         etatUpload = cursor.fetchone()[0]
#         print(etatUpload)

#         if(etatUpload == 0): 
#            return HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
#                 )

#         isValid = controlerElecteur()
#         print(isValid)
#         if isValid == 0:
#             raise HTTPException(status_code=403, detail={"erreur":"tous les electeurs ne sont pas valides"})
        
#         return {"message": "Le fichier electoral est valide et pret à etre importer definitivement",
#                 "status_code": status.HTTP_200_OK
#                 }
#     except HTTPException as http_err:
#         print(http_err)
#         raise http_err
    
#     except Exception as error:
#         print(error)
#         raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  # Use 500 for internal server errors
#                 detail={"erreur": "Une erreur interne s'est produite lors du contrôle des électeurs"}
#             )


# @router.post("/electeur/valider_importation")
# async def valider_importation():
#     try:
#         conn = connectionDb()
#         print(conn)
#         if conn:
#             cursor = conn.cursor()

#         cursor.execute("""
#             SELECT etat_upload_electeurs from etat_import
#         """)
#         etatUpload = cursor.fetchone()[0]
#         print(etatUpload)

#         if(etatUpload == 0): 
#            return HTTPException(
#                 status_code=status.HTTP_403_FORBIDDEN,
#                 detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
#                 )
        
#         validerImportation()
#         conn.commit()
#         cursor.close
#         conn.close()
#         return {"message": "Transfere reuissi",
#                 "status_code": status.HTTP_200_OK
#                 }

#     except HTTPException as http_error:
#         print(http_error)
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
#     except mysql.connector.Error as err:
#         print(err)
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
    


