from .db import db

class UserJoin(db.Model):
    __tablename__ = 'userjoins'

    id = db.Column(db.Integer, primary_key = True)
    thisUser = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False) 
    followsUser = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    users = db.relationship("User")

    def to_dict(self):
    return {
      "id": self.id,
      "thisUser": self.thisUser,
      "followsUser": self.followsUser,
    }