#!/usr/bin/env python3

from os import environ
from dotenv import load_dotenv

load_dotenv()
SERV_URL = environ.get('SERV_URL')
TWITTER_CLIENT_ID = environ.get('TWITTER_CLIENT_ID')
TWITTER_CLIENT_SECRET = environ.get('TWITTER_CLIENT_SECRET')