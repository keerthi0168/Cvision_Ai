"""WSGI entry point for Vercel deployment of FastAPI application."""
import sys
from pathlib import Path

# Add current directory to Python path
sys.path.insert(0, str(Path(__file__).parent))

# Import the FastAPI app
from main import app

# For Vercel serverless functions
application = app
