#!/usr/bin/env python3

import jwt
import requests
from flask import Blueprint, request, redirect
import urllib.parse as url_parse
from peewee import DoesNotExist
from tools.db import needs_db
from tools.env import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SERV_URL, JWT_SECRET
from tools.fomarting import ensure_json, close_window
from tools.tokens import verify_jwt
from models.db import Users

githubAuthBP = Blueprint('githubAuthBP', __name__)
current_requests = []

@githubAuthBP.route("/authorize", methods=["GET"])
@verify_jwt
def github_authorize():
    auth = request.headers['Authorization']
    user_uuid = jwt.decode(auth, JWT_SECRET, "HS256")["user_uuid"]
    current_requests.append({"user_uuid":user_uuid})
    list({v['user_uuid']:v for v in current_requests}.values())
    url = "https://github.com/login/oauth/authorize"
    params = "?&state=state&scope=" + url_parse.quote_plus("repo")
    params += "&client_id=" + url_parse.quote_plus(GITHUB_CLIENT_ID)
    params += "&redirect_uri=" + url_parse.quote_plus(SERV_URL + "auth/github/")
    return {'code': 200, 'url': url + params}

@githubAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def github_callback():
    if (len(current_requests) <= 0):
        {"code": 401, "message": "This url must be called by authentification entity."}, 401
    rqUser = current_requests[0]["user_uuid"]
    del current_requests[0]
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
    if rq.status_code != 200:
        return {"code": rq.status_code, "message": r}

    rqu = requests.get("https://api.github.com/user", headers={"Accept": "application/json", "Authorization": f"token {r['data']['access_token']}"})
    ru = ensure_json(rqu)
    r['data']['login'] = ru['data']["login"]
    if rqu.status_code != 200:
        return {"code": rqu.status_code, "message": ru}, rqu.status_code

    tokens = {
        "access_token": r['data']['access_token'],
        "refresh_token": None,
        "login": ru['data']["login"],
    }
    try:
        dbUser = Users.get(Users.uuid == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if not dbUser.oauth:
        dbUser.oauth = {}
    dbUser.oauth["github"] = tokens
    dbUser.save()
    return close_window()