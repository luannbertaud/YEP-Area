#!/usr/bin/env python3

import requests
from peewee import DoesNotExist
import spotipy
import urllib.parse as url_parse
from tools.fomarting import ensure_json
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
    
    @tokens_reload(reloader=get_new_tokens)
    def currently_playing(self):
        headers = {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.get("https://api.spotify.com/v1/me/player/currently-playing", headers=headers)
        if (not r.content):
            return {'code': r.status_code, 'data': {}}
        r = ensure_json(r)
        if ('NOJSON' in r.keys()):
            return r
        featuring = [ar['name'] for ar in r['data']['item']['artists'][1:]]
        res = {
            'title': r['data']['item']['name'],
            'artist': r['data']['item']['artists'][0]['name'],
            'image': r['data']['item']['album']['images'][0]['url'],
        }
        if (featuring):
            res['featuring'] = ' & '.join(featuring)
        return {'code': r['code'], 'data': [res]}

    @tokens_reload(reloader=get_new_tokens)
    def month_artist(self):
        headers = {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.get("https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=1&offset=0", headers=headers)
        if (not r.content or (str(r.status_code)[0] != "2")):
            return {'code': r.status_code, 'data': {}}
        r = ensure_json(r)
        if ('NOJSON' in r.keys()):
            return r
        res = {
            'artist': r['data']['items'][0]['name'],
            'image': r['data']['items'][0]['images'][0]['url'],
        }
        return {'code': r['code'], 'data': [res]}

    @tokens_reload(reloader=get_new_tokens)
    def play_track(self, query):
        headers = {
            "Content-type" : "application/json",
            "Accept" : "application/json",
            "Authorization" : f"Bearer {self.access_token}"
        }
        r = requests.get(f"https://api.spotify.com/v1/search?q={url_parse.quote_plus(query)}&type=track&limit=1&offset=0", headers=headers)
        if ((str(r.status_code)[0] != "2")):
            return {'code': r.status_code, 'data': {}}
        r = ensure_json(r)
        if ('NOJSON' in r.keys()):
            return r
        if (len(r['data']['tracks']['items']) <= 0 or ('album' not in r['data']['tracks']['items'][0].keys())):
            return {'code': 400, 'message': "Track not found"}
        offset = int(r['data']['tracks']['items'][0]['track_number']) - 1
        offset = 0 if offset < 0 else offset
        payload = {
            "context_uri": r['data']['tracks']['items'][0]['album']['uri'],
            "offset": {
                "position": offset
            },
            "position_ms": 0
        }
        r = requests.put("https://api.spotify.com/v1/me/player/play", headers=headers, json=payload)
        return {'code': r.status_code, 'message': "OK"}


class SpotifyNextReaction(Reaction):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  SpotifyAPIWrapper(rqUser)
        super().__init__("spotify", rqUser, uuid=uuid)

    def do(self, *args):
        return self.api.next_track()