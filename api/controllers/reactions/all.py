#!/usr/bin/env python3

from controllers.reactions.twitter import TwitterTweetReaction
from controllers.reactions.discord import DiscordMessageReaction
from controllers.reactions.gmail import GmailSendEmailReaction
from controllers.reactions.spotify import SpotifyNextReaction, SpotifyPlayReaction
from controllers.reactions.github import GithubCreateIssueReaction
from controllers.reactions.custom import CustomPostReaction