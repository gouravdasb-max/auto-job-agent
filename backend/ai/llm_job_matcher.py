from ai.prompt_runner import build_job_match_prompt
from ai.llm_response_parser import parse_job_match_response

# This function will be called by backend (/match)
def match_job_with_llm(user_skills, job_requirements, llm_call_fn):
    """
    llm_call_fn(prompt) -> raw string response from LLM
    """

    prompt = build_job_match_prompt(
        user_skills=", ".join(user_skills),
        job_requirements=", ".join(job_requirements)
    )

    raw_response = llm_call_fn(prompt)
    result = parse_job_match_response(raw_response)

    return result
