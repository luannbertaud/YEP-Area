#!/usr/bin/env python3

from uuid import uuid4 as guuid


class Action():

    def __init__(self, type, *args, uuid=None) -> None:
        self.type = type
        self.uuid = uuid
        if (not self.uuid):
            self.uuid = str(guuid())

    def do(self, params) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `do` function for this Action")


class Trigger():

    def __init__(self, type, *args, toTrigger=[], uuid=None) -> None:
        self.type = type
        self.actions = toTrigger
        self.uuid = uuid
        if (not self.uuid):
            self.uuid = str(guuid())

    def execute(self, params) -> None:
        for a in self.actions:
            print(f"[{self.type}] ({self.uuid[:4]}...{self.uuid[-4:]}) triggered: {a.do(params)}")
    
    def pull(self) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `pull` function for this Trigger")