import google.generativeai as genai
from config import settings

def initialize_gemini():
    """Initialize Gemini API"""
    if settings.gemini_api_key:
        genai.configure(api_key=settings.gemini_api_key)

def generate_suggestions(resume_text: str, skills: list) -> list:
    """Generate AI suggestions using Gemini"""
    try:
        if not settings.gemini_api_key:
            # Return mock suggestions if API key not configured
            return [
                {'category': 'achievements', 'suggestion': 'Add quantifiable achievements to your projects', 'priority': 'high'},
                {'category': 'skills', 'suggestion': 'Include more technical certifications', 'priority': 'medium'},
                {'category': 'experience', 'suggestion': 'Expand on your leadership experience', 'priority': 'medium'},
                {'category': 'impact', 'suggestion': 'Add metrics to demonstrate impact', 'priority': 'high'}
            ]
        
        model = genai.GenerativeModel('gemini-pro')
        prompt = f"""Based on this resume excerpt and detected skills {skills}, provide 4 specific suggestions to improve the resume.
        
Resume excerpt: {resume_text[:500]}

Provide suggestions in format:
1. [category]: [suggestion]
"""
        response = model.generate_content(prompt)
        # Parse and return structured suggestions
        suggestions = []
        for line in response.text.split('\n'):
            if ':' in line:
                parts = line.split(':', 1)
                suggestions.append({
                    'category': parts[0].strip(),
                    'suggestion': parts[1].strip(),
                    'priority': 'high'
                })
        return suggestions[:4]
    except Exception as e:
        print(f"Error generating suggestions: {e}")
        return []

def generate_interview_questions(skills: list, predicted_roles: list) -> list:
    """Generate interview questions using Gemini"""
    try:
        if not settings.gemini_api_key:
            # Return mock questions if API key not configured
            return [
                {'question': 'Tell us about your experience with microservices architecture', 'difficulty': 'intermediate', 'category': 'backend'},
                {'question': 'How do you approach machine learning model optimization?', 'difficulty': 'hard', 'category': 'ml'},
                {'question': 'Describe a challenging project and how you overcame obstacles', 'difficulty': 'intermediate', 'category': 'general'}
            ]
        
        model = genai.GenerativeModel('gemini-pro')
        skills_text = ', '.join([s['skill'] for s in skills[:5]])
        roles_text = ', '.join([r['role'] for r in predicted_roles[:2]])
        
        prompt = f"""Generate 3 technical interview questions for a candidate with skills: {skills_text}
and applying for roles: {roles_text}.

Format each question as:
[difficulty level]: [question]
"""
        response = model.generate_content(prompt)
        questions = []
        for line in response.text.split('\n'):
            if ':' in line:
                parts = line.split(':', 1)
                questions.append({
                    'question': parts[1].strip(),
                    'difficulty': 'intermediate',
                    'category': 'technical'
                })
        return questions[:5]
    except Exception as e:
        print(f"Error generating questions: {e}")
        return []
