import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_cors import CORS
from blacklist import BLOCKLIST
from resources.userResources import User, UserLogin, UserRegister, TokenRefresh, UserLogout
from resources.blogResources import Blog, BlogItem
from resources.comentResources import Coment, ComentItem
from flask_jwt_extended import get_jwt_identity, jwt_required, JWTManager
import os


"""Inicialización y configuración"""
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@localhost/db_registros'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True

"""JTW"""
app.config["JWT_SECRET_KEY"] = "nfjghrjkghrjkfdhfjefjewrewtr"
jwt = JWTManager(app)

api = Api(app)
CORS(app)

"""@jwt.user_claims_loader
def add_claims_to_jwt(identity):
    if identity == 1: #Sí es el primer usuario, es True
        return{'is_admin': True}
    return {'is_admin': False}"""

@jwt.expired_token_loader
def expired_token_callback():
    return jsonify({
        'description': 'The token has expired',
        'error': 'token_expired'
    })

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({
        'description': 'Signature verification failed',
        'error': 'invalid_token'
    })

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(self,decrypted_token):
    return decrypted_token['jti'] in BLOCKLIST



@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({
        "description": "Request does not contain an access token.",
        'error': 'authorization_required'
    }), 401


@jwt.needs_fresh_token_loader
def token_not_fresh_callback():
    return jsonify({
        "description": "The token is not fresh.",
        'error': 'fresh_token_required'
    }), 401


@jwt.revoked_token_loader
def revoked_token_callback():
    return jsonify({
        "description": "The token has been revoked.",
        'error': 'token_revoked'
    }), 401


@app.before_first_request
def create_tables():
    db.create_all()

"""Definición endpoints"""
api.add_resource(UserRegister, '/register')
api.add_resource(User, '/user/<int:user_id>')
api.add_resource(UserLogin, '/login')
api.add_resource(TokenRefresh, '/refresh')
api.add_resource(UserLogout, '/logout')
api.add_resource(Blog, '/registros')
api.add_resource(BlogItem, '/registro/<id>')
api.add_resource(Coment, '/comentarios/<blogId>', '/comentarios')
api.add_resource(ComentItem, '/comentario/<id>')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(debug=True)


