from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routes import resume, interview

# Initialize FastAPI app
app = FastAPI(
    title="CVision AI API",
    description="AI-powered resume analysis and career guidance platform",
    version="0.1.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(resume.router)
app.include_router(interview.router)

@app.get("/")
async def root():
    """API health check"""
    return {
        "message": "CVision AI API is running",
        "version": "0.1.0",
        "endpoints": {
            "resume_upload": "/resume/upload",
            "resume_analyze": "/resume/analyze/{resume_id}",
            "get_suggestions": "/resume/suggestions/{resume_id}",
            "interview_questions": "/interview/generate/{resume_id}"
        }
    }

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
