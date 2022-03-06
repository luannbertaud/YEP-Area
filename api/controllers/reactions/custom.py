#!/usr/bin/env python3

import requests
from tools.env import SERV_URL
from models.area import Reaction

class CustomPostReaction(Reaction):

    def __init__(self, rqUser, endpoint, uuid=None) -> None:
        self.rqUser = rqUser
        self.endpoint = endpoint
        super().__init__("custom", rqUser, uuid=uuid)

    def __post_payload(self, payload):
        headers = {
            "Content-type" : "application/json",
            "Server": "Area server: " + SERV_URL
        }
        data = {
            'data': payload
        }
        requests.post(self.endpoint, headers=headers, json=data)

    def do(self, params):
        if len(params) < 1:
            return self.__post_payload("Default content")
        return self.__post_payload(params[0])