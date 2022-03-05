#!/usr/bin/env python3

import re
from flask import request
from peewee import DoesNotExist
from models.db import Actions, Users
from tools.actions import executeAction

import requests
from tools.fomarting import ensure_json
from tools.tokens import get_tokens, tokens_reload
from tools.env import GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, SERV_URL
from models.area import Action

class GithubAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.load_tokens()
        self.client = {"id": GITHUB_CLIENT_ID, "secret": GITHUB_CLIENT_SECRET}

    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "github")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init GithubAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = tokens["refresh_token"]

    @tokens_reload(reloader=load_tokens)
    def list_webhooks(self, owner, repo):
        headers = {
            "Accept": "application/json",
            "Authorization": f"token {self.access_token}"
        }
        r = requests.get(f"https://api.github.com/repos/{owner}/{repo}/hooks", headers=headers)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def revoke_webhook(self, owner, repo, events=["push"]):
        headers = {
            "Accept": "application/json",
            "Authorization": f"token {self.access_token}"
        }
        r = requests.get(f"https://api.github.com/repos/{owner}/{repo}/hooks", headers=headers)
        r = ensure_json(r)
        hook_id = -1
        for h in  r['data']:
            if ((h['config']['url'] == SERV_URL+"hooks/github") and (h['events'] == events)):
                hook_id = h['id']
                break
        if (hook_id == -1):
            return None
        r = requests.delete(f"https://api.github.com/repos/{owner}/{repo}/hooks/{hook_id}", headers=headers)
        return {"code": 200, "message": "OK"}

    @tokens_reload(reloader=load_tokens)
    def create_webhook(self, owner, repo, events=["push"]):
        data = { "config" : {
                "url": SERV_URL+"hooks/github",
                "content_type": "json",
                "insecure_ssl": 1,
                "token": self.access_token,
                "digest": None,
            },
            "events": events,
        }
        headers = {
            "Accept": "application/json",
            "Authorization": f"token {self.access_token}"
        }
        r = requests.post(f"https://api.github.com/repos/{owner}/{repo}/hooks", headers=headers, json=data)
        return ensure_json(r)

    @tokens_reload(reloader=load_tokens)
    def create_issue(self, owner, repo, title, body):
        data = {
            "title": title,
            "body": body,
            "content_type": "json",
        }
        headers = {
            "Accept": "application/json",
            "Authorization": f"token {self.access_token}"
        }
        r = requests.post(f"https://api.github.com/repos/{owner}/{repo}/issues", headers=headers, json=data)
        r = ensure_json(r)
        if ((r['code'] == 404) and ("message" in r['data']) and (r['data']['message'] == "Not Found")):
            return {'code': 200, "message": "ERROR repository not found"}
        return r

class GithubWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  GithubAPIWrapper(rqUser)
        super().__init__("github", rqUser, uuid=uuid)

    def register(self, owner, repository, *args):
        return self.api.create_webhook(owner, repository)

    def unregister(self, owner, repository, *args):
        return self.api.revoke_webhook(owner, repository)

class GithubWorkflowFailedAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  GithubAPIWrapper(rqUser)
        super().__init__("github", rqUser, uuid=uuid)

    def register(self, owner, repository, *args):
        return self.api.create_webhook(owner, repository, events=["workflow_run"])

    def unregister(self, owner, repository, *args):
        return self.api.revoke_webhook(owner, repository, events=["workflow_run"])

class GithubNewPullRequestAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  GithubAPIWrapper(rqUser)
        super().__init__("github", rqUser, uuid=uuid)

    def register(self, owner, repository, *args):
        return self.api.create_webhook(owner, repository, events=["pull_request"])

    def unregister(self, owner, repository, *args):
        return self.api.revoke_webhook(owner, repository, events=["pull_request"])

