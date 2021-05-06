from .db import db

clock_tags = db.Table(
    "clock_tags",
    db.Column(
        "clock_id", 
        db.Integer, 
        db.ForeignKey("clocks.id"), 
        primary_key=True
    ),
    db.Column(
        "tag_id", 
        db.Integer, 
        db.ForeignKey("tags.id"), 
        primary_key=True
    )
)

class Clock(db.Model):
    __tablename__ = 'clocks'

    id = db.Column(db.Integer, primary_key = True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    title = db.Column(db.String(100), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    danger = db.Column(db.Integer, nullable = False)
    endDate = db.Column(db.DateTime, nullable = False)
    address = db.Column(db.String(255))
    startLat = db.Column(db.Float)
    startLong = db.Column(db.Float)
    endLat = db.Column(db.Float)
    endLong = db.Column(db.Float)

    user = db.relationship("User")
    
    tags = db.relationship(
        "Tag", 
        secondary=clock_tags, 
        back_populates="clocks"
    )

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
        }

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    imageURL = db.Column(db.String, nullable = False)

    clocks = db.relationship(
        "Clock", 
        secondary=clock_tags, 
        back_populates="tags"
    )

    def to_dict(self):
        return {
          "id": self.id,
          "name": self.name,
          "description": self.description,
          "imageURL": self.imageURL,
        }