import json

def parse_job_match_response(llm_text):
    try:
        data = json.loads(llm_text)
        return {
            "match_score": float(data.get("match_score", 0)),
            "missing_skills": data.get("missing_skills", [])
        }
    except Exception:
        # safety fallback
        return {
            "match_score": 0,
            "missing_skills": []
        }


# quick test
if __name__ == "__main__":
    test = '{"match_score":0.5,"missing_skills":["django","aws"]}'
    print(parse_job_match_response(test))
