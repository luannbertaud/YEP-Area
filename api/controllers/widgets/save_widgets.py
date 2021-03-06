#!/usr/bin/env python3

import imp
from peewee import DoesNotExist
from tools.db import needs_db
from models.db import Reactions, Actions
import controllers.reactions.all as reactionList
import controllers.actions.all as actionList
from controllers.widgets.register_widgets import register_action, register_reaction


@needs_db
def save_action(widget):
    if (widget["family"] != "action"):
        return None
    try:
        getattr(actionList, widget["type"]+"Action")
    except:
        raise Exception(f"Can't create [{widget['uuid']}], invalid type")
    register_action(widget)
    try:
        w = Actions.get(Actions.uuid == widget["uuid"])
    except DoesNotExist as e:
        Actions.create(uuid=widget["uuid"], title=widget["title"], description=widget["description"], type=widget["type"], user_uuid=widget["user_uuid"],  enabled=widget["enabled"], content=widget["content"], children=widget["children"])
        return widget["uuid"]
    w.title = widget["title"]
    w.description = widget["description"]
    w.type = widget["type"]
    w.user_uuid = widget["user_uuid"]
    w.enabled = widget["enabled"]
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
    register_reaction(widget)
    try:
        w = Reactions.get(Reactions.uuid == widget["uuid"])
    except DoesNotExist as e:
        Reactions.create(uuid=widget["uuid"], title=widget["title"], description=widget["description"], type=widget["type"], user_uuid=widget["user_uuid"],  enabled=widget["enabled"], content=widget["content"])
        return widget["uuid"]
    w.title = widget["title"]
    w.description = widget["description"]
    w.type = widget["type"]
    w.user_uuid = widget["user_uuid"]
    w.enabled = widget["enabled"]
    w.content = widget["content"]
    w.save()
    return widget["uuid"]