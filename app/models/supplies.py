from .db import db

class Supply(db.Model):
    __tablename__ = 'supplies'

    id = db.Column(db.Integer, primary_key = True)
    clockId = db.Column(db.Integer, db.ForeignKey('clocks.id'), nullable = False)
    food = db.Column(db.String(100))
    water = db.Column(db.String(100))
    temp = db.Column(db.String(100))
    shelter = db.Column(db.String(100))
    tools = db.Column(db.String(1000))

    clock = db.relationship("Clock", back_populates="supplies")

    def to_dict(self):
      return {
        "id": self.id,
        "clockId": self.clockId,
        "food": self.food,
        "water": self.water,
        "temp": self.temp,
        "shelter": self.shelter,
        "tools": self.tools
      }