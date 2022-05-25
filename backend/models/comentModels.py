from db import db

class ComentModel(db.Model):
    """Se crea tabla comentarios y se hace la relación con la tabla registros
    Tabla comentarios tiene llave foránea del id de registros"""
    __tablename__ = 'comentarios'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    coment = db.Column(db.String(1000), nullable=False)
    
    blog_id = db.Column(db.Integer, db.ForeignKey('registros.id'))
    blog = db.relationship('BlogModel')

    def __init__(self, name,coment,blog_id):
        self.name = name
        self.coment = coment
        self.blog_id = blog_id
       

    def __repr__(self):
        return f'Register: {self.name}'

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'coment': self.coment,
            'blog_id': self.blog_id,
        }

#Base Models
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    

    @classmethod
    def get_all(cls, blogId):
        return cls.query.filter_by(blog_id=blogId)

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)
    
    @classmethod
    def simple_filter(cls, **kwargs):
        return cls.query.filter_by(**kwargs).all()