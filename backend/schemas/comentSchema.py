from marshmallow import fields
from ext import ma

class ComentSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name= fields.String()
    coment = fields.String()
    blog_id = fields.String()
     