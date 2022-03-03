#!/usr/bin/env python3

import base64
from flask import request
from peewee import DoesNotExist
from models.db import Actions, Users
from tools.actions import executeAction
from tools.reactions import executeReaction
from pprint import pprint
import json
from controllers.reactions.gmail import GmailAPIWrapper

# import requests
# import base64
# from tools.fomarting import ensure_json
# from tools.tokens import get_tokens, tokens_reload
# from tools.env import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SERV_URL
from models.area import Action

class GmailWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  GmailAPIWrapper(rqUser)
        super().__init__("gmail", rqUser, uuid=uuid)

    def register(self, *args):
        return self.api.register_watcher()

def gmailHook():
    data = request.json
    payload = json.loads(base64.urlsafe_b64decode(data["message"]["data"]))
    gmail_login = payload["emailAddress"]
    gmail_historyId = payload["historyId"]
    area_user = None
    area_email = None

    try:
        query = Users.select().where(Users.oauth.is_null(False))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 401, "message": "ERROR no users connected to gmail"}, 401
    
    for u in query:
        if ("google" in list(u.oauth.keys())) and ("login" in list(u.oauth["google"].keys())) and (u.oauth["google"]["login"] == gmail_login):
            area_user = u.uuid
    if area_user == None:
        return {"code": 400, "message": "ERROR could not find corresponding area user"}, 400

    try:
        query = Actions.select().where(Actions.type == "GmailWebhook", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 400, "message": "ERROR this user does not have any gmail action"}, 400

    area_email = query[0] #TODO Maybe registering multiple email addresses
    if not area_email:
        return {"code": 400, "message": "ERROR could not find corresponding area action"}, 400

    api = GmailAPIWrapper(area_user)
    email_content = api.get_last_email_content(str(gmail_historyId))
    executeAction(area_email, [f"GmailHook - Email:[{gmail_login}] Content:[{email_content}]", ])
    return {"code": 200, "message": "OK"}