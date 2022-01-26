#!/usr/bin/env python3

from tools.need_db import needs_db
from models.db_models import Users
from peewee import DoesNotExist

@needs_db
def get_tokens(rqUser, tokenType):
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"NOJSON": "Unknown Area user"}
    return getattr(dbUser, tokenType+"Tokens")