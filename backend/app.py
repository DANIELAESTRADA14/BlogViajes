from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from resources.userResources import User, UserLogin, UserRegister
from resources.blogResources import Blog, BlogItem
from resources.comentResources import Coment, ComentItem
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os


"""Inicialización y configuración"""
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@localhost/db_registros'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

"""JTW"""
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET', 'simple key')  # Change this!
jwt = JWTManager(app)

api = Api(app)
CORS(app)



@app.before_first_request
def create_tables():
    db.create_all()

"""Definición endpoints"""
api.add_resource(UserRegister, '/token')
api.add_resource(User, '/user/<id>')
api.add_resource(UserLogin, '/login')
api.add_resource(Blog, '/registros')
api.add_resource(BlogItem, '/registro/<id>')
api.add_resource(Coment, '/comentarios/<blogId>', '/comentarios')
api.add_resource(ComentItem, '/comentario/<id>')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(debug=True)


