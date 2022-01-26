#!/usr/bin/env python3

from peewee import Model as __Model
from peewee import AutoField, TextField
from playhouse.postgres_ext import JSONField
from models.database_globals import db

class __BaseModel(__Model):
    class Meta:
        database = db

class DBdata(__BaseModel):
    version = TextField()

class Users(__BaseModel):
    id = AutoField()
    name = TextField()
    password = TextField(null=True)
    email = TextField()
