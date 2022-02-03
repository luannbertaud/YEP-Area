#!/usr/bin/env python3

# from tools.fomarting import ensure_json
# from tools.tokens import get_tokens, tokens_reload
# from tools.env import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET
# from models.area import Trigger
from flask import request
from peewee import DoesNotExist
from models.db import Actions, Users

# class GitHubTrigger(Trigger):

#     def __init__(self, toTrigger=[], uuid=None) -> None:
#         super().__init__("github", toTrigger=toTrigger, uuid=uuid)

#     def pull(self):
#         # print(request.json)
#         self.execute([])
#         return {"code" : 200}

def githubHook():
    data = request.json
    repo_name = data["repository"]["name"]
    repo_owner = data["repository"]["owner"]["login"]
    area_user = None
    area_repo = None

    print(f"Owner:[{repo_owner}] Repo:[{repo_name}]")

    try:
        query = Users.select().where(Users.github.is_null(False))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "received"}
    
    for u in query:
        if u.github["login"] == repo_owner:
            area_user = u.uuid
    if area_user == None:
        return {"code": 201, "message": "received"}

    try:
        query = Actions.select().where(Actions.type == "github", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 202, "message": "received"}

    for a in query:
        if a.content["repository"] == repo_name:
            area_repo = a.uuid
    if not area_repo:
        return {"code": 203, "message": "received"}

    # a.execute
    print(f"{area_repo}")
    return {"code": 204, "message": "received"}