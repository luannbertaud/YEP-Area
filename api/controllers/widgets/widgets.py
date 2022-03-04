#!/usr/bin/env python3

import jwt
from flask import Blueprint, request
from peewee import DoesNotExist
from api.tools.db import needs_db
from controllers.widgets.save_widgets import save_action, save_reaction
from models.db import Actions, Reactions, Users
from tools.tokens import verify_jwt
from tools.env import JWT_SECRET
from tools.fomarting import action_to_json, reaction_to_json

widgetsBP = Blueprint('widgetsBP', __name__)

def __validate_data(data):
    for d in data['widgets']:
        try:
            assert(isinstance(d, dict))
            assert(isinstance(d["uuid"], str))
            assert(isinstance(d["type"], str))
            assert(isinstance(d["user_uuid"], str))
            assert(isinstance(d["enabled"], bool))
            assert(isinstance(d["family"], str))
            if ("title" in list(d.keys())):
                assert(isinstance(d["title"], str))
            else:
                d["title"] = ""
            if ("description" in list(d.keys())):
                assert(isinstance(d["description"], str))
            else:
                d["description"] = ""
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


@widgetsBP.route("/update", methods=["POST"])
@verify_jwt
def widgets_update():
    data = request.json
    updated = []
    failed = []
    if (not data or not __validate_data(data)):
        return {"code": 400, "message": "Malformed JSON payload"}, 400
    for w in data['widgets']:
        res = None
        if w['family'] == "action":
            try:
                res = save_action(w)
            except Exception as e:
                failed.append(f"[{str(e)}]")
        elif w['family'] == "reaction":
            try:
                res = save_reaction(w)
            except Exception as e:
                failed.append(f"[{str(e)}]")
        if (res):
            updated.append(res)
    if (len(updated) != len(data['widgets'])):
        return {"code": 400, "message": f"Not all widgets could be updated: {', '.join(failed)}"}, 400
    return {"code": 200, "message": f"Updated widgets: {', '.join(updated)}"}


def __get_service_widgets(service, user_uuid):
    res = []
    service_mapper = {
        "github": ["GithubWebhookAction"],
        "google": ["GmailWebhookAction", "GmailSendEmailReaction"],
        "spotify": ["SpotifyNextReaction"],
        "twitter": ["TwitterTweetReaction"],
        "discord": ["DiscordMessageReaction"],
    }
    if ((not service) or (service not in service_mapper.keys())):
        return {"code": 400, "message": "Missing or unknown Area service."}, 400
    for area in service_mapper[service]:
        if (area[-len('Reaction'):] == 'Reaction'):
            area = area[:-len('Reaction')]
            try:
                query = Reactions.select().where(Reactions.user_uuid == user_uuid, Reactions.type == area)
                if not query:
                    raise DoesNotExist("Empty query")
            except DoesNotExist as e:
                pass
            for r in query:
                res.append(reaction_to_json(r))
        elif (area[-len('Action'):] == 'Action'):
            area = area[:-len('Action')]
            try:
                query = Actions.select().where(Actions.user_uuid == user_uuid, Actions.type == area)
                if not query:
                    raise DoesNotExist("Empty query")
            except DoesNotExist as e:
                pass
            for a in query:
                res.append(action_to_json(a))
    return res

@widgetsBP.route("/get", methods=["GET"])
@verify_jwt
def widgets_get():
    res = []
    services = request.args.get('services')
    if not services:
        services = ["github","google","spotify","twitter","discord"]
    else:
        services = services.replace(".", ",").replace(";", ",").split(",")
    auth = request.headers['Authorization']
    user_uuid = jwt.decode(auth, JWT_SECRET, "HS256")["user_uuid"]
    for service in services:
        res += __get_service_widgets(service, user_uuid)
    return {"widgets": res}


@widgetsBP.route("/services", methods=["GET"])
@verify_jwt
@needs_db
def widgets_services():
    services = []
    auth = request.headers['Authorization']
    user_uuid = jwt.decode(auth, JWT_SECRET, "HS256")["user_uuid"]

    try:
        u = Users.get(Users.uuid == user_uuid)
        if not u:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if ((not u.oauth) or len(list(u.oauth.keys())) <= 0):
        return {"code": 200, "data": services}
    for k in u.oauth.keys():
        if (("access_token" in u.oauth[k]) and u.oauth[k]["access_token"]):
            services.append(k)
    return {"code": 200, "data": services}
