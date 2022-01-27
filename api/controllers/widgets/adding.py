#!/usr/bin/env python3


from flask import Blueprint, request
from peewee import DoesNotExist

from tools.db import needs_db
from controllers.github import Trigger, GitHubTrigger
from controllers.twitter import Action, TwitterTweetAction

widgetsUpdateBP = Blueprint('widgetsUpdateBP', __name__)

def create_trigger(w) -> Trigger:
    if (w['type'] == "github"):
        return GitHubTrigger(toTrigger=w['toTrigger'], uuid=w['uuid'])
    raise NotImplementedError(f"This trigger type ({w['type']}) is not supported yet")

def save_trigger(trigger : Trigger):
    return trigger.uuid

def create_action(w) -> Action:
    if (w['type'] == "twitter"):
        return TwitterTweetAction(*(w['args']), uuid=w['uuid'])
    raise NotImplementedError(f"This action type ({w['type']}) is not supported yet")

def save_action(action : Action):
    return action.uuid

def validate_data(data):
    try:
        assert(isinstance(data['widgets'], list))
        assert(isinstance(data['widgets'][0], dict))
        assert(isinstance(data['widgets'][0]["uuid"], str))
        assert(isinstance(data['widgets'][0]["type"], str))
        assert(isinstance(data['widgets'][0]["family"], str))
        if ("args" in list(data['widgets'][0].keys())):
            assert(isinstance(data['widgets'][0]["args"], list))
        if (("totrigger" in list(data['widgets'][0].keys())) and data['widgets'][0]["family"] == "trigger"):
            assert(isinstance(data['widgets'][0]["toTrigger"], list))
    except:
        return False
    return True

@widgetsUpdateBP.route("/update", methods=["POST"])
def widgets_update():
    data = request.json
    updated = []
    if (not data or not validate_data(data)):
        return {"code": 400, "message": "Malformed JSON payload"}
    for w in data['widgets']:
        res = None
        if w['family'] == "trigger":
            trigger = create_trigger(w)
            res = save_trigger(trigger)
        elif w['family'] == "action":
            action = create_action(w)
            res = save_action(action)
        if (res):
            updated.append(res)
    if (len(updated) <= 0):
        return {"code": 500, "message": "None of the widgets could be updated"}
    return {"code": 200, "message": f"Updated widgets: {', '.join(updated)}"}




















# @twitterAuthBP.route("/", methods=["GET", "POST"])
# @needs_db
# def twitter_callback():
#     code_verifier = current_requests[0]["verif"]
#     rqUser = current_requests[0]["user"]

#     try:
#         dbUser = Users.get(Users.name == rqUser)
#     except DoesNotExist as e:
#         return {"code": 401, "message": "Unknown Area user"}
#     dbUser.twitterTokens = tokens
#     dbUser.save()
#     return {"code": rq.status_code, "message": r}