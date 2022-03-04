#!/usr/bin/env python3

import signal
import requests
from threading import Thread, Event
from tools.fomarting import json_return_diff

class Watcher(Thread):

    def __init__(self, webhook_endpoint, *args, delay=10, additional_header=None, **kwargs):
        self._stop = Event()
        self.target = kwargs["target"]
        self.delay = delay
        self.webhook_endpoint = webhook_endpoint
        self.additional_header = additional_header
        kwargs['target'] = self.runner

        # def signal_handler(sig, frame):
        #     print(f'Exiting thread [{self.name}]...')
        #     self.stop()
        #     exit(0)

        # signal.signal(signal.SIGINT, signal_handler)
        super().__init__(*args, **kwargs)

    def stop(self):
        self._stop.set()

    def runner(self, *args, **kwargs):
        base = None
        while (not self._stop.is_set()):
            res = self.target(*args)
            if (not base):
                base = res
            elif (res != base):
                headers = {"Watcher": self.name}
                headers.update(self.additional_header)
                requests.post(self.webhook_endpoint, headers=headers, json=json_return_diff(base, res))
                base = res
            self._stop.wait(self.delay)