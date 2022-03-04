#!/usr/bin/env python3

import jwt
import re
import requests
from cryptography.fernet import Fernet
from peewee import DoesNotExist
from flask import request
from models.db import Users
from tools.fomarting import ensure_json
from tools.actions import executeAction
from tools.tokens import get_tokens, tokens_reload
from tools.env import SERV_ENCRYPT_KEY, SERV_URL
from models.area import Action
from tools.watcher import Watcher

class EpitechAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.load_tokens()

    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "epitech")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init EpitechAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = Fernet(SERV_ENCRYPT_KEY.encode()).decrypt(tokens["refresh_token"].encode()).decode("utf-8")
        self.login = tokens["login"]

    def get_new_tokens(self):
        session = requests.Session()

        session.get(self.refresh_token)
        user_token = session.cookies.get_dict()
        if ("user" not in user_token.keys()):
            return {"code": 401, "message": "Can't retrieve user token from this auto-login link."}, 401
        user_token = user_token["user"]

        login = jwt.decode(user_token, options={"verify_signature": False})["login"]

        tokens = {
            "access_token": user_token,
            "refresh_token": self.refresh_token,
            "login": login,
        }
        try:
            dbUser = Users.get(Users.uuid == self.rqUser)
        except DoesNotExist as e:
            return {"code": 401, "message": "Unknown Area user"}, 401
        if not dbUser.oauth:
            dbUser.oauth = {}
        dbUser.oauth["epitech"] = tokens
        dbUser.save()
        self.load_tokens()
        return tokens

    @tokens_reload(reloader=load_tokens)
    def get_notifications(self):
        headers = {
            "Accept": "application/json",
            "Cookie": f"user={self.access_token}"
        }
        r = requests.get(f"https://intra.epitech.eu/user/notification/message?format=json", headers=headers)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def get_profile(self):
        headers = {
            "Accept": "application/json",
            "Cookie": f"user={self.access_token}"
        }
        r = requests.get(f"https://intra.epitech.eu/user/{self.login}/?format=json", headers=headers)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def get_grades(self):
        headers = {
            "Accept": "application/json",
            "Cookie": f"user={self.access_token}"
        }
        r = requests.get(f"https://intra.epitech.eu/user/{self.login}/notes?format=json", headers=headers)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def get_netsoul(self):
        headers = {
            "Accept": "application/json",
            "Cookie": f"user={self.access_token}"
        }
        r = requests.get(f"https://intra.epitech.eu/user/{self.login}/netsoul?format=json", headers=headers)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def get_partners(self):
        headers = {
            "Accept": "application/json",
            "Cookie": f"user={self.access_token}"
        }
        r = requests.get(f"https://intra.epitech.eu/user/{self.login}/binome?format=json", headers=headers)
        return ensure_json(r)

class EpitechNotifWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  EpitechAPIWrapper(rqUser)
        super().__init__("epitech", rqUser, uuid=uuid)
        self.watcher = Watcher(SERV_URL + "hooks/epitech", target=self.api.get_notifications, additional_header={"WebhookType": "get_notifications", "AreaUser": self.rqUser, "ActionUUID": self.uuid})

    def register(self, *args):
        self.watcher.start()
        return self.watcher

    def unregister(self, *args):
        self.watcher.stop()
        return self.watcher

def __epitechNotifHook(data, headers):
    notif = data['data'][0]
    area_action = headers['ActionUUID']

    clean_title = re.sub(r'(<a.+?>)|(<\/a>)', '', notif['title'])
    executeAction(area_action, [f"EpitechNotifHook - From:[{notif['user']['title']}] Title:[{clean_title}]", ])
    return {"code": 200, "message": "OK"}


def epitechHook():
    data = request.json
    headers = request.headers
    webhook_type = request.headers.get('WebhookType')
    if (not webhook_type):
        {"code": 400, "message": "Missing webhook type"}, 400
    if (webhook_type == "get_notifications"):
        return __epitechNotifHook(data, headers)
    return {"code": 400, "message": "Webhook type not supported yet"}, 400