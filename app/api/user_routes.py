from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/follow/<int:id>')
@login_required
def follow(id):
    user = User.query.filter(User.id == id).first()
    if current_user.is_following(user):
        print('Already following {}!'.format(user.username))
        return user.to_dict()
    current_user.follow(user)
    db.session.commit()
    print('You are following {}!'.format(user.username))
    return user.to_dict()

@user_routes.route('/unfollow/<int:id>')
@login_required
def unfollow(id):
    user = User.query.filter(User.id == id).first()
    if not current_user.is_following(user):
        print('You were not following {}!'.format(user.username))
    current_user.unfollow(user)
    db.session.commit()
    print('You are not following {}.'.format(user.username))
    return user.to_dict()   
