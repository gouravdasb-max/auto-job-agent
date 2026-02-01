from ai.prompt_runner import run_prompt
from ai.llm_response_parser import extract_json

def process_resume_with_ai(resume_text):

    prompt = f"""
You are a JSON API.
Return ONLY valid JSON. No explanation.

{{
  "profile": {{
    "name": "",
    "email": "",
    "skills": [],
    "education": "",
    "experience": ""
  }},
  "answers": {{
    "why_this_role": "",
    "strengths": "",
    "career_goals": ""
  }}
}}

Resume:
{resume_text}
"""

    raw = run_prompt(prompt)
    result = extract_json(raw)
    return result