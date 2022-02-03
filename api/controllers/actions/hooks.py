#!/usr/bin/env python3

from flask import Blueprint
from controllers.actions.github import githubHook

hooksBP = Blueprint('hooksBP', __name__)

hooksBP.add_url_rule("/github", view_func=githubHook, methods=["POST"])