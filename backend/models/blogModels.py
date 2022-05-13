from db import db

class BlogModel(db.Model):
    __tablename__ = 'registros'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False)

    def __init__(self, title,description,username):
        self.title = title
        self.description = description
        self.username = username

    def __repr__(self):
        return f'Register: {self.title}'

    def json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'username': self.username
        }

#Base Models
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get(id)
    
    @classmethod
    def simple_filter(cls, **kwargs):
        return cls.query.filter_by(**kwargs).all()