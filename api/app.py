#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from controllers.hooks import hooksBP
from controllers.oauth.twitter import twitterAuthBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")
app.register_blueprint(twitterAuthBP, url_prefix="/auth/twitter")

@app.route("/ping",)
def app_ping():
    return "pong"