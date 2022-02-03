#!/usr/bin/env python3

def ensure_json(response):
    res = {'NOJSON': response}
    try:
        res = response.json()
    except Exception as e:
        print("Error: Response couldn't be parsed as json")
        print(e)
    return res