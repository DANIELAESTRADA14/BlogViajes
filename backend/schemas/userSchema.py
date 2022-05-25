from marshmallow import fields
from ext import ma

class BlogSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    username = fields.String()
    password = fields.String()
    