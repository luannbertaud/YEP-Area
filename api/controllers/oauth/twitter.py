#!/usr/bin/env python3

import requests, pkce, base64
from flask import Blueprint, request, redirect
import urllib.parse as url_parse
from peewee import DoesNotExist
from tools.db import needs_db
from tools.env import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET, SERV_URL
from tools.fomarting import ensure_json
from models.db import Users

twitterAuthBP = Blueprint('twitterAuthBP', __name__)
current_requests = [] #TODO this solution is deprecated, waiting for the client to send us the ?code

@twitterAuthBP.route("/authorize", methods=["GET"])
def twitter_authorize():
    user = request.args.get('user')
    if not user:
        return {"code": 401, "message": "Bad user parameter"}
    code_verifier, code_challenge = pkce.generate_pkce_pair()
    current_requests.append({"user":user, "verif": code_verifier})
    url = "https://twitter.com/i/oauth2/authorize"
    params = "?response_type=code&state=state&scope=" + url_parse.quote_plus("tweet.read users.read tweet.write offline.access")
    params += "&client_id=" + url_parse.quote_plus(TWITTER_CLIENT_ID)
    params += "&redirect_uri=" + url_parse.quote_plus(SERV_URL + "auth/twitter/")
    params += "&code_challenge_method=S256&code_challenge=" + url_parse.quote_plus(code_challenge)
    return redirect(url + params, code=302)

@twitterAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def twitter_callback():
    code_verifier = current_requests[0]["verif"]
    rqUser = current_requests[0]["user"]
    data = {
        "code": request.args.get('code'),
        "grant_type" : "authorization_code",
        "client_id" : TWITTER_CLIENT_ID,
        "code_verifier": code_verifier,
        "redirect_uri": SERV_URL + "auth/twitter/",
    }
    headers = {
        "Content-type" : "application/x-www-form-urlencoded",
        "Authorization" : "Basic " + (base64.b64encode(str.encode(f"{TWITTER_CLIENT_ID}:{TWITTER_CLIENT_SECRET}"))).decode()
    }
    rq = requests.post("https://api.twitter.com/2/oauth2/token", headers=headers, data=data)
    r = ensure_json(rq)
    r['data']['user'] = rqUser
    del current_requests[0]
    if rq.status_code != 200:
        return {"code": rq.status_code, "message": r}
    # TODO get username from endpoint
    tokens = {
        "access_token": r['data']['access_token'],
        "refresh_token": r['data']['refresh_token'],
    }
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}
    dbUser.twitter = tokens
    dbUser.save()
    return {"code": rq.status_code, "message": r}