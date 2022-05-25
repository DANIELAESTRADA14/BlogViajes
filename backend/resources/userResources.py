import json
from flask import jsonify, request
from flask_restful import Resource, reqparse
from models.userModel import UserModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import create_access_token, jwt_required, create_refresh_token, get_jwt_identity

_user_parser = reqparse.RequestParser()
_user_parser.add_argument('username',
    type=str,
    required=True,
    help="This field cannot be left blank!")

_user_parser.add_argument('password',
    type=str,
    required=True,
    help="This field cannot be left blank!")


class UserRegister(Resource):
     def post(self):
        data = _user_parser.parse_args()

        if UserModel.find_by_username(data['username']):
            return{"message": "A user with that username already exists"}, 400

        #user = UserModel(data['username'], data['password'])
        user = UserModel(**data)
        user.save_to_db()

        return{"message": "User created succesfully"}, 201
        
class User(Resource):
    @jwt_required()
    def get(self, id):
        user = UserModel.find_by_id(id)
        if not user:
            return {"message": "user no found"}, 404
        return user.json()

class UserLogin(Resource):
     @classmethod
     def post(cls):
        data = _user_parser.parse_args()
        user = UserModel.find_by_username(data['username'])
        if user and safe_str_cmp(user.password, data['password']):
            acces_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                'access_token' : acces_token,
                'refresh_token': refresh_token
            },200
        return {'message': 'INvalid credentials'}, 401


class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity = current_user, fresh = False)
        return {'access_token': new_token}, 200
