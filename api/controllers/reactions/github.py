#!/usr/bin/env python3

from models.area import Reaction

class GithubCreateIssueReaction(Reaction):

    def __init__(self, rqUser, owner, repository, uuid=None) -> None:
        from controllers.actions.github import GithubAPIWrapper

        self.rqUser = rqUser
        self.owner = owner
        self.repo = repository
        self.api =  GithubAPIWrapper(rqUser)
        super().__init__("github", rqUser, uuid=uuid)

    def do(self, params):
        if len(params) < 1:
            return self.api.create_issue(self.owner, self.repo, "Autogenerated Area Issue", "Default content")
        return self.api.create_issue(self.owner, self.repo, "Autogenerated Area Issue", params[0])