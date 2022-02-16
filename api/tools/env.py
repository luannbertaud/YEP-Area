#!/usr/bin/env python3

from os import environ
from dotenv import load_dotenv

load_dotenv()
SERV_URL = environ.get('SERV_URL')
JWT_SECRET = environ.get('JWT_SECRET')
JWT_VALIDITY_DELTA = environ.get('JWT_VALIDITY_DELTA')

TWITTER_CLIENT_ID = environ.get('TWITTER_CLIENT_ID')
TWITTER_CLIENT_SECRET = environ.get('TWITTER_CLIENT_SECRET')
GITHUB_CLIENT_ID = environ.get('GITHUB_CLIENT_ID')
GITHUB_CLIENT_SECRET = environ.get('GITHUB_CLIENT_SECRET')

POSTGRES_PASSWORD = environ.get('POSTGRES_PASSWORD')
POSTGRES_USER = environ.get('POSTGRES_USER')
POSTGRES_PORT = environ.get('POSTGRES_PORT')
POSTGRES_HOST = environ.get('POSTGRES_HOST')
POSTGRES_DB_NAME = environ.get('POSTGRES_DB_NAME')

DISCORD_BOT_TOKEN = environ.get('DISCORD_BOT_TOKEN')