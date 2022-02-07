from discord import Client
import os
from threading import Thread
import asyncio
from time import sleep
from tools.env import DISCORD_BOT_TOKEN

def loop_exec(coro, loop):
    callback = lambda: asyncio.ensure_future(coro)
    loop.call_soon_threadsafe(callback)

class DiscordAPIWrapper():

    def __init__(self, channel) -> None:
        self.ready = False

        self.channel = None
        self.channel_id = channel
        
        self.client = Client()
        self.client.event(self.on_ready)
        self.client.event(self.on_message)

        self.loop = asyncio.get_event_loop()
        self.loop.create_task(self.client.start(DISCORD_BOT_TOKEN))
        Thread(target=self.loop.run_forever).start()

    async def on_ready(self):
        self.ready = True
        self.channel = self.client.get_channel(int(self.channel_id))
        print('We have logged in as {0.user}'.format(self.client))

    async def on_message(self, message):
        if (not self.ready) or (message.author == self.client.user):
            return

        if message.content.startswith('$hello'):
            await message.channel.send('Response')

    # async def on_typing(channel, user, when):
    #     await user.send(f'Ici le FBI arretez tout de suite ce que vous etes en train de faire !')

    def close_connection(self):
        async def __close_connection(self):
            await self.client.close()

        if self.ready:
            loop_exec(__close_connection(self), self.loop)
        else:
            print("Error connection not ready yet")

    def send_message(self):
        async def __send_message(self, message):
            await self.channel.send(message)

        if self.ready:
            loop_exec(__send_message(self, "alo3.0"), self.loop)
        else:
            print("Error connection not ready yet")




d = DiscordAPIWrapper("937707430643634177")
sleep(3)
d.send_message()
sleep(1)
d.close_connection()
