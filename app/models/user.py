from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

follows = db.Table(
    "follows", 
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  imageURL = db.Column(db.String(255))
  bio = db.Column(db.String(1000))

  followers = db.relationship(
        "User", 
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
    )

  


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)

  def follow(self, user):
    if not self.is_following(user):
      self.followers.append(user)

  def unfollow(self, user):
    if self.is_following(user):
      self.followers.remove(user)

  def is_following(self, user):
    return self.followers.filter(
      follows.c.followed_id == user.id).count() > 0   


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "imageURL": self.imageURL,
      "bio": self.bio,
      "followers": [follower.id for follower in self.followers]
    }
