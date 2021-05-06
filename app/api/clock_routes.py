from flask import Blueprint
from app.models import Clock

clock_routes = Blueprint('clock', __name__)

@clock_routes.route('/<int:id>')
def getUserClock(id):
    clock = Clock.query.filter(Clock.user_id == id).all()
    return clock[0].to_dict()
