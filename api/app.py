#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from classes import hooksBP
from oauth import authBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")
app.register_blueprint(authBP, url_prefix="/auth")

@app.route("/ping",)
def app_ping():
    return "pong"