#!/usr/bin/env python3

import requests, pkce, base64
from flask import Blueprint, request, redirect
import urllib.parse as url_parse
from peewee import DoesNotExist
from tools.db import needs_db
from tools.env import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SERV_URL
from tools.fomarting import ensure_json
from models.db import Users

githubAuthBP = Blueprint('githubAuthBP', __name__)
current_requests = [] #TODO this solution is deprecated, waiting for the client to send us the ?code

@githubAuthBP.route("/authorize", methods=["GET"])
def github_authorize():
    user = request.args.get('user')
    if not user:
        return {"code": 401, "message": "Bad user parameter"}, 401
    current_requests.append({"user":user})
    url = "https://github.com/login/oauth/authorize"
    params = "?&state=state&scope=" + url_parse.quote_plus("repo")
    params += "&client_id=" + url_parse.quote_plus(GITHUB_CLIENT_ID)
    params += "&redirect_uri=" + url_parse.quote_plus(SERV_URL + "auth/github/")
    return redirect(url + params, code=302)

@githubAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def github_callback():
    rqUser = current_requests[0]["user"]
    data = {
        "code": request.args.get('code'),
        "client_id" : GITHUB_CLIENT_ID,
        "client_secret" : GITHUB_CLIENT_SECRET,
        "redirect_uri": SERV_URL + "auth/github/",
    }
    headers = {
        "Content-type" : "application/x-www-form-urlencoded",
        "Accept": "application/json",
    }
    rq = requests.post("https://github.com/login/oauth/access_token", headers=headers, data=data)
    r = ensure_json(rq)
    r['data']['user'] = rqUser
    del current_requests[0]
    if rq.status_code != 200:
        return {"code": rq.status_code, "message": r}

    rqu = requests.get("https://api.github.com/user", headers={"Accept": "application/json", "Authorization": f"token {r['data']['access_token']}"})
    ru = ensure_json(rqu)
    r['data']['login'] = ru['data']["login"]
    if rqu.status_code != 200:
        return {"code": rqu.status_code, "message": ru}

    tokens = {
        "access_token": r['data']['access_token'],
        "refresh_token": None,
        "login": ru['data']["login"],
    }
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    dbUser.github = tokens
    dbUser.save()
    return {"code": rq.status_code, "message": r}