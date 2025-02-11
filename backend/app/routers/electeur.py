from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request
from app.Database import connectionDb


electeurData = [
    {
        "id": 1234,
        "numero_electeur": "134566",
        "numero_id_national": "892478210",
        "nom_famille": "seck"
    },
    {
        "id": 9983,
        "numero_electeur": "2383722",
        "numero_id_national": "387626137",
        "nom_famille": "Sambe"
    }
]

router = APIRouter()

def controler_fichier_db(userId, ipAdresse, fileCheckSum, fileContent):
    try:
        conn = connectionDb()
        cursor = conn.cursor()

        result = None
        errorMessage = None

        cursor.execute( """ SELECT ControlerFichierElecteurs(%s, %s, %s, %s)""",
                       (userId, ipAdresse, fileCheckSum, fileContent))
        
        result = cursor.fetchone()[0]

        conn.commit()
        cursor.close()
        conn.close()
    except Exception as error:
        print(error)
        raise HTTPException(status_code=500, detail="Cannot proceed")

    return result 


@router.post('/electeur/upload_csv/')
async def electeur_upload_csv(
    request: Request,
    file: UploadFile=File(...), 
    checksum: str = Form(...),
    userId: int = Form(...)
    ):

    if file.content_type != "text/csv":
        raise HTTPException(status_code=400, detail={"error": "invalid file type"})
    
    ipAdress = request.client.host
    contents = await file.read()

    isValid = controler_fichier_db(userId, ipAdress, checksum, contents)

    if not isValid:
        raise HTTPException(status_code=400, detail="echec: fichier altere ou encodage incorrect")
    
    return {"message": "Fichier accepte et en attente de validation"}


@router.get('/electeur/get_electeur')
def get_electeur():
    return electeurData