#!/usr/bin/env python3

import requests
from peewee import DoesNotExist
from threading import Thread, Event
from tools.fomarting import json_return_diff, action_to_json
from models.db import Actions

class Watcher(Thread):

    def __init__(self, webhook_endpoint, webhook_type, cleaner=None, *args, delay=10, additional_header=None, **kwargs):
        self._stop = Event()
        self.target = kwargs["target"]
        self.delay = delay
        self.webhook_endpoint = webhook_endpoint
        self.additional_header = additional_header
        self.cleaner = cleaner
        kwargs['target'] = self.runner
        webhook_type = "Watcher"+webhook_type
        super().__init__(*args, name=webhook_type, **kwargs)

    def stop(self):
        print(f"INFO: Exiting watcher [{self.name}]")
        self._stop.set()

    def runner(self, *args, **kwargs):
        base = None
        print(f"INFO: Starting watcher [{self.name}]")
        while (not self._stop.is_set()):
            res = self.target(*args)
            if (not base):
                base = res
            elif (res != base):
                headers = {"Watcher": self.name}
                headers.update(self.additional_header)
                requests.post(self.webhook_endpoint, headers=headers, json=json_return_diff(base, res))
                base = res
            self._stop.wait(self.delay)
        if (self.cleaner):
            self.cleaner()

def start_deamons():
    from controllers.widgets.register_widgets import register_action

    failed = []
    try:
        query = Actions.select().where((Actions.type == "EpitechNotifWebhook") | (Actions.type == "SpotifyTrackChangeWebhook") | (Actions.type == "SpotifyMonthArtistChangeWebhook") | (Actions.type == "DiscordMessageReceived"))
        if not query:
            raise DoesNotExist("Empty query")
    except DoesNotExist as e:
        return
    
    for a in query:
        if (not a.enabled):
            continue
        j = action_to_json(a)
        try:
            register_action(j)
        except Exception as e:
            failed.append(f"[{str(e)}]")
    if (len(failed) > 0):
        print(f"WARNING: Failed to start all deamons: {', '.join(failed)}")