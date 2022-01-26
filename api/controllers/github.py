#!/usr/bin/env python3

from tools.fomarting import ensure_json
from tools.tokens import get_tokens, tokens_reload
from tools.env import TWITTER_CLIENT_ID, TWITTER_CLIENT_SECRET
from models.area import Trigger

class GitHubTrigger(Trigger):

    def __init__(self, toTrigger=[], uuid=None) -> None:
        super().__init__(toTrigger, "github")
        # TODO remove custom uuid
        if uuid:
            self.uuid = uuid

    def pull(self):
        # print(request.json)
        self.execute([])
        return {"code" : 200}