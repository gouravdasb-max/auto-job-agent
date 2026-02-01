import json
import re

def parse_json_safely(text):
    try:
        match = re.search(r"\{.*\}", text, re.S)
        if not match:
            raise ValueError("No JSON found")

        return json.loads(match.group())
    except Exception:
        return None
