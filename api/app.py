#!/usr/bin/env python3

import os
import json
import threading
import signal
import time
from flask import Flask, request, send_from_directory
from flask_cors import CORS
from tools.db import validateDatabase
from tools.watcher import start_deamons, Watcher
from controllers.actions.hooks import hooksBP
from controllers.auth.area import areaAuthBP
from controllers.oauth.discord import discordAuthBP
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
app.register_blueprint(discordAuthBP, url_prefix="/auth/discord")
app.register_blueprint(epitechAuthBP, url_prefix="/auth/epitech")
app.register_blueprint(twitterAuthBP, url_prefix="/auth/twitter")
app.register_blueprint(githubAuthBP, url_prefix="/auth/github")
app.register_blueprint(googleAuthBP, url_prefix="/auth/google")
app.register_blueprint(spotifyAuthBP, url_prefix="/auth/spotify")
app.register_blueprint(widgetsBP, url_prefix="/widgets")

if (validateDatabase()):
    start_deamons()

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
    data['client']['host'] = request.remote_addr
    data['server']['current_time'] = int(str(time.time()).split(".")[0])
    return data

@app.route("/client.apk")
def app_clientapk():
    path = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__)))
    path = os.path.join(path, "apk_vol")
    if (not os.path.isfile(os.path.join(path, "client.apk"))):
        return "Client APK not available on server yet."
    return send_from_directory(directory=path, filename="client.apk")

def signal_handler(sig, frame):
    for t in threading.enumerate():
        if (not isinstance(t, Watcher)):
            continue
        t.stop()
    exit(0)

signal.signal(signal.SIGINT, signal_handler)