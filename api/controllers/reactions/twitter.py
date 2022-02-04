#!/usr/bin/env python3

import requests
import base64
from peewee import DoesNotExist
from tools.fomarting import ensure_json
from tools.tokens import get_tokens, tokens_reload
from tools.env import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET
from models.area import Reaction
from models.db import Users
from tools.db import needs_db

class TwitterAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.load_tokens()
        self.client = {"id": TWITTER_CLIENT_ID, "secret": TWITTER_CLIENT_SECRET}

    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "twitter")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init TwitterAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = tokens["refresh_token"]

    def get_new_tokens(self):
        data = {
            "refresh_token" : self.refresh_token,
            "grant_type" : "refresh_token",
            "client_id" : self.client["id"],
        }
        basic_auth = "Basic " + (base64.b64encode(str.encode(":".join(list(self.client.values()))))).decode()
        headers = {
            "Content-type" : "application/x-www-form-urlencoded",
            "Authorization" : basic_auth
        }
        r = requests.post("https://api.twitter.com/2/oauth2/token", headers=headers, data=data)
        r = ensure_json(r)
        if ('NOJSON' in list(r.keys())):
            return r
        print(r)
        tokens = {
            "access_token": r['data']['access_token'],
            "refresh_token": r['data']['refresh_token'],
        }
        try:
            dbUser = Users.get(Users.uuid == self.rqUser)
        except DoesNotExist as e:
            return {"NOJSON": 400, "message": "No corresponding area user."}
        dbUser.twitter = tokens
        dbUser.save()
        self.load_tokens()
        return r

    @tokens_reload(reloader=get_new_tokens)
    def post_tweet(self, content):
        data = { "text" : content }
        headers = {
            "Content-type" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.post("https://api.twitter.com/2/tweets", headers=headers, json=data)
        return ensure_json(r)

    @tokens_reload(reloader=get_new_tokens)
    def delete_tweet(self, id):
        headers = {
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.delete(f"https://api.twitter.com/2/tweets/{id}", headers=headers)
        return ensure_json(r)


class TwitterTweetReaction(Reaction):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  TwitterAPIWrapper(rqUser)
        super().__init__("twitter", rqUser, uuid=uuid)

    def do(self, params):
        if len(params) < 1:
            return self.api.post_tweet("Default content")
        return self.api.post_tweet(params[0])