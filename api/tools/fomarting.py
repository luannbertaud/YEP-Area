#!/usr/bin/env python3

from models.db import Actions, Reactions

def ensure_json(response):
    res = {'NOJSON': response, 'code': 400}
    try:
        res = {'data': response.json(), 'code': response.status_code}
    except Exception as e:
        print(f"Error: Response couldn't be parsed as json: {e}")
    return res

def action_to_json(action: Actions):
    res = {
        "uuid": action.uuid,
        "title": action.title,
        "description": action.description,
        "type": action.type,
        "user_uuid": action.user_uuid,
        "enabled": action.enabled,
        "content": action.content,
        "children": action.children,
    }
    return res

def reaction_to_json(reaction: Reactions):
    res = {
        "uuid": reaction.uuid,
        "title": reaction.title,
        "description": reaction.description,
        "type":reaction.type,
        "user_uuid": reaction.user_uuid,
        "enabled": reaction.enabled,
        "content": reaction.content,
    }
    return res

def close_window():
    return """
        <!DOCTYPE html>
        <script type="text/javascript">
            window.close();
        </script>
        you can 
        <a href="#" onclick="window.close();return false;">close</a>
        this window
    """