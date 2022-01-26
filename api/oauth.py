#!/usr/bin/env python3

import requests, pkce, base64
from flask import Blueprint, request, redirect
import urllib.parse as url_parse
from tools.load_env import *

authBP = Blueprint('authBP', __name__)
current_requests = []

def ensure_json(response):
    res = {'NOJSON': response}
    try:
        res = response.json()
    except Exception as e:
        print("Error: Response couldn't be parsed as json")
        print(e)
    return res

@authBP.route("/twitter/authorize", methods=["GET"])
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

@authBP.route("/twitter/", methods=["GET", "POST"])
def twitter_callback():
    code_verifier = current_requests[0]["verif"]
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
    r['user'] = current_requests[0]["user"]
    del current_requests[0]
    return {"code": rq.status_code, "message": r}