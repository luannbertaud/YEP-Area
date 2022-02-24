#!/usr/bin/env python3

from flask import Blueprint
from controllers.actions.github import githubHook
from controllers.actions.gmail import gmailHook

hooksBP = Blueprint('hooksBP', __name__)

hooksBP.add_url_rule("/github", view_func=githubHook, methods=["POST"])
hooksBP.add_url_rule("/gmail", view_func=gmailHook, methods=["POST"])