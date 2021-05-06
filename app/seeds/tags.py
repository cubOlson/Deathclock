from app.models import db, Tag

def seed_tags():

    demo = [
        Tag(name= "Hiking", description="Travelling long distances over difficult terrain.", imageURL="getimage.jpg"),
        Tag(name= "Camping", description="Sleeping in a temporary shelter.", imageURL="getimage.jpg"),
        Tag(name= "Swimming", description="The act of not drowning.", imageURL="getimage.jpg"),
        Tag(name= "Running", description="Travelling at high speed on your two legs.", imageURL="getimage.jpg"),
        Tag(name= "Climbing", description="Scrambling to the top of things. Might involve falling.", imageURL="getimage.jpg"),
        Tag(name= "Hunting", description="Killing something and eating it.", imageURL="getimage.jpg"),
        Tag(name= "Fighting", description="Striking, wrestling, sparring, or worse.", imageURL="getimage.jpg"),
        Tag(name= "Protesting", description="Ranges from sign-waving to setting things on fire.", imageURL="getimage.jpg"),
        Tag(name= "Police Involvement", description="For better or worse, the police are involved.", imageURL="getimage.jpg"),
        Tag(name= "Boating", description="Big or small, if it floats it's a boat.", imageURL="getimage.jpg"),
        Tag(name= "Drinking/Intoxication", description="When you aren't quite yourself due to foreign substances.", imageURL="getimage.jpg"),
        Tag(name= "Long-Distance Driving", description="Long enough to get lost or sleepy, anyway.", imageURL="getimage.jpg"),
        Tag(name= "Racing", description="When you're moving very fast.", imageURL="getimage.jpg"),
        Tag(name= "Travelling", description="Airports, buses, cars, and maybe not speaking the language.", imageURL="getimage.jpg"),
        ]
    db.session.add_all(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_tags():
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.commit()
