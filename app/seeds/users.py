from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = [User(username='Demo', email='demo@aa.io',
                password='password', bio="Hey me name is Demo I'm a climber."),
            User(username='Mamo', email='mamo@aa.io',
                password='password', bio="Hey I'm Mamo I eat things."),
            User(username='Himo', email='himo@aa.io',
                password='password', bio="My name is Himo it's from somewhere else.")
            ]

    db.session.add_all(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
