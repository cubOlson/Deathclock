from flask import Blueprint, request
from app.models import db, Clock
from app.forms import NewClockForm
import datetime as dt

clock_routes = Blueprint('clock', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@clock_routes.route('/<int:id>')
def getUserClock(id):
    clock = Clock.query.filter(Clock.userId == id).all()
    return clock[0].to_dict()

@clock_routes.route('/new', methods=["POST"])
def create_clock():
    form = NewClockForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('REC', request.get_json())
    req = request.get_json()

    # date_time_str = '2018-06-29 17:08:00'
    # date_time_obj = dt.datetime.strptime(date_time_str, '%Y-%m-%d %H:%M:%S')

    print('RIGHT HERE', req["danger"])
    if form.validate_on_submit():
        print('IN IF', form)
        newClock = Clock()
        form.populate_obj(newClock)
        db.session.add(newClock)
        db.session.commit()
        return newClock.to_dict()
    print('errors', form.errors)
    return 'BadData'