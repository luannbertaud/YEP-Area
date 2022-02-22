#!/usr/bin/env python3

from flask import Blueprint, request, redirect
from peewee import DoesNotExist
import google_auth_oauthlib.flow
from tools.db import needs_db
from tools.env import SERV_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from models.db import Users


googleAuthBP = Blueprint('googleAuthBP', __name__)
current_requests = [] #TODO this solution is deprecated, waiting for the client to send us the ?code

@googleAuthBP.route("/authorize", methods=["GET"])
def google_authorize():
    user = request.args.get('user')
    if not user:
        return {"code": 401, "message": "Bad user parameter"}, 401
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
        scopes=['https://www.googleapis.com/auth/gmail.compose'])

    flow.redirect_uri = SERV_URL + "auth/google"
    flow.redirect_uri = SERV_URL + "auth/google"
    authorization_url, _ = flow.authorization_url(access_type='offline', prompt='consent')
    current_requests.append({"user":user})
    return redirect(authorization_url, code=302)

@googleAuthBP.route("/", methods=["GET", "POST"])
@needs_db
def google_callback():
    rqUser = current_requests[0]["user"]
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
        scopes=['https://www.googleapis.com/auth/gmail.compose'])
    flow.redirect_uri = SERV_URL + "auth/google"

    authorization_response = request.url
    try:
        flow.fetch_token(authorization_response=authorization_response)
    except Exception as e:
        return {"code": 401, "message": f"Error fetching access_token: {e}"}, 401
    # TODO get username from endpoint

    tokens = {
        'token': flow.credentials.token,
        'access_token': flow.credentials.token,
        'refresh_token': flow.credentials.refresh_token,
        'token_uri': flow.credentials.token_uri,
        'client_id': flow.credentials.client_id,
        'client_secret': flow.credentials.client_secret,
        'scopes': flow.credentials.scopes
    }
    try:
        dbUser = Users.get(Users.name == rqUser)
    except DoesNotExist as e:
        return {"code": 401, "message": "Unknown Area user"}, 401
    if not dbUser.oauth:
        dbUser.oauth = {}
    dbUser.oauth["google"] = tokens
    dbUser.save()
    return {"code": 200, "message": tokens}