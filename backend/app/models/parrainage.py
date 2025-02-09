from pydantic import BaseModel, EmailStr
from datetime import date

class ParrainageResquest(BaseModel):
    numero_electeur: str
    numero_id_national: str

class ParrainageResponse(BaseModel):
    nom: str
    prenom: str
    date_naissance: date
    numero_bureau: str

class SelectCamdidatRequest(BaseModel):
    numero_electeur: str
    id_candidat: int

class SecurityResponse(BaseModel):
    email: EmailStr
    numero_tel: str
    code_security: str

class SecurityResponse(BaseModel):
    numero_electeur: str
    code_securite: str
