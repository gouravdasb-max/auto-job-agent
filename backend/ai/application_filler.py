import json
from ai.prompt_runner import run_prompt

def fill_application(student_profile, answer_library, job):

    prompt = f"""
You are filling a job application form.

Student Profile:
{json.dumps(student_profile, indent=2)}

Answer Library:
{json.dumps(answer_library, indent=2)}

Job Details:
{json.dumps(job, indent=2)}

Rules:
- Use only given data
- Do not invent facts
- Be concise and professional
- Return JSON only

Output JSON:
{{
  "name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "why_this_role": "",
  "why_this_company": "",
  "expected_salary": "",
  "work_authorization": ""
}}
"""

    return run_prompt(prompt)
