#!/usr/bin/env python3


from flask import Blueprint, request

from controllers.widgets.object_db_relation import save_trigger, save_action
from controllers.widgets.json_object_relation import create_trigger, create_action

widgetsUpdateBP = Blueprint('widgetsUpdateBP', __name__)

def validate_data(data):
    for d in data['widgets']:
        try:
            assert(isinstance(d, dict))
            assert(isinstance(d["uuid"], str))
            assert(isinstance(d["type"], str))
            assert(isinstance(d["family"], str))
            if ("args" in list(d.keys())):
                assert(isinstance(d["args"], dict))
            else:
                d["args"] = {}
            if (("toTrigger" in list(d.keys())) and d["family"] == "trigger"):
                assert(isinstance(d["toTrigger"], list))
            else:
                d["toTrigger"] = []
        except:
            return False
    return True

@widgetsUpdateBP.route("/update", methods=["POST"])
def widgets_update():
    data = request.json
    updated = []
    failed = []
    if (not data or not validate_data(data)):
        return {"code": 400, "message": "Malformed JSON payload"}
    for w in data['widgets']:
        res = None
        if w['family'] == "trigger":
            try:
                trigger = create_trigger(w)
                res = save_trigger(trigger)
            except Exception as e:
                failed.append(str(e))
        elif w['family'] == "action":
            try:
                action = create_action(w)
                res = save_action(action)
            except Exception as e:
                failed.append(str(e))
        if (res):
            updated.append(res)
    if (len(updated) != len(data['widgets'])):
        return {"code": 400, "message": f"Not all widgets could be updated: {', '.join(failed)}"}
    return {"code": 200, "message": f"Updated widgets: {', '.join(updated)}"}
