#!/usr/bin/env python3

from flask import Blueprint, request
from uuid import uuid4 as uuid

hooksBP = Blueprint('hooksBP', __name__)

class Action():

    def __init__(self) -> None:
        pass

    def do(self, params) -> None:
        pass

class Trigger():

    def __init__(self, toTrigger=[], type="unknown") -> None:
        self.type = type
        self.uuid = str(uuid())
        self.actions = toTrigger

    def execute(self, params) -> None:
        for a in self.actions:
            a.do(params)
    
    def pull(self) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `pull` function for this trigger")


class GitHubTrigger(Trigger):

    def __init__(self, toTrigger=[], type="unknown", uuid=None) -> None:
        super().__init__(toTrigger, type)
        # TODO remove custom uuid
        if uuid:
            self.uuid = uuid

    def pull(self):
        # print(request.json)
        self.execute([])
        return {"code" : 200}






def registerTrigger(trigger : Trigger):
    print(f"Registering a [{trigger.type}] hook ({trigger.uuid[:4]}...{trigger.uuid[-4:]}) at /hooks/{trigger.type}/{trigger.uuid}")
    hooksBP.add_url_rule(trigger.type + "/" + trigger.uuid, endpoint=trigger.uuid, view_func=trigger.pull, methods=["POST", "GET"])


triggers = [
    GitHubTrigger([], "github", "1"),
    GitHubTrigger([], "github", "2")
]
for t in triggers:
    registerTrigger(t)

