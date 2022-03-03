#!/usr/bin/env python3

import jwt
import requests
from cryptography.fernet import Fernet
from peewee import DoesNotExist
from models.db import Users
from tools.fomarting import ensure_json
from tools.tokens import get_tokens, tokens_reload
from tools.env import SERV_ENCRYPT_KEY

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