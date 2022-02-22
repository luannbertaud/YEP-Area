#!/usr/bin/env python3

# import requests, pkce, base64
from flask import Blueprint, request, redirect
import urllib.parse as url_parse
# from peewee import DoesNotExist
# from tools.db import needs_db
from tools.env import SERV_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
# from tools.fomarting import ensure_json
# from models.db import Users

import google.oauth2.credentials
import google_auth_oauthlib.flow
from pprint import pprint
import os

googleAuthBP = Blueprint('googleAuthBP', __name__)
current_requests = [] #TODO this solution is deprecated, waiting for the client to send us the ?code

@googleAuthBP.route("/authorize", methods=["GET"])
def google_authorize():
    user = request.args.get('user')

    os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
    config = {
        "web": {
            "client_id": GOOGLE_CLIENT_ID,
            "project_id": "mapvoyage",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": GOOGLE_CLIENT_SECRET
        }
    }
    flow = google_auth_oauthlib.flow.Flow.from_client_config(
        config,
        scopes=['https://www.googleapis.com/auth/gmail.metadata'])

    flow.redirect_uri = SERV_URL + "auth/google"
    authorization_url, _ = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    return redirect(authorization_url, code=302)

@googleAuthBP.route("/", methods=["GET", "POST"])
# @needs_db
def google_callback():
    config = {
        "web": {
            "client_id": GOOGLE_CLIENT_ID,
            "project_id": "mapvoyage",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": GOOGLE_CLIENT_SECRET
        }
    }
    flow = google_auth_oauthlib.flow.Flow.from_client_config(
        config,
        scopes=['https://www.googleapis.com/auth/gmail.metadata'])
    flow.redirect_uri = SERV_URL + "auth/google"

    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)
    credentials = flow.credentials
    return  {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }



    # code_verifier = current_requests[0]["verif"]
    # rqUser = current_requests[0]["user"]
    # data = {
    #     "code": request.args.get('code'),
    #     "grant_type" : "authorization_code",
    #     "client_id" : GOOGLE_CLIENT_ID,
    #     "code_verifier": code_verifier,
    #     "redirect_uri": SERV_URL + "auth/twitter/",
    # }
    # headers = {
    #     "Content-type" : "application/x-www-form-urlencoded",
    #     "Authorization" : "Basic " + (base64.b64encode(str.encode(f"{GOOGLE_CLIENT_ID}:{GOOGLE_CLIENT_SECRET}"))).decode()
    # }
    # rq = requests.post("https://api.twitter.com/2/oauth2/token", headers=headers, data=data)
    # r = ensure_json(rq)
    # r['data']['user'] = rqUser
    # del current_requests[0]
    # if rq.status_code != 200:
    #     return {"code": rq.status_code, "message": r}
    # # TODO get username from endpoint
    # tokens = {
    #     "access_token": r['data']['access_token'],
    #     "refresh_token": r['data']['refresh_token'],
    # }
    # try:
    #     dbUser = Users.get(Users.name == rqUser)
    # except DoesNotExist as e:
    #     return {"code": 401, "message": "Unknown Area user"}, 401
    # dbUser.twitter = tokens
    # dbUser.save()
    # return {"code": rq.status_code, "message": r}