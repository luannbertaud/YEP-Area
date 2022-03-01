#!/usr/bin/env python3

from flask import Blueprint, request, redirect
from peewee import DoesNotExist
import spotipy
from tools.db import needs_db
from tools.env import SERV_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET
from tools.tokens import verify_jwt
from models.db import Users


spotifyAuthBP = Blueprint('spotifyAuthBP', __name__)
current_requests = [] #TODO this solution is deprecated, waiting for the client to send us the ?code

@spotifyAuthBP.route("/authorize", methods=["GET"])
@verify_jwt
def spotify_authorize():
    user = request.args.get('user')
    if not user:
        return {"code": 401, "message": "Bad user parameter"}, 401
    redirect_uri = SERV_URL + "auth/spotify"
    scopes = 'user-read-private user-library-modify user-modify-playback-state'
    flow = spotipy.oauth2.SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, redirect_uri=redirect_uri, scope=scopes)
    authorization_url = flow.get_authorize_url()
    current_requests.append({"user":user})
    return redirect(authorization_url, code=302)

@spotifyAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def spotify_callback():
    rqUser = current_requests[0]["user"]
    redirect_uri = SERV_URL + "auth/spotify"
    scopes = 'user-read-private user-library-modify user-modify-playback-state'
    flow = spotipy.oauth2.SpotifyOAuth(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, redirect_uri=redirect_uri, scope=scopes)
    tokens = flow.get_access_token(code=request.args.get('code'), check_cache=False)
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if not dbUser.oauth:
        dbUser.oauth = {}
    dbUser.oauth["spotify"] = tokens
    dbUser.save()
    return {"code": 200, "message": tokens}