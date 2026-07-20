from database import engine
from database_schema import Base

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")