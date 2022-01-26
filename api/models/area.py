#!/usr/bin/env python3

from uuid import uuid4 as uuid


class Action():

    def __init__(self) -> None:
        pass

    def do(self, params) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `do` function for this Action")


class Trigger():

    def __init__(self, toTrigger=[], type="unknown") -> None:
        self.type = type
        self.uuid = str(uuid())
        self.actions = toTrigger

    def execute(self, params) -> None:
        for a in self.actions:
            print(f"[{self.type}] ({self.uuid[:4]}...{self.uuid[-4:]}) triggered: {a.do(params)}")
    
    def pull(self) -> None:
        raise Exception("Not Implemented Error: Please consider implementing the `pull` function for this Trigger")