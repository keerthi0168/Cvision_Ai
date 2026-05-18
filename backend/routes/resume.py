from fastapi import APIRouter, UploadFile, File, HTTPException
import uuid
from datetime import datetime
from utils.pdf_parser import extract_text_from_pdf, clean_text
from models import ResumeUploadResponse

router = APIRouter(prefix="/resume", tags=["resume"])

# In-memory storage (replace with database in production)
RESUMES = {}

@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse resume PDF"""
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files allowed")
    
    try:
        pdf_bytes = await file.read()
        text = extract_text_from_pdf(pdf_bytes)
        clean_text_content = clean_text(text)
        
        resume_id = str(uuid.uuid4())
        RESUMES[resume_id] = {
            'filename': file.filename,
            'text': clean_text_content,
            'upload_time': datetime.now(),
            'pdf_bytes': pdf_bytes
        }
        
        return ResumeUploadResponse(
            resume_id=resume_id,
            filename=file.filename,
            upload_time=datetime.now()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {str(e)}")

@router.get("/analyze/{resume_id}")
async def analyze_resume(resume_id: str):
    """Analyze resume and extract information"""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    from ml.skill_extraction import extract_skills, predict_job_roles, calculate_resume_score
    
    resume = RESUMES[resume_id]
    skills = extract_skills(resume['text'])
    predicted_roles = predict_job_roles(skills)
    resume_score = calculate_resume_score(resume['text'], skills)
    
    return {
        'resume_id': resume_id,
        'resume_score': resume_score,
        'skills': skills,
        'predicted_roles': predicted_roles,
        'extraction_time': datetime.now()
    }

@router.get("/suggestions/{resume_id}")
async def get_suggestions(resume_id: str):
    """Get AI improvement suggestions"""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    from ml.skill_extraction import extract_skills
    from utils.gemini_service import generate_suggestions
    
    resume = RESUMES[resume_id]
    skills = extract_skills(resume['text'])
    suggestions = generate_suggestions(resume['text'], skills)
    
    return {
        'resume_id': resume_id,
        'suggestions': suggestions
    }
