import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    OPENAI_API_KEY: str
    PINECONE_API_KEY: str
    PINECONE_INDEX_NAME: str = "code-quests-index"
    
    class Config:
        env_file = ".env"

settings = Settings()