from flask import Blueprint
from app.models import Clock

clock_routes = Blueprint('clock', __name__)

@clock_routes.route('/<int:id>')
def getUserClock(id):
    clock = Clock.query.filter(Clock.user_id == id)
    return clock.to_dict()
