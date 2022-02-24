#!/usr/bin/env python3

from peewee import DoesNotExist
from threading import Thread
from models.db import Actions
from tools.db import needs_db
from tools.reactions import executeReaction


def __executeAction(uuid, params):
    ac = None
    res = True
    
    try:
        ac = Actions.get(Actions.uuid == uuid)
    except DoesNotExist as e:
        return False

    if ("uuids" not in list(ac.children.keys())):
        return res
    for c in ac.children["uuids"]:
        res = executeReaction(c, params) and res
    return res


@needs_db
def executeAction(uuid, params):
    print(f"~Action~ [{uuid}] {str(params)}")
    Thread(target=__executeAction, args=(uuid, params)).start()
    