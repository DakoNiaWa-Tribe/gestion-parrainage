from fastapi import FastAPI
import mysql.connector
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()
# database connection section
mydb = mysql.connector.connect(
    host=os.getenv("SQL_HOST"),
    user=os.getenv("SQL_USERNAME"),
    password=os.getenv("SQL_PASSWORD"),
    database=os.getenv("SQL_DATABASE_NAME"),
    port=3306
)

cursor = mydb.cursor()

if mydb :
    print("Connection to db successfull")


app = FastAPI()



@app.get('/')
def read_root():
    return {"Message":"Hello to the api db connected"}

# @app.post('/admin/upload')
# def upload_csv(data: electeurCreated):
#     # if f not 