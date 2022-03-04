#!/usr/bin/env python3

import asyncio
import threading
from discord import Client
from threading import Thread
from tools.env import DISCORD_BOT_TOKEN
from tools.threading import loop_exec, wait_for
from models.area import Reaction
from tools.watcher import Watcher

class DiscordAPIWrapper():

    def __init__(self, channel_id, webhook_type="", action_uuid="-1") -> None:
        from tools.actions import executeAction

        self.ready = False
        self.registered = False
        self.action_uuid = str(action_uuid)
        self.executeAction = executeAction

        self.channel = None
        self.channel_id = channel_id

        for t in threading.enumerate():
            if (self.action_uuid == "-1" or (not isinstance(t, Watcher))):
                continue
            if (t.name == ("Watcher"+webhook_type+self.action_uuid)):
                return
        
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)

        self.client = Client(loop=self.loop)
        self.client.event(self.on_ready)
        self.client.event(self.on_message)

        self.loop.create_task(self.client.start(DISCORD_BOT_TOKEN))
        self.watchdog = Watcher("", webhook_type+self.action_uuid, target=self.watchdog_placeholder, cleaner=self.close_connection)
        self.watchdog.start()
        Thread(target=self.loop.run_forever).start()
    
    def watchdog_placeholder(self):
        return "stay"

    async def on_ready(self):
        self.ready = True
        if (self.channel_id):
            self.channel = self.client.get_channel(int(self.channel_id))
        else:
            self.channel = None

    async def on_message(self, message):
        if (not self.ready) or (message.author == self.client.user) or (not self.registered) or (self.action_uuid == "-1"):
            return

        self.executeAction(self.action_uuid, [f"DiscordMessageReceived: {message.content}",])

    def close_connection(self):
        async def __close_connection(self):
            await self.client.close()

        if self.ready:
            loop_exec(__close_connection(self), self.loop)
        else:
            print("Error connection not ready yet")
        self.loop.stop()

    def send_message(self, message):
        async def __send_message(self, _message):
            await self.channel.send(_message)

        wait_for(self, "ready")
        if self.ready:
            if (not self.channel):
                print('Error: No channel id provided during API contruction')
            else:
                loop_exec(__send_message(self, message), self.loop)
        else:
            print("Error connection not ready yet")

    def stop_soon(self):
        async def __stop_soon(self):
            self.watchdog.stop()

        wait_for(self, "ready")
        if self.ready:
            loop_exec(__stop_soon(self), self.loop)
        else:
            print("Error connection not ready yet")


class DiscordMessageReaction(Reaction):

    def __init__(self, rqUser, channel_id, uuid=None) -> None:
        self.channed_id = channel_id
        self.api =  DiscordAPIWrapper(channel_id)
        super().__init__("discord", rqUser, channel_id, uuid=uuid)

    def do(self, params):
        if len(params) < 1:
            self.api.send_message("Default content")
        else:
            self.api.send_message(params[0])
        self.api.stop_soon()
