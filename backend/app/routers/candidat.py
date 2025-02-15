from fastapi import HTTPException, APIRouter, status, UploadFile, File, Form
from typing import Optional
from app.controllers import candidat

router = APIRouter(prefix="/candidat", tags=['Candidat'])

@router.post('/check_request')
def check_electeur_request_candidat(numero_electeur: str):
    try:
        result = candidat.checkElecteurCheckRequesCandidat(numero_electeur)
        if result is None:
            return {"Erreur": "La candidat n'est pas present dans le liste electoral",
                    "status_code": status.HTTP_404_NOT_FOUND}
        return {
            "message": "Candidat present dans le fichier electoral",
            "nom":f"{result[0]}",
            "prenom": f"{result[1]}",
            "date_de_naissance":f"{result[2]}",
            "status_code": status.HTTP_200_OK
        }
    
    except HTTPException as http_err:
        raise http_err

    except Exception as err:
        print(f"Unexpected Error: {err}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"erreur": "Une erreur inattendue s'est produite"}
        )
    
@router.post('/registration')
async def candidat_registration(
    numero_electeur: str,
    adresse_mail: str = Form(...),
    numero_tel: str = Form(...),
    nom_parti: Optional[str] = Form(None),
    slogan: Optional[str] = Form(None),
    couleur_parti_1: Optional[str] = Form(None),
    couleur_parti_2: Optional[str] = Form(None),
    couleur_parti_3: Optional[str] = Form(None),
    url_page: Optional[str] = Form(None),
    photo: UploadFile = File(None)
    ):
    try:
        result = candidat.checkElecteurCheckRequesCandidat(numero_electeur)
        print(result)
        if(result is False):
            return {
                "message": "le candidat n'est pas sur le fichier electoral",
                "status_code": status.HTTP_404_NOT_FOUND
            }
        print("Check finishing....")
        candidat_obj = {
            "adresse_mail": adresse_mail,
            "numero_tel": numero_tel,
            "nom_parti": nom_parti,
            "slogan": slogan,
            "couleur_parti_1": couleur_parti_1,
            "couleur_parti_2": couleur_parti_2,
            "couleur_parti_3": couleur_parti_3,
            "url_page": url_page
        }

        print("after json....")
        print("saving....")
        
        filename = await candidat.savePhoto(photo)
        isSaved = await candidat.saveCandidature(numero_electeur, candidat_obj, filename)

        if isSaved is False:
            return{
                "message":"L'enregistrement a echoue veuillez verifier la requete",
                "status_code": status.HTTP_400_BAD_REQUEST
            }
        return {
                "message":"Le candidat est enregiste avec succes",
                "candidat": candidat_obj,
                "status_code": status.HTTP_200_OK
                }
    except Exception as error:
        print({"error": error})

@router.get("/all")
def get_all_candidat():
    try:
        result = candidat.getAllCandidat()
        if result is None:
            return {
                "Message": "Pas de candidat enregistrer pour le moment",
                "status_code": status.HTTP_404_NOT_FOUND
            }
        
        return {
            "message": "Liste des candidats",
            "candidats": result,
            "status_code": status.HTTP_200_OK
        }
    except Exception as error:
        print(f"Error: {error}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"Erreur": "Veuillez verifier la requete"})
    
@router.post("/regenerer_code")
def regener_code(numero_electeur):
    try:
        result = candidat.regeneratCode(numero_electeur)

        if result is False:
            return {
                "message": "erreur lors de la regeneration du code",
                "status_code": status.HTTP_400_BAD_REQUEST
            }
        return result
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"erreur": error})
