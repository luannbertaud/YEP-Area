#!/usr/bin/env python3

from peewee import Model as __Model
from peewee import AutoField, TextField, BooleanField
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
    googleToken = TextField(null=True)
    oauth = JSONField(null=True)

class Reactions(__BaseModel):
    uuid = TextField(primary_key=True)
    title = TextField(null=True)
    description = TextField(null=True)
    type = TextField()
    user_uuid = TextField()
    enabled = BooleanField()
    content = JSONField()

class Actions(__BaseModel):
    uuid = TextField(primary_key=True)
    title = TextField(null=True)
    description = TextField(null=True)
    type = TextField()
    user_uuid = TextField()
    enabled = BooleanField()
    content = JSONField()
    children = JSONField()