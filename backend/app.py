from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from resources.blogResources import Blog, BlogItem



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:admin123@localhost/db_registros'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)
CORS(app)



@app.before_first_request
def create_tables():
    db.create_all()


api.add_resource(Blog, '/registros')
api.add_resource(BlogItem, '/registro/<id>')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(debug=True)


