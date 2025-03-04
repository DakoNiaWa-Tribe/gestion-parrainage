from typing import Optional
from pydantic import BaseModel
from datetime import date

class ElecteurCheckResponse(BaseModel):
    numero_electeur: str
    numero_id_national: str
    nom_famille: str
    numero_bureau: str

class ElecteurRegistration(BaseModel):
    numero_id_national: str
    numero_tel: str
    adresse_mail: str

class SecurityResponseElecteur(BaseModel):
    code_securite: str
    numero_tel: str
    adress_mail: str

class ParrainerCandidatCheckRequest(BaseModel):
    numero_electeur: str
    numero_id_national: str

class ParrainerCandidatAuth(BaseModel):
    numero_electeur: str
    numero_id_national: str
    nom_famille: str
    prenom: str
    numero_bureau: str
    code_securite: str

class ValiderParrainageRequest(BaseModel):
    numero_electeur: str
    id_candidat: str
    code_otp: str
