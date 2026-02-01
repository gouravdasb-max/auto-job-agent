def build_job_match_prompt(user_skills, job_requirements):
    with open("backend/ai/job_matching_prompt.txt", "r") as f:
        template = f.read()

    prompt = template.replace(
        "{{user_skills}}", user_skills
    ).replace(
        "{{job_requirements}}", job_requirements
    )

    return prompt


# quick test
if __name__ == "__main__":
    user_skills = "python, flask, sql"
    job_requirements = "python, django, sql, aws"

    print(build_job_match_prompt(user_skills, job_requirements))
