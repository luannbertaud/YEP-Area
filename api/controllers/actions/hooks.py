#!/usr/bin/env python3

from flask import Blueprint
from controllers.actions.github import githubHook
from controllers.actions.gmail import gmailHook
from controllers.actions.epitech import epitechHook
from controllers.actions.spotify import spotifyHook

hooksBP = Blueprint('hooksBP', __name__)

hooksBP.add_url_rule("/github", view_func=githubHook, methods=["POST"])
hooksBP.add_url_rule("/gmail", view_func=gmailHook, methods=["POST"])
hooksBP.add_url_rule("/epitech", view_func=epitechHook, methods=["POST"])
hooksBP.add_url_rule("/spotify", view_func=spotifyHook, methods=["POST"])