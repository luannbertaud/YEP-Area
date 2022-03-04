#!/usr/bin/env python3

import threading
from models.area import Action
from controllers.reactions.discord import DiscordAPIWrapper
from tools.watcher import Watcher

class DiscordMessageReceivedAction(Action):

    def __init__(self, rqUser, uuid=None) -> None:
        self.rqUser = rqUser
        super().__init__("discord", rqUser, uuid=uuid)
        self.api = DiscordAPIWrapper(None, webhook_type="DiscordMessageReceived", action_uuid=self.uuid)

    def register(self, *args):
        self.api.registered = True
        return True

    def unregister(self, *args):
        self.api.registered = False
        return True