#!/usr/bin/env python3

import asyncio
from discord import Client
from threading import Thread
from tools.env import DISCORD_BOT_TOKEN
from tools.threading import loop_exec, wait_for
from models.area import Reaction

class DiscordAPIWrapper():

    def __init__(self, channel_id) -> None:
        self.ready = False

        self.channel = None
        self.channel_id = channel_id
        
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)

        self.client = Client(loop=self.loop)
        self.client.event(self.on_ready)
        self.client.event(self.on_message)

        self.loop.create_task(self.client.start(DISCORD_BOT_TOKEN))
        Thread(target=self.loop.run_forever).start()

    async def on_ready(self):
        self.ready = True
        self.channel = self.client.get_channel(int(self.channel_id))
        # print('We have logged in as {0.user}'.format(self.client))

    async def on_message(self, message):
        if (not self.ready) or (message.author == self.client.user):
            return

        if message.content.startswith('$hello'):
            await message.channel.send('Response')

    def close_connection(self):
        async def __close_connection(self):
            await self.client.close()

        if self.ready:
            loop_exec(__close_connection(self), self.loop)
        else:
            print("Error connection not ready yet")

    def send_message(self, message):
        async def __send_message(self, _message):
            await self.channel.send(_message)

        wait_for(self, "ready")
        if self.ready:
            loop_exec(__send_message(self, message), self.loop)
        else:
            print("Error connection not ready yet")


class DiscordMessageReaction(Reaction):

    def __init__(self, rqUser, channel_id, uuid=None) -> None:
        self.channed_id = channel_id
        self.api =  DiscordAPIWrapper(channel_id)
        super().__init__("discord", rqUser, channel_id, uuid=uuid)

    def do(self, params):
        if len(params) < 1:
            return self.api.send_message("Default content")
        return self.api.send_message(params[0])
