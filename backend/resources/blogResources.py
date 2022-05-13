from flask import request
from flask_restful import Resource, Api
from  models.blogModels import BlogModel
from  schemas.blogSchemas import BlogSchema


blog_schema = BlogSchema



class Blog(Resource):
    def get(self):
        registros = BlogModel.get_all()
        registros_list = []
        for registro in registros:
            registros_list.append(registro.json())
        return {'registros': registros_list}
    
    def post(self):
        data = request.get_json()
        registro = BlogModel(data["title"], data["description"],data["username"])
        registro.save()
        return registro.json()
    
class BlogItem(Resource):
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



