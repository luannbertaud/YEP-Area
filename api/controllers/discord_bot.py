import discord
import os

#from tools.env import DISCORD_BOT_TOKEN

client = discord.Client()

@client.event
async def on_ready():
    print('We have logged in as {0.user}'.format(client))

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$hello'):
        await message.channel.send('Hello!')

client.run('OTM3Njk1Njc0MTQ3OTQyNDQx.YfffJg.i7Ikp4Yw3KHc8ljwORpzc_Jg2ko')