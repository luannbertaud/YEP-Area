#!/usr/bin/env python3

from flask import request
from peewee import DoesNotExist
from models.db import Actions, Users
from tools.actions import executeAction

def githubHook():
    data = request.json
    repo_name = data["repository"]["name"]
    repo_owner = data["repository"]["owner"]["login"]
    area_user = None
    area_repo = None

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
        return {"code": 200, "message": "received"}

    try:
        query = Actions.select().where(Actions.type == "github", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "received"}

    for a in query:
        if a.content["repository"] == repo_name:
            area_repo = a.uuid
    if not area_repo:
        return {"code": 200, "message": "received"}

    executeAction(area_repo, [f"GithubHook - Owner:[{repo_owner}] Repo:[{repo_name}]"])
    return {"code": 200, "message": "received"}