#!/usr/bin/env python3

import signal
from threading import Thread, Event

class Watcher(Thread):

    def __init__(self,  *args, delay=10, **kwargs):
        self._stop = Event()
        self.target = kwargs["target"]
        self.delay = delay
        kwargs['target'] = self.runner

        def signal_handler(sig, frame):
            print(f'Exiting thread [{self.name}]...')
            self.stop()
            exit(0)

        signal.signal(signal.SIGINT, signal_handler)
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
                print(res)
                base = res
            self._stop.wait(self.delay)