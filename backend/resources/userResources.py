import json
from flask import jsonify, request
from flask_restful import Resource, reqparse
from blacklist import BLOCKLIST
from models.userModel import UserModel
from werkzeug.security import safe_str_cmp, check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, create_refresh_token, get_jwt_identity, get_jwt


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
        
        hashed = generate_password_hash(data['password'], method="sha256")
        
        #user = UserModel(data['username'], data['password'])
        user = UserModel(data['username'], password=hashed)   

        user.save_to_db()

        return{"message": "User created succesfully"}, 201
        
class User(Resource):
   
    def get(self, user_id: int):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {"message": "user no found"}, 404
        return user.json()
    
    @classmethod
    def delete(cls, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            return{'message': 'User not found'}, 404
        user.delete_from_id()
        return {'message': 'User deleted'}, 201

class UserLogin(Resource):
     @classmethod
     def post(cls):
        data = _user_parser.parse_args()
        hashed = generate_password_hash(data['password'], method="sha256")
        user = UserModel.find_by_username(data['username'])
        if user and check_password_hash(user.password, data['password']):
            acces_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(user.id)
            return {
                'access_token' : acces_token,
                'refresh_token': refresh_token
            },200
        return {'message': 'Invalid credentials'}, 401


class UserLogout(Resource):
    @jwt_required()
    def post(self):
        jti = get_jwt()['jti'] # jti is JWT ID
        BLOCKLIST.add(jti)
        return {'message': 'Successfully logged out'}


class TokenRefresh(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity()
        new_token = create_access_token(identity = current_user, fresh = False)
        return {'access_token': new_token}, 200
