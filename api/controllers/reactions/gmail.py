#!/usr/bin/env python3

import json
import base64
from peewee import DoesNotExist
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from email.mime.text import MIMEText
from copy import deepcopy
from tools.tokens import get_tokens
from tools.env import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
from models.area import Reaction
from models.db import Users
from tools.db import needs_db



class GmailAPIWrapper():

    def __init__(self, rqUser) -> None:
        self.rqUser = rqUser
        self.lastHistoryId = None
        self.load_tokens()
        self.client = {"id": GOOGLE_CLIENT_ID, "secret": GOOGLE_CLIENT_SECRET}

    @needs_db
    def load_tokens(self):
        tokens = get_tokens(self.rqUser, "google")
        if "NOJSON" in list(tokens.keys()):
            raise Exception(f"Can't retrieve tokens for [{self.rqUser}] Area user, failed to init GmailAPI wrapper.")
        self.access_token = tokens["access_token"]
        self.refresh_token = tokens["refresh_token"]

        tcreds = deepcopy(tokens)
        del tcreds["access_token"]
        del tcreds["login"]
        self.credentials = Credentials(**tcreds)
        self.service = build('gmail', 'v1', credentials=self.credentials)
        updated = json.loads(self.credentials.to_json())
        if (updated == tcreds):
            return
        updated["access_token"] = updated["token"]
        updated["login"] = tokens["login"]

        try:
            dbUser = Users.get(Users.uuid == self.rqUser)
        except DoesNotExist as e:
            return {"NOJSON": 400, "message": "No corresponding area user."}
        dbUser.oauth["google"] = updated
        dbUser.save()
        self.load_tokens()

    def send_email(self, to, subject, message_text):
        message = MIMEText(message_text)
        message['to'] = to
        message['subject'] = subject
        rmessage = {'raw': base64.urlsafe_b64encode(message.as_bytes()).decode()}
        try:
            message = (self.service.users().messages().send(userId="me", body=rmessage).execute())
            return {'data': message, 'code': 200}
        except Exception as e:
            return {"NOJSON": 400, "message": f"Can't send email: {e}"}

    def get_labels(self):
        try:
            results = self.service.users().labels().list(userId='me').execute()
            labels = results.get('labels', [])
            if not labels:
                print('No labels found.')
                return
            print('Labels:')
            for label in labels:
                print(label['name'])
        except Exception as error:
            print(f'An error occurred: {error}')
        return labels

    def register_watcher(self):
        request = {
            'labelIds': ['INBOX'],
            'topicName': 'projects/mapvoyage/topics/area'
        }
        res = self.service.users().watch(userId='me', body=request).execute()
        return res
    
    def get_userinfo(self):
        user_info = self.service.users().getProfile(userId='me').execute()
        return user_info

    def get_last_email_content(self, historyId):
        if (not self.lastHistoryId):
            self.lastHistoryId = int(historyId) - 500
        history = self.service.users().history().list(userId="me", labelId="INBOX", startHistoryId=self.lastHistoryId).execute()
        if ("history" not in history.keys()):
            return {"NOJSON": 400, "message": f"No new email found since this history id. {history}"}
        message_id = None
        for h in history["history"][::-1]:
            if ("messagesAdded" in h):
                message_id = h["messagesAdded"][0]["message"]["id"]
                break
        if (not message_id):
            return {"NOJSON": 400, "message": f"No new email found since this history id. {history}"}
        message = self.service.users().messages().get(userId="me", id=str(message_id)).execute()
        res = base64.urlsafe_b64decode(message["payload"]["parts"][0]["body"]["data"])
        self.lastHistoryId = historyId
        return res.decode("utf-8") 


class GmailSendEmailReaction(Reaction):

    def __init__(self, rqUser, receiver, subject, uuid=None) -> None:
        self.rqUser = rqUser
        self.receiver = receiver
        self.subject = subject
        self.api =  GmailAPIWrapper(rqUser)
        super().__init__("gmail", rqUser, uuid=uuid)

    def do(self, params):
        if len(params) < 1:
            return self.api.send_email(self.receiver, self.subject, "Default content")
        return self.api.send_email(self.receiver, self.subject, params[0])