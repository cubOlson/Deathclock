from .db import db

class Clock(db.Model):
    __tablename__ = 'clocks'

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    danger = db.Column(db.Integer, nullable = False)
    endDate = db.Column(db.String, nullable = False)
    address = db.Column(db.String(255))
    startLat = db.Column(db.Float)
    startLong = db.Column(db.Float)
    endLat = db.Column(db.Float)
    endLong = db.Column(db.Float)

    user = db.relationship("User")

    supplies = db.relationship("Supply", back_populates="clock", lazy="joined")

    def to_dict(self):
        return {
          "id": self.id,
          "userId": self.userId,
          "title": self.title,
          "description": self.description,
          "danger": self.danger,
          "endDate": self.endDate,
          "address": self.address,
          "startLat": self.startLat,
          "startLong": self.startLong,
          "endLat": self.endLat,
          "endLong": self.endLong,
          "supplies": [supply.to_dict() for supply in self.supplies]
        }

    def to_dict_supplies(self):
      return {
        "id": self.id,
        "userId": self.userId,
        "title": self.title,
        "description": self.description,
        "danger": self.danger,
        "endDate": self.endDate,
        "address": self.address,
        "startLat": self.startLat,
        "startLong": self.startLong,
        "endLat": self.endLat,
        "endLong": self.endLong,
        "supplies": {
            "food": self.supplies[0].food,
            "water": self.supplies[0].water,
            "temp": self.supplies[0].temp,
            "shelter": self.supplies[0].shelter,
            "tools": self.supplies[0].tools
        }
      }