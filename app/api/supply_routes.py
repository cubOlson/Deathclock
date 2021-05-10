from flask import Blueprint, request
from app.models import db, Supply
from app.forms import NewSupplyForm

supply_routes = Blueprint('supply', __name__)

@supply_routes.route('/<int:id>', methods=["POST"])
def create_clock(id):
    form = NewSupplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    req = request.get_json()
    print('REQUEST', req)
    print('ID', id)
    if form.validate_on_submit():
        supply = Supply.query.filter(Supply.clockId == id).first()
        if supply:
            db.session.delete(supply)
        newSupply = Supply()
        form.populate_obj(newSupply)
        db.session.add(newSupply)
        db.session.commit()
        return newSupply.to_dict()
    print('ERRORS', form.errors)
    return 'Bad Data'