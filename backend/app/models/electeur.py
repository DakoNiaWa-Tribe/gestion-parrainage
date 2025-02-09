from typing import Optional
from pydantic import BaseModel
from datetime import date

class ElecteurCheckResponse(BaseModel):
    numero_electeur = str
    numero_id_national = str
    nom_famille = str
    numero_bureau = str

class ElecteurRegistration(BaseModel):
    numero_tel = str
    adresse_mail = str

class SecurityResponseElecteur(BaseModel):
    code_securite: str
    numero_tel: str
    adress_mail: str

# class Electeur(BaseModel):
#     id: int
#     numero_carte_elec: str
#     numero_carte_identite: str
#     nom: str
#     numero_bureau: int
#     numero_tel: str
#     adresse_mail: str
#     # has_voted: Optional[bool] 


