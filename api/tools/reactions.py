#!/usr/bin/env python3

from tools.db import needs_db
from models.db import Reactions
from peewee import DoesNotExist
from time import sleep

@needs_db
def executeReaction(uuid):
    rea = None
    res = True
    
    try:
        rea = Reactions.get(Reactions.uuid == uuid)
    except DoesNotExist as e:
        return False

    # TODO execute reaction
    sleep(3)
    print("hey")
    return res