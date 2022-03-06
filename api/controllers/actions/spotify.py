#!/usr/bin/env python3

import re
import threading
from flask import request
from tools.env import SERV_URL
from controllers.reactions.spotify import SpotifyAPIWrapper
from models.area import Action
from tools.actions import executeAction
from tools.watcher import Watcher

class SpotifyMonthArtistChangeWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  SpotifyAPIWrapper(rqUser)
        super().__init__("spotify", rqUser, uuid=uuid)
        self.watcher = Watcher(SERV_URL + "hooks/spotify", "SpotifyMonthArtistChangeWebhook", delay=7200, target=self.api.month_artist, additional_header={"WebhookType": "month_artist", "AreaUser": self.rqUser, "ActionUUID": self.uuid})

    def register(self, *args):
        for t in threading.enumerate():
            if (not isinstance(t, Watcher)):
                continue
            if (t.name == "SpotifyMonthArtistChangeWebhook"):
                return self.watcher
        self.watcher.start()
        return self.watcher

    def unregister(self, *args):
        self.watcher.stop()
        return self.watcher

class SpotifyTrackChangeWebhookAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        self.api =  SpotifyAPIWrapper(rqUser)
        super().__init__("spotify", rqUser, uuid=uuid)
        self.watcher = Watcher(SERV_URL + "hooks/spotify", "SpotifyTrackChangeWebhook", delay=5, target=self.api.currently_playing, additional_header={"WebhookType": "currently_playing", "AreaUser": self.rqUser, "ActionUUID": self.uuid})

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
    track = data['data'][0]
    area_action = headers['ActionUUID']
    if ('featuring' in track.keys()):
        executeAction(area_action, [f"SpotifyTrackChangeWebhook:\n {track['title']} - {track['artist']} ft. {track['featuring']}\n{track['image']}", f"{track['title']} - {track['artist']} ft. {track['featuring']}"])
    else:
        executeAction(area_action, [f"SpotifyTrackChangeWebhook:\n {track['title']} - {track['artist']}\n{track['image']}", f"{track['title']} - {track['artist']}"])
    return {"code": 200, "message": "OK"}

def __spotifyMonthArtistChangeHook(data, headers):
    print(data)
    artist = data['data'][0]
    area_action = headers['ActionUUID']
    print(artist)
    executeAction(area_action, [f"SpotifyMonthArtistChangeWebhook:\n Your new favorite artist for this month is {artist['artist']} !\n{artist['image']}", f"{artist['artist']}"])
    return {"code": 200, "message": "OK"}


def spotifyHook():
    data = request.json
    headers = request.headers
    webhook_type = request.headers.get('WebhookType')
    if (not webhook_type):
        {"code": 400, "message": "Missing webhook type"}, 400
    if (webhook_type == "currently_playing"):
        return __spotifyTrackChangeHook(data, headers)
    if (webhook_type == "month_artist"):
        return __spotifyMonthArtistChangeHook(data, headers)
    return {"code": 400, "message": "Webhook type not supported yet"}, 400