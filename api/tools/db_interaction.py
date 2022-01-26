#!/usr/bin/env python3

from tools.need_db import needs_db
from models.db_models import Users
from peewee import DoesNotExist
from functools import wraps

@needs_db
def get_tokens(rqUser, tokenType):
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"NOJSON": "Unknown Area user"}
    return getattr(dbUser, tokenType+"Tokens")


def tokens_reload(f=None, reloader=None):
    def _tokens_reload(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            res = func(*args, **kwargs)
            if isinstance(res, dict) and (('status' in list(res.keys())) and res['status'] == 401):
                reloader(self=args[0])
                return func(*args, **kwargs)
            return res
        return wrapper
    if f:
        return _tokens_reload(f)
    return _tokens_reload