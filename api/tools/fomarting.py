#!/usr/bin/env python3

import inspect

def ensure_json(response):
    res = {'NOJSON': response}
    try:
        res = response.json()
    except Exception as e:
        print("Error: Response couldn't be parsed as json")
        print(e)
    return res

def get_initializing_parameters(obj):
    res = {}
    for param in inspect.signature(obj.__init__).parameters.values():
        if param.default is param.empty:
            res[param.name] = getattr(obj, param.name)
    return res