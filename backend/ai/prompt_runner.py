def run_prompt(prompt: str) -> str:
    """
    Temporary LLM runner.
    Later this can be replaced with OpenAI / Ollama / etc.
    """

    print("PROMPT SENT TO LLM:")
    print(prompt)

    # Dummy response for now (so backend works)
    return """
    {
      "name": "Sample User",
      "email": "user@example.com",
      "phone": "9999999999",
      "skills": ["python", "flask", "sql"],
      "why_this_role": "I am interested because it matches my skills.",
      "why_this_company": "The company aligns with my career goals.",
      "expected_salary": "8 LPA",
      "work_authorization": "yes"
    }
    """