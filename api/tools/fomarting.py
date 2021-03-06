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
        "family": "action",
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
        "family": "reaction",
        "title": reaction.title,
        "description": reaction.description,
        "type":reaction.type,
        "user_uuid": reaction.user_uuid,
        "enabled": reaction.enabled,
        "content": reaction.content,
    }
    return res

def json_return_diff(og, new):
    res = {}
    if ((type(og) != dict) or (type(new) != dict)):
        return {}
    for k in new.keys():
        if (k not in og.keys()):
            res[k] = new[k]
            continue
        if (og[k] == new[k]):
            continue
        elif (type(new[k]) == list):
            res[k] = [x for x in new[k] if x not in og[k]]
        elif (type(new[k]) == dict):
            res[k] = json_return_diff(og[k], new[k])
        else:
            res[k] = new[k]
    return res

def close_window():
    return """
        <!DOCTYPE html>
        <head>
        <style>
            @import url('https://css.gg/check-o.css');
            body {
                background-color: rgb(36, 143, 36)
            }
            .main {
                position: relative;
                justify-content: center;
                align-items: center;
                text-align: center;
                vertical-align: middle;
                margin: 30px auto;
                padding: 20px;
                width: 310px;
                background: white;
                border-radius: 8px;
                -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
                box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
            }
        </style>
        <script type="text/javascript">
            setTimeout (window.close, 2000);
        </script>
        </head>
        <body>
            <div class="main">
                <div style="display: block; margin-bottom: 20px">
                    <div style="float: left; margin-right: 8px">
                        <i class="gg-check-o"></i>
                    </div>
                    <div style="float: left">
                        you can 
                        <button onclick="javascript:window.close();">close</button>
                        this window
                    </div>
                </div>
            </div>
        </body>
    """

def autologin_window(redirect, areauser):
    page = """
        <html>

        <head>
            <script>
                function sendAutologin() {
                    var autolog_link = document.getElementById("autholog_input").value;

                    if (window.confirm("Validate autologin link :" + autolog_link)) {
                        window.location.href = '""" + redirect + """' + 
                        '?autologin=' + encodeURIComponent(autolog_link) +
                        '&areauser=' + """ + areauser + """;
                    }
                }
            </script>
        </head>

        <body>
            <div style="text-align:left; margin:8px 5px auto; overflow: resize;">
                <label for="autholog_input">Please enter your auto-login link </label>
                <input type="Text" id="autholog_input" size="25" />
                <input type='button' onclick='sendAutologin()' value='SUBMIT'>
                <br>
                Find autologin link  <a href="https://intra.epitech.eu/admin/autolog" target="_blank">here</a>
            </div>

        </body>

        </html>
    """
    return page