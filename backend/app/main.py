from fastapi import FastAPI
from .routers import electeur, admin, candidat

app = FastAPI()

app.include_router(admin.router)
app.include_router(candidat.router)


@app.get('/')
def read_root():
    return {"Message":"Hello to the api db connected"}

