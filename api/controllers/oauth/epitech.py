#!/usr/bin/env python3

import jwt
import requests
from cryptography.fernet import Fernet
from flask import Blueprint, request
import urllib.parse as url_parse
from peewee import DoesNotExist
from tools.db import needs_db
from tools.env import SERV_URL, SERV_ENCRYPT_KEY, JWT_SECRET
from tools.tokens import verify_jwt
from tools.fomarting import close_window, autologin_window
from models.db import Users

epitechAuthBP = Blueprint('epitechAuthBP', __name__)

@epitechAuthBP.route("/landing", methods=["GET"])
def epitech_landing():
    user_uuid = request.args.get('areauser')
    return autologin_window(SERV_URL + "auth/epitech/", user_uuid)

@epitechAuthBP.route("/authorize", methods=["GET"])
@verify_jwt
def epitech_authorize():
    auth = request.headers['Authorization']
    user_uuid = jwt.decode(auth, JWT_SECRET, "HS256")["user_uuid"]
    url = SERV_URL + "auth/epitech/landing"
    params = "?areauser=" + str(user_uuid)
    return {'code': 200, 'url': url + params}

@epitechAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def epitech_callback():
    session = requests.Session()
    autologin = request.args.get('autologin')
    rqUser = request.args.get('areauser')
    if (autologin == None):
        return {"code": 401, "message": "Invalid parameter for auto-login link."}, 401
    if (rqUser == None):
        return {"code": 401, "message": "Unknown area user."}, 401
    autologin = url_parse.unquote_plus(autologin)

    session.get(autologin)
    user_token = session.cookies.get_dict()
    if ("user" not in user_token.keys()):
        return {"code": 401, "message": "Can't retrieve user token from this auto-login link."}, 401
    user_token = user_token["user"]

    login = jwt.decode(user_token, options={"verify_signature": False})["login"]

    tokens = {
        "access_token": user_token,
        "refresh_token": Fernet(SERV_ENCRYPT_KEY.encode()).encrypt(autologin.encode()).decode("utf-8"),
        "login": login,
    }
    try:
        dbUser = Users.get(Users.uuid == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if not dbUser.oauth:
        dbUser.oauth = {}
    dbUser.oauth["epitech"] = tokens
    dbUser.save()
    return close_window()