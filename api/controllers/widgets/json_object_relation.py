#!/usr/bin/env python3

# from controllers.github import Trigger, GitHubTrigger
from controllers.twitter import Reaction, TwitterTweetReaction

# def create_trigger(w) -> Trigger:
#     if (w['type'] == "github"):
#         return GitHubTrigger(toTrigger=w['toTrigger'], uuid=w['uuid']) #TODO change toTrigger uuids to objects
#     raise NotImplementedError(f"[{w['uuid']}] Trigger type ({w['type']}) is not supported yet")

def create_reaction(w) -> Reaction:
    if (w['type'] == "twitter"):
        if (not (("rqUser" and "default_content") in list(w['args'].keys()))):
            raise Exception(f"Can't create [{w['uuid']}], missing arguments")
        return TwitterTweetReaction(rqUser=w['args']['rqUser'], default_content=w['args']["default_content"], uuid=w['uuid'])
    raise NotImplementedError(f"[{w['uuid']}] Action type ({w['type']}) is not supported yet")