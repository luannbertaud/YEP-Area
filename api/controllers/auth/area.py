#!/usr/bin/env python3

import jwt
import hashlib
from peewee import DoesNotExist
from flask import Blueprint, request
from tools.env import JWT_SECRET
from models.db import Users

areaAuthBP = Blueprint("areaAuthBP", __name__)


def __validate_data(data):
    try:
        assert(isinstance(data, dict))
        assert(isinstance(data["user_name"], str))
        assert(isinstance(data["user_password"], str))
        assert(isinstance(data["user_email"], str))
    except:
        return False
    return True


@areaAuthBP.route("/register", methods=["POST"])
def user_register():
    data = request.json
    if (not __validate_data(data)):
        return {"code": 400, "message": "Malformed JSON payload."}

    try:
        Users.get(Users.name == data['user_name'])
        return {"code": 401, "message": "Area user already exist."}
    except DoesNotExist as e:
        pass

    u = Users.create(
        name=data['user_name'],
        password=hashlib.sha256(data['user_password'].encode()).hexdigest(),
        email=data['user_email']
    )
    payload = {
        'user_uuid': u.uuid,
        'exp': 0,
    }
    u.access_token = jwt.encode(payload, JWT_SECRET, "HS256")
    u.save()
    return {
        "message": "Register succesfull.",
        "code": 200,
        "access_token": u.access_token,
        "user_name": u.name,
        "user_uuid": u.uuid,
        "user_email": u.email,
    }

# @authBP.route("login", methods=["POST"])
# def user_login():
#     email = request.args.get("email")
#     password = request.args.get("password")
#     if check_is_google_user(email):
#         return {
#             "status": 401,
#         }
#     user = check_login(email, password)
#     if email is None or password is None or not user:
#         return {
#             "msg": "Invalid password or username",
#             "status": 401
#         }
#     access_token = create_access_token(identity=email)
#     return {
#         "msg": "Login succesfull",
#         "status": 200,
#         "access_token": access_token,
#         "username": user.name,
#         "user_email": user.email
#     }

# @authBP.route("logout", methods=["POST"])
# @jwt_required()
# def user_logout():
#     playload = get_jwt()
#     if (not verifyEmail(playload['sub'])):
#         return {
#             "status": 200,
#         }
#     return {
#         "status": 401,
#     }

# @authBP.route("google/login", methods=["POST"])
# def user_login_google():
#     token_id = request.args.get("token")
#     sleep(0.5)
#     user = id_token.verify_oauth2_token(token_id, requests.Request(), GOOGLE_CLIENT_ID)
#     if not check_if_google_user_exist(user["sub"]):
#         if not create_google_user(user["given_name"], user["email"], user["sub"]):
#             return {
#                 "status": 401,
#             }
#     access_token = create_access_token(identity=user["email"])
#     return {
#         "msg": "Login succesfull",
#         "status": 200,
#         "access_token": access_token,
#         "username": user["given_name"],
#         "user_email": user["email"]
#     }