from fastapi import UploadFile
from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import date

class AdminLoginRequest(BaseModel):
    username: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: str
    access_token: Optional[str] = None


