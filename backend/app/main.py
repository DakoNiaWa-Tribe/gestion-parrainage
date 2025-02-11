from fastapi import FastAPI
from .routers import electeur

app = FastAPI()

app.include_router(electeur.router)


@app.get('/')
def read_root():
    return {"Message":"Hello to the api db connected"}

