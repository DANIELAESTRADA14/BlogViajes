from logging import error
from db import db
from werkzeug.security import check_password_hash, generate_password_hash

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True )
    username = db.Column(db.String(80))
    password = db.Column(db.String(200))

    def __init__(self, username, password):
        self.username = username
        self.password = password

    @classmethod
    def check_password(self,hashed_password, password):
        return check_password_hash(hashed_password, password)


    def json(self):
        return {
            'id': self.id,
            'name': self.username, 
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()


    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
 