from flask import Blueprint
from app.models import Clock

user_routes = Blueprint('clocks', __name__)

@clocks_routes.route('/<int:id>')
def getUserClock(id):
    clock = Clock.query.filter(Clock.user_id == id)
    return clock.to_dict()
