#!/usr/bin/env python3

from peewee import Model as __Model
from peewee import AutoField, TextField
from playhouse.postgres_ext import JSONField
from models.db_globals import db

class __BaseModel(__Model):
    class Meta:
        database = db

class DBdata(__BaseModel):
    version = TextField()

class Users(__BaseModel):
    uuid = AutoField()
    name = TextField()
    password = TextField(null=True)
    email = TextField(null=True)
    twitter = JSONField(null=True)
    github = JSONField(null=True)

class Reactions(__BaseModel):
    uuid = TextField(primary_key=True)
    type = TextField()
    user_uuid = TextField()

class Actions(__BaseModel):
    uuid = TextField(primary_key=True)
    type = TextField()
    user_uuid = TextField()
    content = JSONField(null=True)
    children = JSONField(null=True)