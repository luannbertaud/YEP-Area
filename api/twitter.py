#!/usr/bin/env python3

import requests
import base64
from pprint import pprint

def ensure_json(response):
    res = {'NOJSON': response}
    try:
        res = response.json()
    except Exception as e:
        print("Error: Response couldn't be parsed as json")
        print(e)
    return res

class TwitterAPIWrapper():

    def __init__(self, access_token, refresh_token, client_id, client_secret) -> None:
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.client = {"id": client_id, "secret": client_secret}

    def get_new_token(self):
        data = {
            "refresh_token" : self.refresh_token,
            "grant_type" : "refresh_token",
            "client_id" : self.client["id"],
        }
        basic_auth = "Basic " + (base64.b64encode(str.encode(":".join(list(self.client.values()))))).decode()
        print(basic_auth)
        headers = {
            "Content-type" : "application/x-www-form-urlencoded",
            "Authorization" : basic_auth
        }
        r = requests.post("https://api.twitter.com/2/oauth2/token", headers=headers, data=data)
        r = ensure_json(r)
        if ('NOJSON' in list(r.keys())):
            return r
        self.access_token = r["access_token"]
        self.refresh_token = r["refresh_token"]
        return r

    def post_tweet(self, content):
        data = { "text" : content }
        headers = {
            "Content-type" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.post("https://api.twitter.com/2/tweets", headers=headers, json=data)
        return ensure_json(r)

    def delete_tweet(self, id):
        headers = {
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.delete(f"https://api.twitter.com/2/tweets/{id}", headers=headers)
        return ensure_json(r)
