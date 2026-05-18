from fastapi import APIRouter, HTTPException
from routes.resume import RESUMES
from utils.gemini_service import generate_interview_questions
from ml.skill_extraction import extract_skills, predict_job_roles

router = APIRouter(prefix="/interview", tags=["interview"])

@router.get("/generate/{resume_id}")
async def generate_interview_questions_endpoint(resume_id: str):
    """Generate interview prep questions"""
    if resume_id not in RESUMES:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    resume = RESUMES[resume_id]
    skills = extract_skills(resume['text'])
    predicted_roles = predict_job_roles(skills)
    questions = generate_interview_questions(skills, predicted_roles)
    
    return {
        'resume_id': resume_id,
        'questions': questions
    }
