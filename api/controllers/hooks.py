#!/usr/bin/env python3

from flask import Blueprint
from tools.env import *
from controllers.twitter import TwitterTweetAction
from controllers.github import GitHubTrigger, Trigger

hooksBP = Blueprint('hooksBP', __name__)


def registerTrigger(trigger : Trigger):
    print(f"Registering a [{trigger.type}] hook ({trigger.uuid[:4]}...{trigger.uuid[-4:]}) at /hooks/{trigger.type}/{trigger.uuid}")
    hooksBP.add_url_rule(trigger.type + "/" + trigger.uuid, endpoint=trigger.uuid, view_func=trigger.pull, methods=["POST", "GET"])


actions = [
    TwitterTweetAction("luann", "Triggered from push on github repository")
]
triggers = [
    GitHubTrigger([actions[0]], "1"),
    GitHubTrigger([], "2")
]
for t in triggers:
    registerTrigger(t)