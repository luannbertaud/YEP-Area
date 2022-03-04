#!/usr/bin/env python3

from flask import Blueprint
from tools.env import DISCORD_CLIENT_ID
from tools.tokens import verify_jwt

discordAuthBP = Blueprint('discordAuthBP', __name__)

@discordAuthBP.route("/authorize", methods=["GET"])
@verify_jwt
def discord_authorize():
    url = "https://discord.com/api/oauth2/authorize"
    params = "?client_id=" + DISCORD_CLIENT_ID
    params += "&permissions=8&scope=bot"
    return {'code': 200, 'url': url + params}