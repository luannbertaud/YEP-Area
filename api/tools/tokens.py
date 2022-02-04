#!/usr/bin/env python3

from peewee import DoesNotExist
from functools import wraps
from tools.db import needs_db
from models.db import Users

@needs_db
def get_tokens(rqUser, tokenType):
    try:
        dbUser = Users.get(Users.uuid == rqUser)
    except DoesNotExist as e:
        return {"NOJSON": "Unknown Area user"}
    return getattr(dbUser, tokenType)


def tokens_reload(f=None, reloader=None):
    def _tokens_reload(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            res = func(*args, **kwargs)
            if isinstance(res, dict) and (('code' in list(res.keys())) and int(str(res['code'])[0]) != 2):
                print("INFO Invalid request, reloading tokens.")
                reloader(self=args[0])
                return func(*args, **kwargs)
            return res
        return wrapper
    if f:
        return _tokens_reload(f)
    return _tokens_reload