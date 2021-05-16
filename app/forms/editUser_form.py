from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError


class EditUserForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    fullname = StringField('fullname')
    phoneNumber = StringField('phoneNumber', validators=[DataRequired()])
    ecname = StringField('ecname')
    ecPhone = StringField('ecPhone', validators=[DataRequired()])
    bio = StringField('bio')
    email = StringField('email', validators=[DataRequired()])
