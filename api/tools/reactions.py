#!/usr/bin/env python3

from peewee import DoesNotExist
from tools.db import needs_db
from models.db import Reactions
import controllers.reactions.all as reactionList

@needs_db
def executeReaction(uuid, params):
    rea = None
    
    try:
        rea = Reactions.get(Reactions.uuid == uuid)
    except DoesNotExist as e:
        return False
    if rea == None:
        return False

    print(f"~Reaction~ [{uuid}] {str(params)}")

    obj = getattr(reactionList, rea.type + "Reaction")(rqUser=rea.user_uuid, uuid=rea.uuid, **(rea.content))
    obj.do(params)
    return True