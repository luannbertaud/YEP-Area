#!/usr/bin/env python3

def ensure_json(response):
    res = {'NOJSON': response, 'code': 400}
    try:
        res = {'data': response.json(), 'code': response.status_code}
    except Exception as e:
        print("Error: Response couldn't be parsed as json")
        print(e)
    return res