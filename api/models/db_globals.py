#!/usr/bin/env python3

from peewee import PostgresqlDatabase
from tools.env import *

DATABASE_PARAMS = {
    "name": POSTGRES_DB_NAME,
    "host": POSTGRES_HOST,
    "port": POSTGRES_PORT,
    "user": POSTGRES_USER,
    "password": POSTGRES_PASSWORD
}

db = PostgresqlDatabase(None)

def init():
    print("DB connection initialization..", end="")
    global db
    db.init(DATABASE_PARAMS["name"], host=DATABASE_PARAMS["host"], port=DATABASE_PARAMS["port"], user=DATABASE_PARAMS["user"], password=DATABASE_PARAMS["password"])
    print("..Initialized.")