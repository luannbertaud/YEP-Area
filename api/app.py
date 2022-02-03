#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from controllers.actions.hooks import hooksBP
from controllers.oauth.twitter import twitterAuthBP
from controllers.widgets.update import widgetsUpdateBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")
app.register_blueprint(twitterAuthBP, url_prefix="/auth/twitter")
app.register_blueprint(widgetsUpdateBP, url_prefix="/widgets")

from tools.db import validateDatabase

validateDatabase()

@app.route("/ping",)
def app_ping():
    return "pong"