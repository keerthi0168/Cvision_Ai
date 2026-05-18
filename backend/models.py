from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ResumeUploadResponse(BaseModel):
    resume_id: str
    filename: str
    upload_time: datetime
    
class SkillExtracted(BaseModel):
    skill: str
    confidence: float
    category: str

class ResumeAnalysis(BaseModel):
    resume_id: str
    resume_score: float
    skills: List[SkillExtracted]
    predicted_roles: List[dict]
    extraction_time: datetime
    
class Suggestion(BaseModel):
    category: str
    suggestion: str
    priority: str
    
class SuggestionsResponse(BaseModel):
    resume_id: str
    suggestions: List[Suggestion]
    
class InterviewQuestion(BaseModel):
    question: str
    difficulty: str
    category: str
    
class InterviewQuestionsResponse(BaseModel):
    resume_id: str
    questions: List[InterviewQuestion]
