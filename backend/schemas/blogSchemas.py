from marshmallow import fields
from ext import ma

class BlogSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    city = fields.String()
    title = fields.String()
    description = fields.String()
    username = fields.String()