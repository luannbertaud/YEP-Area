#!/usr/bin/env python3

from flask import Flask
from flask_cors import CORS
from classes import hooksBP

app = Flask("app")
CORS(app, origins="*")

app.register_blueprint(hooksBP, url_prefix="/hooks")

@app.route("/ping",)
def app_ping():
    return "pong"