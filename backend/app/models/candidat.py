from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date

class ElecteurCheckRequesCandidat(BaseModel):
    numero_electeur: str

class ElecteurCheckResponse(BaseModel):
    nom: str
    prenom: str
    date_naissance: date

class CadidatRegistration(BaseModel):
    adresse_mail: str
    numero_tel: EmailStr
    nom_parti: Optional[str] = None
    slogan: Optional[str]=None
    photo: Optional[str]=None
    url_page: Optional[str]=None

class SecurityResponse(BaseModel):
    code_securite= str
    email: EmailStr
    numero_tel: str

