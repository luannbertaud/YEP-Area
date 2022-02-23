#!/usr/bin/env python3

import base64
from flask import request
from peewee import DoesNotExist
from models.db import Actions, Users
from tools.actions import executeAction
from tools.reactions import executeReaction
from pprint import pprint
import json
from controllers.reactions.gmail import GmailAPIWrapper

# import requests
# import base64
# from tools.fomarting import ensure_json
# from tools.tokens import get_tokens, tokens_reload
# from tools.env import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SERV_URL
# from models.area import Action

# class GithubWebhookAction(Action):

#     def __init__(self, rqUser, uuid=None) -> None:
#         self.rqUser = rqUser
#         self.api =  GithubAPIWrapper(rqUser)
#         super().__init__("github", rqUser, uuid=uuid)

#     def register(self, owner, repository, *args):
#         return self.api.create_webhook(owner, repository)

def gmailHook():
    data = request.json
    pprint(data)
    api = GmailAPIWrapper("0")
    historyId = json.loads(base64.urlsafe_b64decode(data["message"]["data"]))["historyId"]
    print(historyId)
    executeReaction("1111", [api.get_last_email_content(str(historyId))])
    return {"code": 200, "message": "ok"}
    # headers = request.headers
    # repo_name = data["repository"]["name"]
    # repo_owner = data["repository"]["owner"]["login"]
    # area_user = None
    # area_repo = None

    # if (headers["X-Github-Event"] == "ping"):
    #     return {"code": 200, "message": "OK pong"}

    # try:
    #     query = Users.select().where(Users.oauth.is_null(False))
    #     if not query:
    #         raise DoesNotExist("Empty query")
    # except DoesNotExist as e:
    #     return {"code": 200, "message": "ERROR no users connected to github"}
    
    # for u in query:
    #     if ("github" in list(u.oauth.keys())) and ("login" in list(u.oauth["github"].keys())) and (u.oauth["github"]["login"] == repo_owner):
    #         area_user = u.uuid
    # if area_user == None:
    #     return {"code": 200, "message": "ERROR could not find corresponding area user"}

    # try:
    #     query = Actions.select().where(Actions.type == "GithubWebhook", Actions.user_uuid == area_user)
    #     if not query:
    #         raise DoesNotExist("Empty query")
    # except DoesNotExist as e:
    #     return {"code": 200, "message": "ERROR this user does not have any github action"}

    # for a in query:
    #     if ("repository" in list(a.content.keys())) and a.content["repository"] == repo_name:
    #         if ("owner" in list(a.content.keys())) and a.content["owner"] == repo_owner:
    #             area_repo = a.uuid
    # if not area_repo:
    #     return {"code": 200, "message": "ERROR could not find corresponding area action"}

    # executeAction(area_repo, [f"GithubHook - Owner:[{repo_owner}] Repo:[{repo_name}]"])
    # return {"code": 200, "message": "OK"}