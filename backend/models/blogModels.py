from db import db

class BlogModel(db.Model):
    """Se crea tabla regitros y se hace la relación con la tabla comentarios"""
    __tablename__ = 'registros'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(80), nullable=False)
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String, nullable=False)
    username = db.Column(db.String(40), nullable=False)
    photo = db.Column(db.String(200))


    coments = db.relationship('ComentModel', lazy='dynamic')

    def __init__(self, city,title,description,username, photo):
        self.city = city
        self.title = title
        self.description = description
        self.username = username
        self.photo = photo
        

    def __repr__(self):
        return f'Register: {self.title}'

    def json(self):
        return {
            'id': self.id,
            'city': self.city,
            'title': self.title,
            'description': self.description,
            'username': self.username,
            'photo' : self.photo,
            'coments': [coment.json() for coment in self.coments.all()]
        }


#Base Models

    
    def save(self):
        """Creación de métodos"""
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



