from .db import db

class Clock(db.Model):
    __tablename__ = 'clocks'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    danger = db.Column(db.Integer, nullable = False)
    startDate = db.Column(db.DateTime, nullable = False)
    endDate = db.Column(db.DateTime, nullable = False)
    address = db.Column(db.String(255))
    startLat = db.Column(db.Float)
    startLong = db.Column(db.Float)
    endLat = db.Column(db.Float)
    endLong = db.Column(db.Float)

    user = db.relationship("User")

    def to_dict(self):
        return {
          "id": self.id,
          "userId": self.userId,
          "title": self.title,
          "description": self.description,
          "danger": self.danger,
          "startDate": self.startDate,
          "endDate": self.endDate,
          "startTime": self.startTime,
          "endTime": self.endTime,
          "address": self.address,
          "startLat": self.startLat,
          "startLong": self.startLong,
          "endLat": self.endLat,
          "endLong": self.endLong,
        }