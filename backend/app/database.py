import os
from dotenv import load_dotenv, dotenv_values
import mysql.connector

load_dotenv()

def connectionDb():
    mydb = mysql.connector.connect(
        host=os.getenv("SQL_HOST_TEST"),
        user=os.getenv("SQL_USERNAME_TEST"),
        password=os.getenv("SQL_PASSWORD_TEST"),
        database=os.getenv("SQL_DATABASE_NAME_TEST"),
        port=os.getenv("SQL_PORT_TEST")
    )
    print("Connection to db successfull")
    return mydb
    # cursor = mydb.cursor()
