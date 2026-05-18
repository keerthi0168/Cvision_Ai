from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict

# Common job skills database
SKILL_DATABASE = {
    'programming': ['python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'go', 'rust', 'swift'],
    'frontend': ['react', 'angular', 'vue', 'html', 'css', 'tailwind', 'bootstrap', 'nextjs'],
    'backend': ['fastapi', 'django', 'flask', 'express', 'nodejs', 'spring', 'dotnet'],
    'databases': ['mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'dynamodb'],
    'devops': ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'gitlab', 'github actions'],
    'ml': ['tensorflow', 'pytorch', 'scikit-learn', 'machine learning', 'deep learning', 'nlp', 'computer vision'],
    'tools': ['git', 'linux', 'docker', 'jupyter', 'vscode', 'postman', 'jira']
}

def extract_skills(text: str) -> List[Dict]:
    """Extract skills from resume text"""
    text_lower = text.lower()
    detected_skills = []
    
    for category, skills in SKILL_DATABASE.items():
        for skill in skills:
            if skill in text_lower:
                detected_skills.append({
                    'skill': skill,
                    'category': category,
                    'confidence': 0.85
                })
    
    # Remove duplicates
    detected_skills = list({v['skill']:v for v in detected_skills}.values())
    return detected_skills

def predict_job_roles(skills: List[Dict]) -> List[Dict]:
    """Predict suitable job roles based on skills"""
    role_scores = {
        'Senior Software Engineer': 0,
        'Full Stack Developer': 0,
        'ML Engineer': 0,
        'DevOps Engineer': 0,
        'Backend Developer': 0,
        'Frontend Developer': 0
    }
    
    skill_names = [s['skill'].lower() for s in skills]
    
    # Score roles based on skills
    if any(s in skill_names for s in ['python', 'tensorflow', 'pytorch', 'machine learning']):
        role_scores['ML Engineer'] += 30
        role_scores['Senior Software Engineer'] += 20
    
    if any(s in skill_names for s in ['react', 'html', 'css', 'javascript']):
        role_scores['Frontend Developer'] += 25
        role_scores['Full Stack Developer'] += 15
    
    if any(s in skill_names for s in ['fastapi', 'nodejs', 'express', 'java']):
        role_scores['Backend Developer'] += 25
        role_scores['Full Stack Developer'] += 15
        role_scores['Senior Software Engineer'] += 10
    
    if any(s in skill_names for s in ['docker', 'kubernetes', 'aws', 'gcp', 'azure']):
        role_scores['DevOps Engineer'] += 30
        role_scores['Senior Software Engineer'] += 10
    
    if len(skill_names) > 8:
        role_scores['Senior Software Engineer'] += 20
        role_scores['Full Stack Developer'] += 15
    
    # Return top 3 roles
    sorted_roles = sorted(role_scores.items(), key=lambda x: x[1], reverse=True)
    return [{'role': role, 'match': min(100, score + np.random.randint(10, 20))} for role, score in sorted_roles[:3]]

def calculate_resume_score(text: str, skills: List[Dict]) -> float:
    """Calculate overall resume quality score"""
    score = 50  # Base score
    
    # Bonus for length
    if len(text) > 1500:
        score += 10
    
    # Bonus for skills
    score += min(20, len(skills) * 2)
    
    # Bonus for professional keywords
    keywords = ['experience', 'education', 'achievement', 'project', 'responsibility']
    keyword_count = sum(1 for kw in keywords if kw in text.lower())
    score += keyword_count * 2
    
    return min(100, score)
