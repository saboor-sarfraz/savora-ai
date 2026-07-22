from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
DB_URL = os.getenv("DB_URL")

engine = create_engine(
    DB_URL,
    pool_size=5,        # keep 5 connections warm
    max_overflow=10,    # allow up to 10 extra under burst load
    pool_pre_ping=True, # auto-heal stale connections
)
SessionLocal = sessionmaker(bind=engine)