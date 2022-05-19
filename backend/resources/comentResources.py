from flask import request
from flask_restful import Resource, Api
from  models.comentModels import ComentModel
from  schemas.comentSchema import ComentSchema


coment_schema = ComentSchema



class Coment(Resource):
    def get(self, blogId):
        comentarios = ComentModel.get_all(blogId)
        comentarios_list = []
        for comentario in comentarios:
            comentarios_list.append(comentario.json())
        return {'comentarios': comentarios_list}
    
    def post(self):
        data = request.get_json()
        comentario = ComentModel(data["name"],data["coment"], data["blog_id"])
        comentario.save()
        return comentario.json()
    
class ComentItem(Resource):
    def get(self, id):
        comentario = ComentModel.get_by_id(id)
        if comentario:
            return comentario.json()
        return {'message': 'Coment not found'}, 404

    def put(self,id):
        data= request.get_json()
        comentario = ComentModel.get_by_id(id)

        if comentario is None:
            comentario = ComentModel(id, **data)
        else:
            comentario.name = data['name']
            comentario.coment = data['coment']
            comentario.blog_id= data['blog_id']
            

        comentario.save()
        return comentario.json()
    
    def delete(self,id):
        comentario = ComentModel.get_by_id(id)
        if comentario:
            comentario.delete()
        return {"message": "Coment deleted"}



