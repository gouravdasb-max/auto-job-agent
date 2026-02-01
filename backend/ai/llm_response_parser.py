import json
import re


import json
import re

def extract_json(text):
    try:
        match = re.search(r"\{.*\}", text, re.S)
        if not match:
            return {"error": "No JSON found"}

        return json.loads(match.group())

    except Exception as e:
        print("JSON parse error:", e)
        return {
            "error": "Invalid JSON from LLM",
            "raw_output": text
        }