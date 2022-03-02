#!/usr/bin/env python3

import jwt
from flask import Blueprint, request, redirect
from peewee import DoesNotExist
import spotipy
from tools.db import needs_db
from tools.env import SERV_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, JWT_SECRET
from tools.tokens import verify_jwt
from tools.fomarting import close_window
from models.db import Users


spotifyAuthBP = Blueprint('spotifyAuthBP', __name__)
current_requests = []

@spotifyAuthBP.route("/authorize", methods=["GET"])
@verify_jwt
def spotify_authorize():
    auth = request.headers['Authorization']
    user_uuid = jwt.decode(auth, JWT_SECRET, "HS256")["user_uuid"]
    current_requests.append({"user_uuid":user_uuid})
    list({v['user_uuid']:v for v in current_requests}.values())
    redirect_uri = SERV_URL + "auth/spotify"
    scopes = 'user-read-private user-library-modify user-modify-playback-state'
    flow = spotipy.oauth2.SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, redirect_uri=redirect_uri, scope=scopes)
    authorization_url = flow.get_authorize_url()
    current_requests.append({"user_uuid":user_uuid})
    return {'code': 200, 'url': authorization_url}

@spotifyAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def spotify_callback():
    if (len(current_requests) <= 0):
        {"code": 401, "message": "This url must be called by authentification entity."}, 401
    rqUser = current_requests[0]["user_uuid"]
    redirect_uri = SERV_URL + "auth/spotify"
    scopes = 'user-read-private user-library-modify user-modify-playback-state'
    flow = spotipy.oauth2.SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, redirect_uri=redirect_uri, scope=scopes)
    tokens = flow.get_access_token(code=request.args.get('code'), check_cache=False)
    try:
        dbUser = Users.get(Users.uuid == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if not dbUser.oauth:
        dbUser.oauth = {}
    dbUser.oauth["spotify"] = tokens
    dbUser.save()
    return close_window()