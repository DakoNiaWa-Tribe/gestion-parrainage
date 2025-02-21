from fastapi import File, UploadFile, HTTPException, APIRouter, Form, Request, status
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from app.database import connectionDb
import mysql
from app.controllers import admin
from app.models import auth
from app.utils import oauth

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/login")
def login_admin(data: auth.AdminLoginRequest= Form()):
    try: 
        result = admin.adminLogin(data)
        return result
    except Exception as error:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail={"erreur": f"Une erreur s'est produite: {error}"})
        
