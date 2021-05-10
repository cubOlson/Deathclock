from flask import Blueprint, request
from app.models import db, Clock, Supply
from app.forms import NewClockForm

clock_routes = Blueprint('clock', __name__)

@clock_routes.route('/<int:id>')
def getUserClock(id):
    clock = Clock.query.filter(Clock.userId == id).all()
    # if clock[0].supplies:
    #     print('Clock', clock[0].supplies)
    #     return clock[0].to_dict_supplies()
    if clock:
        print('CLOCK', clock[0])
        print('SUPPLIES', clock[0].supplies)
        return clock[0].to_dict()
    return {}

@clock_routes.route('/new', methods=["POST"])
def create_clock():
    form = NewClockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    req = request.get_json()
    print('REQUEST', req)
    if form.validate_on_submit():
        newClock = Clock()
        form.populate_obj(newClock)
        db.session.add(newClock)
        db.session.commit()
        return newClock.to_dict()
    print('ERRORS', form.errors)
    return 'Bad Data'

@clock_routes.route('/<int:id>', methods=["DELETE"])
def delete_clock(id):
    clock = Clock.query.get(id)
    supply = Supply.query.filter(Supply.clockId == clock.id).first()
    print('CLOCK', clock)
    print("Supply" )
    if supply:
        db.session.delete(supply)
    db.session.delete(clock)
    db.session.commit()
    return {}
