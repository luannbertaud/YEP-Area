#!/usr/bin/env python3

import re
import threading
from flask import request
from tools.env import SERV_URL
from controllers.reactions.spotify import SpotifyAPIWrapper
from models.area import Action
from tools.watcher import Watcher


class SpotifyTrackChangeWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  SpotifyAPIWrapper(rqUser)
        super().__init__("spotify", rqUser, uuid=uuid)
        self.watcher = Watcher(SERV_URL + "hooks/spotify", "SpotifyTrackChangeWebhook", target=self.api.currently_playing, additional_header={"WebhookType": "currently_playing", "AreaUser": self.rqUser, "ActionUUID": self.uuid})

    def register(self, *args):
        for t in threading.enumerate():
            if (not isinstance(t, Watcher)):
                continue
            if (t.name == "SpotifyTrackChangeWebhook"):
                return self.watcher
        self.watcher.start()
        return self.watcher

    def unregister(self, *args):
        self.watcher.stop()
        return self.watcher

def __spotifyTrackChangeHook(data, headers):
    notif = data['data'][0]
    area_action = headers['ActionUUID']
    print(data)
    # clean_title = re.sub(r'(<a.+?>)|(<\/a>)', '', notif['title'])
    # executeAction(area_action, [f"EpitechNotifHook - From:[{notif['user']['title']}] Title:[{clean_title}]", ])
    return {"code": 200, "message": "OK"}


def spotifyHook():
    data = request.json
    headers = request.headers
    webhook_type = request.headers.get('WebhookType')
    if (not webhook_type):
        {"code": 400, "message": "Missing webhook type"}, 400
    if (webhook_type == "currently_playing"):
        return __spotifyTrackChangeHook(data, headers)
    return {"code": 400, "message": "Webhook type not supported yet"}, 400