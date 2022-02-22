#!/usr/bin/env python3

import requests
import base64
from peewee import DoesNotExist
from tools.fomarting import ensure_json
from tools.tokens import get_tokens, tokens_reload
from tools.env import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from models.area import Reaction
from models.db import Users
from tools.db import needs_db

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import json
from email.mime.text import MIMEText

def __credentials_to_dict(credentials):
  return {
    'token': credentials.token,
    'access_token': credentials.token,
    'refresh_token': credentials.refresh_token,
    'token_uri': credentials.token_uri,
    'client_id': credentials.client_id,
    'client_secret': credentials.client_secret,
    'scopes': credentials.scopes
}

class GmailAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.load_tokens()
        self.client = {"id": GOOGLE_CLIENT_ID, "secret": GOOGLE_CLIENT_SECRET}

    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "google")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init GmailAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = tokens["refresh_token"]
        del tokens["access_token"]
        self.credentials = Credentials(**tokens)
        self.service = build('gmail', 'v1', credentials=self.credentials)
        updated = json.loads(self.credentials.to_json())
        print(updated)
        if (updated == tokens):
            return
        updated["access_token"] = updated["token"]
        try:
            dbUser = Users.get(Users.uuid == self.rqUser)
        except DoesNotExist as e:
            return {"NOJSON": 400, "message": "No corresponding area user."}
        dbUser.oauth["google"] = updated
        dbUser.save()
        self.load_tokens()

    def create_message(self, sender, to, subject, message_text):
        """Cr   eate a message for an email.

        Args:
            sender: Email address of the sender.
            to: Email address of the receiver.
            subject: The subject of the email message.
            message_text: The text of the email message.

        Returns:
            An object containing a base64url encoded email object.
        """
        message = MIMEText(message_text)
        message['to'] = to
        message['from'] = sender
        message['subject'] = subject
        return {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}


    def send_email(self, sender, to, subject, message_text):
        message = self.create_message(sender, to, subject, message_text)
        print(message)
        try:
            message = (self.service.users().messages().send(userId="me", body=message).execute())
            print('Message Id: %s' % message['id'])
            return message
        except Exception as error:
            print('An error occurred: %s' % error)

    def get_labels(self):
        try:
            # Call the Gmail API
            
            results = self.service.users().labels().list(userId='me').execute()
            labels = results.get('labels', [])

            if not labels:
                print('No labels found.')
                return
            print('Labels:')
            for label in labels:
                print(label['name'])

        except Exception as error:
            # TODO(developer) - Handle errors from gmail API.
            print(f'An error occurred: {error}')
        return labels


# class TwitterTweetReaction(Reaction):

#     def __init__(self, rqUser, uuid=None) -> None:
#         self.rqUser = rqUser
#         self.api =  TwitterAPIWrapper(rqUser)
#         super().__init__("twitter", rqUser, uuid=uuid)

#     def do(self, params):
#         if len(params) < 1:
#             return self.api.post_tweet("Default content")
#         return self.api.post_tweet(params[0])