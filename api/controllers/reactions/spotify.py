#!/usr/bin/env python3

import requests
from peewee import DoesNotExist
import spotipy
from tools.tokens import get_tokens, tokens_reload
from tools.env import SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SERV_URL
from models.area import Reaction
from models.db import Users
from tools.db import needs_db

class SpotifyAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.load_tokens()
        self.client = {"id": SPOTIFY_CLIENT_ID, "secret": SPOTIFY_CLIENT_SECRET}

    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "spotify")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init SpotifyAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = tokens["refresh_token"]

    @needs_db
    def get_new_tokens(self):
        redirect_uri = SERV_URL + "auth/spotify"
        scopes = 'user-read-private user-library-modify user-modify-playback-state'
        flow = spotipy.oauth2.SpotifyOAuth(self.client["id"], self.client["secret"], redirect_uri=redirect_uri, scope=scopes)
        try:
            tokens = flow.refresh_access_token(self.refresh_token)
        except:
            tokens = {}
        try:
            dbUser = Users.get(Users.uuid == self.rqUser)
        except DoesNotExist as e:
            return {"NOJSON": 400, "message": "No corresponding area user."}
        dbUser.oauth["spotify"] = tokens
        dbUser.save()
        self.load_tokens()
        return tokens

    @tokens_reload(reloader=get_new_tokens)
    def next_track(self):
        headers = {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.post("https://api.spotify.com/v1/me/player/next", headers=headers)
        return {'code': r.status_code}



class SpotifyNextReaction(Reaction):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  SpotifyAPIWrapper(rqUser)
        super().__init__("spotify", rqUser, uuid=uuid)

    def do(self, *args):
        return self.api.next_track()