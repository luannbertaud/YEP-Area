#!/usr/bin/env python3

import os
import json
import threading
import signal
from flask import Flask
from flask_cors import CORS
from tools.db import validateDatabase
from tools.watcher import start_watchers, Watcher
from controllers.actions.hooks import hooksBP
from controllers.auth.area import areaAuthBP
from controllers.oauth.epitech import epitechAuthBP
from controllers.oauth.twitter import twitterAuthBP
from controllers.oauth.github import githubAuthBP
from controllers.oauth.google import googleAuthBP
from controllers.oauth.spotify import spotifyAuthBP
from controllers.widgets.widgets import widgetsBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")
app.register_blueprint(areaAuthBP, url_prefix="/auth/area")
app.register_blueprint(epitechAuthBP, url_prefix="/auth/epitech")
app.register_blueprint(twitterAuthBP, url_prefix="/auth/twitter")
app.register_blueprint(githubAuthBP, url_prefix="/auth/github")
app.register_blueprint(googleAuthBP, url_prefix="/auth/google")
app.register_blueprint(spotifyAuthBP, url_prefix="/auth/spotify")
app.register_blueprint(widgetsBP, url_prefix="/widgets")

validateDatabase()
start_watchers()

@app.route("/ping")
def app_ping():
    return "pong"

@app.route("/about.json")
def app_aboutjson():
    data = {}
    path = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))

    try:
        with open(os.path.join(path, 'about.json')) as f:
            data = json.load(f)
    except Exception as e:
        return {"code": 500, "message": f"Failed to load about.json: {e}"}, 500
    return data


def signal_handler(sig, frame):
    for t in threading.enumerate():
        if (not isinstance(t, Watcher)):
            continue
        print(f'Exiting thread [{t.name}]...')
        t.stop()
    exit(0)

signal.signal(signal.SIGINT, signal_handler)