#!/usr/bin/env python3

from uuid import uuid4 as guuid


class Reaction():

    def __init__(self, type, *args, uuid=None) -> None:
        self.type = type
        self.uuid = uuid
        if (not self.uuid):
            self.uuid = str(guuid())

    def do(self, params) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `do` function for this Reaction")

class Action():

    def __init__(self, type, *args, uuid=None) -> None:
        self.type = type
        self.uuid = uuid
        if (not self.uuid):
            self.uuid = str(guuid())

    def register(self, *args) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `register` function for this Action")