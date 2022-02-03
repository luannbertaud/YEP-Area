#!/usr/bin/env python3

from tools.db import needs_db
from models.db import Reactions
from peewee import DoesNotExist
import controllers.reactions.all as reactionList

@needs_db
def executeReaction(uuid, params):
    rea = None
    
    try:
        rea = Reactions.get(Reactions.uuid == uuid)
    except DoesNotExist as e:
        return
    if rea == None:
        return

    obj = getattr(reactionList, rea.type + "Reaction")(rqUser=rea.user_uuid, uuid=rea.uuid)
    obj.do(params)