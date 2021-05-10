from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired

class NewSupplyForm(FlaskForm):
    clockId = IntegerField('clockId', [DataRequired()])
    food = StringField('food')
    water = StringField('water')
    temp = StringField('temp')
    shelter = StringField('shelter')
    tools = StringField('tools')