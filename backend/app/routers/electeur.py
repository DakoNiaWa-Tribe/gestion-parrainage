from fastapi import FastAPI, File, UploadFile, HTTPException, APIRouter, Form
import csv
from io import StringIO
import hashlib


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

@router.get('/electeur/get_electeur')
def get_electeur():
    return electeurData

@router.post('/electeur/upload_csv/')
async def electeur_upload_csv(file: UploadFile=File(...), checksum: str = Form(...)):
    if file.content_type != "text/csv":
        return {"error": "invalid file type"}
    
    try:
        contents = await file.read()
        decoded_contents = contents.decode("UTF-8")

        recalculated_sum = hashlib.sha256(contents).hexdigest()
        print(recalculated_sum)

        if(recalculated_sum != checksum):
            raise HTTPException(
                status_code=400,
                detail="Le fichier a ete altere"
            )
        
    except UnicodeDecodeError:
        raise HTTPException(
            status_code=400, 
            detail="le fichier n'est pas en UTF-8!")

    csv_reader = csv.reader(StringIO(decoded_contents))
    rows = []

    for row in csv_reader:
        rows.append(row)

    return {
        "filename": file.filename, 
        "rows": rows
    }
