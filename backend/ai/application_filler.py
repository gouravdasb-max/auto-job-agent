import json
from ai.prompt_runner import run_prompt
from ai.llm_response_parser import extract_json

def fill_application(prompt):
    raw = run_prompt(prompt)
    result = extract_json(raw)
    return result
