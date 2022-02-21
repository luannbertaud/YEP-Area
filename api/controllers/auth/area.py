#!/usr/bin/env python3

import jwt
import hashlib
from peewee import DoesNotExist
from flask import Blueprint, request
from tools.env import JWT_SECRET, JWT_VALIDITY_DELTA, GOOGLE_CLIENT_ID
from models.db import Users
from tools.tokens import verify_jwt
from datetime import datetime, timedelta
from time import sleep
from google.auth.transport import requests
from google.oauth2 import id_token

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

@areaAuthBP.route("login/google", methods=["POST"])
def user_login_google():
    data = request.json
    u = None
    if (not __validate_data_login(data)):
        return {"code": 400, "message": "Malformed JSON payload. (user_name or user_email, + user_password)."}, 400
    sleep(0.5)
    try:
        user = id_token.verify_oauth2_token(data['idToken'], requests.Request(), GOOGLE_CLIENT_ID)
    except:
        return {"code": 400, "message": "Can't validate google idToken."}, 400
    
    try:
        u = Users.get(Users.name == user["given_name"])
    except DoesNotExist as e:
        try:
            u = Users.get(Users.email == user['email'])
        except DoesNotExist as e:
            pass

    if not u:
        u = Users.create(
            name=user['given_name'],
            googleToken=user["sub"],
            email=user['email']
        )
    else:
        if u.googleToken != user["sub"]:
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