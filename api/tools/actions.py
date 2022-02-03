#!/usr/bin/env python3

from tools.db import needs_db
from models.db import Actions
from peewee import DoesNotExist
from tools.reactions import executeReaction
from threading import Thread


def __executeAction(uuid):
    ac = None
    res = True
    
    try:
        ac = Actions.get(Actions.uuid == uuid)
    except DoesNotExist as e:
        return False

    for c in ac.children["uuids"]:
        res = res and executeReaction(c)
    return res


@needs_db
def executeAction(uuid):
    Thread(target=__executeAction, args=(uuid)).start()
    