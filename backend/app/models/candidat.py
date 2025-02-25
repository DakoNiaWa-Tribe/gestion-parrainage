from fastapi import UploadFile
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
    adresse_mail: EmailStr
    numero_tel: str
    nom_parti: Optional[str] = None
    slogan: Optional[str]=None
    couleur_parti_1: Optional[str]=None
    couleur_parti_2: Optional[str]=None
    couleur_parti_3: Optional[str]=None
    url_page: Optional[str]=None

class SecurityResponse(BaseModel):
    code_securite: str
    email: EmailStr
    numero_tel: str

