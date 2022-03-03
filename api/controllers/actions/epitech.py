#!/usr/bin/env python3

import jwt
import requests
from cryptography.fernet import Fernet
from peewee import DoesNotExist
from flask import request
from models.db import Users
from tools.fomarting import ensure_json
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

    def register(self, *args):
        self.watcher = Watcher("http://localhost:5000/" + "hooks/epitech", target=self.api.get_notifications, additional_header={"WebhookType": "get_notifications"})
        self.watcher.start()
        return self.watcher

    def unregister(self, *args):
        return self.watcher.stop()

def __epitechNotifHook(data):
    print(data)
    # payload = json.loads(base64.urlsafe_b64decode(data["message"]["data"]))
    # gmail_login = payload["emailAddress"]
    # gmail_historyId = payload["historyId"]
    # area_user = None
    # area_email = None

    # try:
    #     query = Users.select().where(Users.oauth.is_null(False))
    #     if not query:
    #         raise DoesNotExist("Empty query")
    # except DoesNotExist as e:
    #     return {"code": 401, "message": "ERROR no users connected to gmail"}, 401
    
    # for u in query:
    #     if ("google" in list(u.oauth.keys())) and ("login" in list(u.oauth["google"].keys())) and (u.oauth["google"]["login"] == gmail_login):
    #         area_user = u.uuid
    # if area_user == None:
    #     return {"code": 400, "message": "ERROR could not find corresponding area user"}, 400

    # try:
    #     query = Actions.select().where(Actions.type == "GmailWebhook", Actions.user_uuid == area_user)
    #     if not query:
    #         raise DoesNotExist("Empty query")
    # except DoesNotExist as e:
    #     return {"code": 400, "message": "ERROR this user does not have any gmail action"}, 400

    # area_email = query[0] #TODO Maybe registering multiple email addresses
    # if not area_email:
    #     return {"code": 400, "message": "ERROR could not find corresponding area action"}, 400

    # api = GmailAPIWrapper(area_user)
    # email_content = api.get_last_email_content(str(gmail_historyId))
    # executeAction(area_email, [f"GmailHook - Email:[{gmail_login}] Content:[{email_content}]", ])
    return {"code": 200, "message": "OK"}


def epitechHook():
    data = request.json
    webhook_type = request.headers.get('WebhookType')
    if (not webhook_type):
        {"code": 400, "message": "Missing webhook type"}, 400
    if (webhook_type == "get_notifications"):
        return __epitechNotifHook(data)
    return {"code": 400, "message": "Webhook type not supported yet"}, 400