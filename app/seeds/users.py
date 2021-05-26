from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = [User(username='Demo', email='demo@aa.io', fullname='Herbert Fork',
                phoneNumber='555-555-5555', ecname='My Dad', ecPhone='333-333-3333',
                password='password', bio="Hey me name is Demo I'm a climber."),
            User(username='Himo', email='himo@aa.io', fullname='Mooch Much',
                phoneNumber='525-555-5225', ecname='My Mom', ecPhone='311-333-3133',
                password='password', bio="Hey me name is Himo I'm a swimmer."),
            User(username='Mamo', email='mamo@aa.io', fullname='Crumb Bumbler',
                phoneNumber='525-444-5225', ecname='Him', ecPhone='777-777-7777',
                password='password', bio="Hey me name is Mamo I like to fly."),
            User(username='Bemo', email='bemo@aa.io', fullname='Bartimort Cindercatch',
                phoneNumber='525-334-5225', ecname='My dog', ecPhone='222-222-2222',
                password='password', bio="Hey me name is Bemo I eat too much."),
            User(username='Albert0', email='albert@aa.io', fullname='Herbert Major',
                phoneNumber='555-694-5555', ecname='My Dad', ecPhone='653-333-3333',
                password='password', bio="What's up I'm into climbing and hiking mostly."),
            User(username='Coinstintine', email='conin@aa.io', fullname='Mooch Much',
                phoneNumber='525-500-5225', ecname='My Mom', ecPhone='311-888-3133',
                password='password', bio="You can usually find me at the watering hole."),
            User(username='Large', email='into@aa.io', fullname='Crumb Bumbler',
                phoneNumber='525-302-5225', ecname='Him', ecPhone='777-564-7777',
                password='password', bio="I'm actually quite small and I cave dive."),
            User(username='The Manistan', email='mani@aa.io', fullname='Bartimort Cindercatch',
                phoneNumber='525-334-6035', ecname='My dog', ecPhone='222-222-0392',
                password='password', bio="In the end it's all about the waves my man"),
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
