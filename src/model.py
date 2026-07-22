import os
from pathlib import Path

from dotenv import load_dotenv
from langchain_groq import ChatGroq

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=True)

groq_api_key = os.getenv("GROQ_API_KEY", "").strip()

if not groq_api_key:
    raise RuntimeError(
        "GROQ_API_KEY is missing. Add a valid Groq API key to the project .env file."
    )

model = ChatGroq(
    model="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key,
)
