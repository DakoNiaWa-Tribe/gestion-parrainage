from fastapi import FastAPI, File, UploadFile, HTTPException
import csv
import mysql.connector
import os
from dotenv import load_dotenv, dotenv_values
from io import StringIO
from .routers import electeur

load_dotenv()
# database connection section
# mydb = mysql.connector.connect(
#     host=os.getenv("SQL_HOST"),
#     user=os.getenv("SQL_USERNAME"),
#     password=os.getenv("SQL_PASSWORD"),
#     database=os.getenv("SQL_DATABASE_NAME"),
#     port=os.getenv("SQL_PORT_TEST")
# )
# cursor = mydb.cursor()

#     if mydb :
#         print("Connection to db successfull")


# database connection section
mydb = mysql.connector.connect(
    host=os.getenv("SQL_HOST_TEST"),
    user=os.getenv("SQL_USERNAME_TEST"),
    password=os.getenv("SQL_PASSWORD_TEST"),
    database=os.getenv("SQL_DATABASE_NAME_TEST"),
    port=os.getenv("SQL_PORT_TEST")
)
cursor = mydb.cursor()

if mydb :
    print("Connection to db successfull")

app = FastAPI()

app.include_router(electeur.router)


@app.get('/')
def read_root():
    return {"Message":"Hello to the api db connected"}





# @app.post('/admin/upload')
# def upload_csv(data: electeurCreated):
#     # if f not 