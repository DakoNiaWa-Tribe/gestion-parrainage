import os
from dotenv import load_dotenv, dotenv_values
import mysql.connector

load_dotenv()

def connectionDb():
    # # LOCAL DATABASE
    # mydb = mysql.connector.connect(
    #     host=os.getenv("SQL_HOST_TEST"),
    #     user=os.getenv("SQL_USERNAME_TEST"),
    #     password=os.getenv("SQL_PASSWORD_TEST"),
    #     database=os.getenv("SQL_DATABASE_NAME_TEST"),
    #     port=os.getenv("SQL_PORT_TEST")
    # )

    # CLOUD FINAL DATABASE
    mydb = mysql.connector.connect(
        # host=os.getenv("SQL_HOST_CLOUD"),
        # user=os.getenv("SQL_USERNAME_CLOUD"),
        # password=os.getenv("SQL_PASSWORD_CLOUD"),
        # database=os.getenv("SQL_DATABASE_NAME_CLOUD"),
        # port=os.getenv("SQL_PORT_CLOUD")
        host="sql12.freesqldatabase.com",
        user="sql12765305",
        password="LsnEXdyJNc",
        database="sql12765305",
        port=3306
    )

    # CLOUD DATABASE TEST
    # mydb = mysql.connector.connect(
    #     host=os.getenv("SQL_HOST_CLOUD_TEST"),
    #     user=os.getenv("SQL_USERNAME_CLOUD_TEST"),
    #     password=os.getenv("SQL_PASSWORD_CLOUD_TEST"),
    #     database=os.getenv("SQL_DATABASE_NAME_CLOUD_TEST"),
    #     port=os.getenv("SQL_PORT_CLOUD_TEST")
    # )
    print("Connection to db successfull")
    return mydb
    # cursor = mydb.cursor()
