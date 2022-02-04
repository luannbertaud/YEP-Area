#!/usr/bin/env python3


from flask import Blueprint, request
from controllers.widgets.save_widgets import save_action, save_reaction

widgetsUpdateBP = Blueprint('widgetsUpdateBP', __name__)

def __validate_data(data):
    for d in data['widgets']:
        try:
            assert(isinstance(d, dict))
            assert(isinstance(d["uuid"], str))
            assert(isinstance(d["type"], str))
            assert(isinstance(d["user_uuid"], str))
            assert(isinstance(d["family"], str))
            if ("content" in list(d.keys())):
                assert(isinstance(d["content"], dict))
            else:
                d["content"] = {}
            if (("children" in list(d.keys())) and d["family"] == "action"):
                assert(isinstance(d["children"], dict))
            else:
                d["children"] = {}
        except:
            return False
    return True

@widgetsUpdateBP.route("/update", methods=["POST"])
def widgets_update():
    data = request.json
    updated = []
    failed = []
    if (not data or not __validate_data(data)):
        return {"code": 400, "message": "Malformed JSON payload"}
    for w in data['widgets']:
        res = None
        if w['family'] == "action":
            try:
                res = save_action(w)
            except Exception as e:
                failed.append(str(e))
        elif w['family'] == "reaction":
            try:
                res = save_reaction(w)
            except Exception as e:
                failed.append(str(e))
        if (res):
            updated.append(res)
    if (len(updated) != len(data['widgets'])):
        return {"code": 400, "message": f"Not all widgets could be updated: {', '.join(failed)}"}
    return {"code": 200, "message": f"Updated widgets: {', '.join(updated)}"}
