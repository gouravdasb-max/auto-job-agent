import json
from ai.prompt_runner import run_prompt
from ai.llm_response_parser import extract_json

def fill_application(student_profile, answer_library, job):

    prompt = f"""
Student Profile: {student_profile}
Answer Library: {answer_library}
Job: {job}
IMPORTANT:
Return ONLY valid JSON.
No markdown.
No explanation.
No text before or after JSON.
Start with {{ and end with }}.
If you add anything else, the answer is WRONG.


Output format:

You are a JSON API.
You must return machine-readable JSON only.
No human explanation allowed.

FINAL ANSWER FORMAT (STRICT):
{{
  "name": "string",
  "email": "string",
  "skills": ["string"],
  "why_this_role": "string",
  "expected_salary": "string"
}}
"""

    raw = run_prompt(prompt)
    print("RAW LLM OUTPUT:", raw)
    result = extract_json(raw)
    return result
