#!/usr/bin/env python3

import asyncio
from functools import wraps
from time import sleep

def loop_exec(coro, loop):
    callback = lambda: asyncio.ensure_future(coro)
    loop.call_soon_threadsafe(callback)

def wait_for(obj, val, delay=0.5):
    while (not getattr(obj, val)):
        sleep(delay)