#!/usr/bin/env python3

from tools.db import needs_db
from models.db import Actions
from peewee import DoesNotExist
from tools.reactions import executeReaction
from threading import Thread


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
        res = res and executeReaction(c, params)
    return res


@needs_db
def executeAction(uuid, params):
    print(f"~Action~ [{uuid}] {str(params[0])}")
    Thread(target=__executeAction, args=(uuid, params)).start()
    