#!/usr/bin/env python3

from controllers.areaDB import validateDatabase

def needs_db(func):
    def wrapper(*args, **kwargs):
        if not validateDatabase():
            raise Exception("Can't validate database")
        return func(*args, **kwargs)
    return wrapper

