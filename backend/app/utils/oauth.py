from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.models import auth
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/admin/login")

def createAcessToken(data: dict):
    toEncode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    toEncode.update({"exp": expire})

    encodedJwt = jwt.encode(toEncode, SECRET_KEY, ALGORITHM)
    

    return encodedJwt

def verifyAccessToken(token: str):
    credentialException = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                        detail=f"Impossoble de valider le token",
                                        headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, ALGORITHM)

        id = payload.get("user_id")
        print(id)

        if id is None:
            raise credentialException
        
        tokenData = auth.TokenData(user_id=str(id))

        return tokenData
    except JWTError as error:
        print(error)
        raise credentialException
    


def getCurrentUser(token: str = Depends(oauth2_scheme)):
    return verifyAccessToken(token)


