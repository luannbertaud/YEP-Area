#!/usr/bin/env python3

from peewee import DoesNotExist

from tools.db import needs_db
from tools.fomarting import get_initializing_parameters
from models.db import Widgets
# from controllers.github import Trigger
from controllers.reactions.twitter import Reaction


# @needs_db
# def save_trigger(trigger : Trigger):
#     try:
#         w = Widgets.get(Widgets.uuid == trigger.uuid)
#     except DoesNotExist as e:
#         Widgets.create(uuid=trigger.uuid, family="trigger", type=trigger.type, args=get_initializing_parameters(trigger), toTrigger=trigger.actions)
#         return trigger.uuid
#     w.family = "trigger"
#     w.type = trigger.type
#     w.args = get_initializing_parameters(trigger)
#     w.toTrigger = trigger.actions
#     w.save()
#     return trigger.uuid

@needs_db
def save_reaction(action : Reaction):
    try:
        w = Widgets.get(Widgets.uuid == action.uuid)
    except DoesNotExist as e:
        Widgets.create(uuid=action.uuid, family="action", type=action.type, args=get_initializing_parameters(action))
        return action.uuid
    w.family = "action"
    w.type = action.type
    w.args = get_initializing_parameters(action)
    w.toTrigger = None
    w.save()
    return action.uuid