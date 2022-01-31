#!/usr/bin/env python3

from distutils.text_file import TextFile
from peewee import Model as __Model
from peewee import AutoField, TextField, UUIDField
from playhouse.postgres_ext import JSONField
from models.db_globals import db

class __BaseModel(__Model):
    class Meta:
        database = db

class DBdata(__BaseModel):
    version = TextField()

class Users(__BaseModel):
    id = AutoField()
    name = TextField()
    password = TextField(null=True)
    email = TextField(null=True)
    twitterTokens = JSONField(null=True)

class Widgets(__BaseModel):
    uuid = TextField(primary_key=True)
    family = TextField()
    type = TextField()
    args = JSONField(null=True)
    toTrigger = TextField(null=True)
