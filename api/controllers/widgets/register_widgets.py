#!/usr/bin/env python3

import controllers.actions.all as actionList

def register_action(action):
    ac = getattr(actionList, action["type"] + "Action")(rqUser=action["user_uuid"], uuid=action["uuid"])
    required = list(ac.register.__code__.co_varnames)
    required = [a for a in required if (a not in ['self', 'args'])]
    for r in required:
        if r not in list(action["content"].keys()):
            raise Exception(f"Can't create [{action['uuid']}], invalid content parameters")
    return ac.register(**(action["content"]))

