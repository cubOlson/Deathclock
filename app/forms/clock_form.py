from flask_wtf import FlaskForm
from wtforms import DateTimeField, StringField, IntegerField, TextAreaField, SubmitField, FloatField
from wtforms.validators import DataRequired

class NewClockForm(FlaskForm):
    userId = IntegerField('userId', [DataRequired()])
    title = StringField('title', [DataRequired()])
    description = TextAreaField('description', [DataRequired()])
    danger = IntegerField('danger', [DataRequired()])
    # endDate = DateTimeField('endDate', [DataRequired()], format='%Y-%m-%dT%H:%M')
    endDate = StringField('endDate', [DataRequired()])
    address = StringField('address')
    startLat = FloatField('startLat')
    startLong = FloatField('startLong')


