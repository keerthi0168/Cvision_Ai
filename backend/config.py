from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Keys
    gemini_api_key: str = ""
    
    # Database
    database_url: str = "mongodb://localhost:27017"
    
    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    # CORS
    allowed_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]
    
    class Config:
        env_file = ".env"

settings = Settings()
