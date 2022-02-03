#!/usr/bin/env python3

from peewee import InterfaceError
import psycopg2 as __driver
from packaging import version as __version
import models.db_globals as __DBglobals
from models.db import DBdata, Users, Actions, Reactions

def __ensureVersionSystem():
    if not DBdata.table_exists():
        __DBglobals.db.create_tables([DBdata])
    query = DBdata.select()
    if (len(query) <= 0):
        DBdata.create(version="0.0.1")

def needsUpdate(currentVers, targetVers):
    return __version.parse(currentVers) < __version.parse(targetVers)

def validateDatabase():

    # Creating database if it does not already exist
    try:
        co = __driver.connect(host=__DBglobals.DATABASE_PARAMS["host"], port=__DBglobals.DATABASE_PARAMS["port"], user=__DBglobals.DATABASE_PARAMS["user"], password=__DBglobals.DATABASE_PARAMS["password"])
    except Exception as e:
        print(f"Error: {e}")
        return False
    co.autocommit = True
    curs = co.cursor()
    try:
        curs.execute(f'SELECT datname FROM pg_database')
        databases = [d for (d,) in curs.fetchall()]
        if __DBglobals.DATABASE_PARAMS["name"].lower() not in databases:
            print(f"Database don't exist yet: creating {__DBglobals.DATABASE_PARAMS['name'].lower()} (v0.0.1)")
            curs.execute(f"CREATE DATABASE {__DBglobals.DATABASE_PARAMS['name'].lower()}")
    except __driver.Error as e:
        if e.diag.sqlstate != "42P04":
            print(f"Error: {e}")
            return False
    co.close()


    # Open connection to the database and migrate if needed

    if (not hasattr(__DBglobals, "db")) or (not __DBglobals.db):
        __DBglobals.init()
    try:
        __ensureVersionSystem()
    except InterfaceError as e:
        __DBglobals.init()
        __ensureVersionSystem()

    vers = DBdata.get()

    if needsUpdate(vers.version, "0.0.2"):
        print("Migrating to v0.0.2")
        __DBglobals.db.create_tables([Users])
        vers.version = "0.0.2"

    if needsUpdate(vers.version, "0.0.3"):
        print("Migrating to v0.0.3")
        __DBglobals.db.create_tables([Actions, Reactions])
        vers.version = "0.0.3"

    # +=
    # if needsUpdate(vers.version, NEW_VERSION):
    #     print("Migrating to vNEW_VERSION")
    #           DO_MIGRATION
    #     vers.version = NEW_VERSION

    vers.save()
    return True
