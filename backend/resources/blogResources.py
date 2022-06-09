from webbrowser import get
from flask import request
from flask_restful import Resource, Api
from flask_jwt_extended import jwt_required, get_jwt_identity
from  models.userModel import UserModel
from  models.blogModels import BlogModel
from  schemas.blogSchemas import BlogSchema


blog_schema = BlogSchema



class Blog(Resource):
    """Se definen métodos del CRUD (GET, POST)"""
    @jwt_required()
    def get(self):
        registros = BlogModel.get_all()
        registros_list = []
        for registro in registros:
            registros_list.append(registro.json())
        return {'registros': registros_list}
 

    def post(self):
        data = request.get_json()
        registro = BlogModel(data["city"],data["title"], data["description"],data["username"],data["photo"])
        registro.save()
        return registro.json()
    
class BlogItem(Resource):
    """Se definen métodos del CRUD OBTENIDOS POR ID(GET_BY_ID, PUT, DELETE)"""
    def get(self, id):
        registro = BlogModel.get_by_id(id)
        if registro:
            return registro.json()
        return {'message': 'Item not found'}, 404

    def put(self,id):
        data= request.get_json()
        registro = BlogModel.get_by_id(id)

        if registro is None:
            registro = BlogModel(id, **data)
        else:
            registro.city = data['city']
            registro.title = data['title']
            registro.description = data['description']
            registro.username = data['username']
         
        registro.save()
        return registro.json()
    
    def delete(self,id):
        registro = BlogModel.get_by_id(id)
        if registro:
            registro.delete()
        return {"message": "Post deleted"}



