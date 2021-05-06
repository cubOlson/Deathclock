from .db import db

class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = False)
    imageURL = db.column(db.String, nullable = False)

    lessons = db.relationship(
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