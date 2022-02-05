#!/usr/bin/env python3

import jwt
import hashlib
from peewee import DoesNotExist
from flask import Blueprint, request
from tools.env import JWT_SECRET, JWT_VALIDITY_DELTA
from models.db import Users
from tools.tokens import verify_jwt
from datetime import datetime, timedelta

areaAuthBP = Blueprint("areaAuthBP", __name__)


def __validate_data_register(data):
    try:
        assert(isinstance(data, dict))
        assert(isinstance(data["user_name"], str))
        assert(isinstance(data["user_password"], str))
        assert(isinstance(data["user_email"], str))
    except:
        return False
    return True

def __validate_data_login(data):
    try:
        assert(isinstance(data, dict))
        if ("user_name" in data.keys()):
            assert(isinstance(data["user_name"], str))
        assert(isinstance(data["user_password"], str))
        if ("user_email" in data.keys()):
            assert(isinstance(data["user_email"], str))
        if ("user_email" not in data.keys()) and ("user_name" not in data.keys()):
            return False
    except:
        return False
    return True


@areaAuthBP.route("/register", methods=["POST"])
def user_register():
    data = request.json
    u = None
    if (not __validate_data_register(data)):
        return {"code": 400, "message": "Malformed JSON payload."}, 400

    try:
        Users.get(Users.name == data['user_name'])
        return {"code": 401, "message": "Area user already exist."}, 401
    except DoesNotExist as e:
        u = Users.create(
            name=data['user_name'],
            password=hashlib.sha256(data['user_password'].encode()).hexdigest(),
            email=data['user_email']
        )
    if not u:
        return {"code": 500, "message": "Could not create Area user."}, 500
    payload = {
        'user_uuid': u.uuid,
        'exp': datetime.utcnow() + timedelta(seconds=int(JWT_VALIDITY_DELTA)),
    }
    return {
        "message": "Register succesfull.",
        "code": 200,
        "access_token": jwt.encode(payload, JWT_SECRET, "HS256"),
        "user_name": u.name,
        "user_uuid": u.uuid,
        "user_email": u.email,
    }

@areaAuthBP.route("/verify", methods=["POST", "GET"])
@verify_jwt
def verify():
    return {'code': 200, 'message': 'Token valid.'}

@areaAuthBP.route("/login", methods=["POST"])
def user_login():
    data = request.json
    u = None
    if (not __validate_data_login(data)):
        return {"code": 400, "message": "Malformed JSON payload. (user_name or user_email, + user_password)."}, 400

    if ("user_name" in data.keys()):
        try:
            u = Users.get(Users.name == data['user_name'])
        except DoesNotExist as e:
            return {"code": 400, "message": "Area user not found with provided credentials."}, 400
    else:
        try:
            u = Users.get(Users.email == data['user_email'])
        except DoesNotExist as e:
            return {"code": 400, "message": "Area user not found with provided credentials."}, 400
    if not u:
        return {"code": 500, "message": "Area user not found with provided credentials."}, 500
    if u.password != hashlib.sha256(data['user_password'].encode()).hexdigest():
        return {"code": 400, "message": "Area user and password mismatch."}, 400

    payload = {
        'user_uuid': u.uuid,
        'exp': datetime.utcnow() + timedelta(seconds=int(JWT_VALIDITY_DELTA)),
    }
    return {
        "message": "Login succesfull.",
        "code": 200,
        "access_token": jwt.encode(payload, JWT_SECRET, "HS256"),
        "user_name": u.name,
        "user_uuid": u.uuid,
        "user_email": u.email,
    }

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