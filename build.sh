#!/bin/bash
# Render deployment script for backend

# Install dependencies
pip install -r backend/requirements.txt

# Run the application
cd backend
python main.py
