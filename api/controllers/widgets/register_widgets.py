#!/usr/bin/env python3

import inspect
import controllers.actions.all as actionList
import controllers.reactions.all as reactionList

def register_action(action):
    ac = getattr(actionList, action["type"] + "Action")(rqUser=action["user_uuid"], uuid=action["uuid"])
    required = inspect.getfullargspec(ac.register).args
    required = [a for a in required if (a not in ['self', 'args'])]
    for r in required:
        if r not in list(action["content"].keys()):
            raise Exception(f"Can't create [{action['uuid']}], invalid content parameters (missing {r})")
    try :
        if (action["enabled"]):
            return ac.register(**(action["content"]))
        else:
            return ac.unregister(**(action["content"]))
    except Exception as e:
        raise Exception(f"Can't register [{action['uuid']}], {e}")


def register_reaction(reaction):
    ac = getattr(reactionList, reaction["type"] + "Reaction")
    required = inspect.getfullargspec(ac.__init__).args
    required = [a for a in required if (a not in ['self', 'uuid', 'rqUser'])]
    for r in required:
        if r not in list(reaction["content"].keys()):
            raise Exception(f"Can't create [{reaction['uuid']}], invalid content parameters (missing {r})")
    return required