from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request, status
import mysql.connector
from app.database import connectionDb
import mysql
from app.controllers import admin


router = APIRouter(prefix="/admin", tags=["Admin"])



@router.post('/upload_electeur_csv/')
async def electeur_upload_csv(
    request: Request,
    file: UploadFile=File(...), 
    checksum: str = Form(...),
    userId: int = Form(...)
    ):
    try:
        result = await admin.uploadElecteurCsv(request, file, checksum, userId)
        return {
            "Message": result,
            "status_code": status.HTTP_200_OK
        }
    except Exception as error:
        print(error)
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail={"message": "Veuillez verifier le fichier"})


@router.post("/controler_electeurs")
async def controler_electeur(request: Request):
    try:
        etatImpotResult = admin.controlerEtatImport()
        print(etatImpotResult)
        if etatImpotResult == 0:
            return HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
            )

        isValid = await admin.controlerElecteur()
        print(isValid)
        if isValid == 0:
            return HTTPException(status_code=403, detail={"erreur":"tous les electeurs ne sont pas valides"})
        
        return {"message": "Le fichier electoral est valide et pret à etre importer definitivement",
                "status_code": status.HTTP_200_OK
                }
    except HTTPException as http_err:
        print(http_err)
        raise http_err
    
    except Exception as error:
        print(error)
        raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,  # Use 500 for internal server errors
                detail={"erreur": "Une erreur interne s'est produite lors du contrôle des électeurs"}
            )


@router.post("/valider_importation")
async def valider_importation():
    try:
        etatUpload = admin.controlerEtatImport()
        print(etatUpload)

        if(etatUpload == 0): 
           return HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Les uploads sont actuellement bloqués. Veuillez contacter l'administrateur."
                )
        
        admin.validerImportation()
        return {"message": "Transfere reuissi",
                "status_code": status.HTTP_200_OK
                }

    except HTTPException as http_error:
        print(http_error)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
    except mysql.connector.Error as err:
        print(err)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={"erreur": "erreur interne"})
    


