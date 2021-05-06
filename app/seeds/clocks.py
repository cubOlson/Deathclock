from app.models import db, Clock

# Adds a demo user, you can add other users here if you want
def seed_clocks():

    demo = [Clock(userId= 1, 
                  title= 'Backpacking',
                  description= "I'm going backpacking in the Himalayas.",
                  danger= 4,
                  endDate= "2021-05-08T12:00"),
            Clock(userId= 2, 
                  title= 'Backpacking',
                  description= "I'm going backpacking in the Himalayas.",
                  danger= 4,
                  endDate= "2021-05-08T12:00"),
]
    db.session.add_all(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_clocks():
    db.session.execute('TRUNCATE clocks CASCADE;')
    db.session.commit()