def __githubNewPullRequestHook(data, headers):
    repo_name = data["repository"]["name"]
    repo_owner = data["repository"]["owner"]["login"]
    pr_link = data["pull_request"]["url"]
    pr_link = re.sub(r'(api.github.com\/repos)', 'github.com', pr_link)
    area_user = None
    area_repo = None

    if (data["pull_request"]["state"] != "open"):
        return {"code": 200, "message": "OK not interested"}

    try:
        query = Users.select().where(Users.oauth.is_null(False))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR no users connected to github"}
    
    for u in query:
        if ("github" in list(u.oauth.keys())) and ("login" in list(u.oauth["github"].keys())) and (u.oauth["github"]["login"] == repo_owner):
            area_user = u.uuid
    if area_user == None:
        return {"code": 200, "message": "ERROR could not find corresponding area user"}

    try:
        query = Actions.select().where(Actions.type == "GithubNewPullRequest", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR this user does not have any github action"}

    for a in query:
        if ("repository" in list(a.content.keys())) and a.content["repository"] == repo_name:
            if ("owner" in list(a.content.keys())) and a.content["owner"] == repo_owner:
                area_repo = a.uuid
    if not area_repo:
        return {"code": 200, "message": "ERROR could not find corresponding area action"}

    executeAction(area_repo, [f"GithubNewPullRequestHook - Owner:[{repo_owner}] Repo:[{repo_name}]\n{pr_link}", f"{repo_owner} {repo_name}"])
    return {"code": 200, "message": "OK"}


def __githubWorkflowFailHook(data, headers):
    repo_name = data["repository"]["name"]
    repo_owner = data["repository"]["owner"]["login"]
    area_user = None
    area_repo = None

    if (data["workflow_run"]["status"] != "completed"):
        return {"code": 200, "message": "OK not interested"}
    if ((data["workflow_run"]["status"] == "completed") and (data["workflow_run"]["conclusion"] != "failure")):
        return {"code": 200, "message": "OK not interested"}

    try:
        query = Users.select().where(Users.oauth.is_null(False))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR no users connected to github"}
    
    for u in query:
        if ("github" in list(u.oauth.keys())) and ("login" in list(u.oauth["github"].keys())) and (u.oauth["github"]["login"] == repo_owner):
            area_user = u.uuid
    if area_user == None:
        return {"code": 200, "message": "ERROR could not find corresponding area user"}

    try:
        query = Actions.select().where(Actions.type == "GithubWorkflowFailed", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR this user does not have any github action"}

    for a in query:
        if ("repository" in list(a.content.keys())) and a.content["repository"] == repo_name:
            if ("owner" in list(a.content.keys())) and a.content["owner"] == repo_owner:
                area_repo = a.uuid
    if not area_repo:
        return {"code": 200, "message": "ERROR could not find corresponding area action"}

    executeAction(area_repo, [f"GithubWorkflowFailedHook - Owner:[{repo_owner}] Repo:[{repo_name}]", f"{repo_owner} {repo_name}"])
    return {"code": 200, "message": "OK"}

def __githubPushHook(data, headers):
    repo_name = data["repository"]["name"]
    repo_owner = data["repository"]["owner"]["login"]
    area_user = None
    area_repo = None

    try:
        query = Users.select().where(Users.oauth.is_null(False))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR no users connected to github"}
    
    for u in query:
        if ("github" in list(u.oauth.keys())) and ("login" in list(u.oauth["github"].keys())) and (u.oauth["github"]["login"] == repo_owner):
            area_user = u.uuid
    if area_user == None:
        return {"code": 200, "message": "ERROR could not find corresponding area user"}

    try:
        query = Actions.select().where(Actions.type == "GithubWebhook", Actions.user_uuid == area_user)
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return {"code": 200, "message": "ERROR this user does not have any github action"}

    for a in query:
        if ("repository" in list(a.content.keys())) and a.content["repository"] == repo_name:
            if ("owner" in list(a.content.keys())) and a.content["owner"] == repo_owner:
                area_repo = a.uuid
    if not area_repo:
        return {"code": 200, "message": "ERROR could not find corresponding area action"}

    executeAction(area_repo, [f"GithubPushHook - Owner:[{repo_owner}] Repo:[{repo_name}]", f"{repo_owner} {repo_name}"])
    return {"code": 200, "message": "OK"}

def githubHook():
    data = request.json
    headers = request.headers

    print(headers["X-Github-Event"])
    print(data)
    if (headers["X-Github-Event"] == "ping"):
        return {"code": 200, "message": "OK pong"}
    if (headers["X-Github-Event"] == "push"):
        return __githubPushHook(data, headers)
    if (headers["X-Github-Event"] == "workflow_run"):
        return __githubWorkflowFailHook(data, headers)
    if (headers["X-Github-Event"] == "pull_request"):
        return __githubNewPullRequestHook(data, headers)
    return {"code": 400, "message": "Webhook type not supported yet"}, 400