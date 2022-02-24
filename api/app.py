#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from tools.db import validateDatabase
from controllers.actions.hooks import hooksBP
from controllers.auth.area import areaAuthBP
from controllers.oauth.twitter import twitterAuthBP
from controllers.oauth.github import githubAuthBP
from controllers.oauth.google import googleAuthBP
from controllers.oauth.spotify import spotifyAuthBP
from controllers.widgets.update import widgetsUpdateBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")
app.register_blueprint(areaAuthBP, url_prefix="/auth/area")
app.register_blueprint(twitterAuthBP, url_prefix="/auth/twitter")
app.register_blueprint(githubAuthBP, url_prefix="/auth/github")
app.register_blueprint(googleAuthBP, url_prefix="/auth/google")
app.register_blueprint(spotifyAuthBP, url_prefix="/auth/spotify")
app.register_blueprint(widgetsUpdateBP, url_prefix="/widgets")

validateDatabase()

@app.route("/ping",)
def app_ping():
    return "pong"