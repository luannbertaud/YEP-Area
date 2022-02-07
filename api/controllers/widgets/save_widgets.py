#!/usr/bin/env python3

import imp
from peewee import DoesNotExist
from tools.db import needs_db
from models.db import Reactions, Actions
import controllers.reactions.all as reactionList
from controllers.widgets.register_widgets import register_action


@needs_db
def save_action(widget):
    register_action(widget)
    try:
        w = Actions.get(Actions.uuid == widget["uuid"])
    except DoesNotExist as e:
        Actions.create(uuid=widget["uuid"], type=widget["type"], user_uuid=widget["user_uuid"], content=widget["content"], children=widget["children"])
        return widget["uuid"]
    w.type = widget["type"]
    w.user_uuid = widget["user_uuid"]
    w.content = widget["content"]
    w.children = widget["children"]
    w.save()
    return widget["uuid"]

@needs_db
def save_reaction(widget):
    if (widget["family"] != "reaction"):
        return None
    try:
        getattr(reactionList, widget["type"]+"Reaction")
    except:
        raise Exception(f"Can't create [{widget['uuid']}], invalid type")
    try:
        w = Reactions.get(Reactions.uuid == widget["uuid"])
    except DoesNotExist as e:
        Reactions.create(uuid=widget["uuid"], type=widget["type"], user_uuid=widget["user_uuid"])
        return widget["uuid"]
    w.type = widget["type"]
    w.user_uuid = widget["user_uuid"]
    w.save()
    return widget["uuid"]