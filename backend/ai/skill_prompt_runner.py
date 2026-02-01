def build_skill_prompt(resume_text):
    with open("ai/skill_extraction_prompt.txt", "r") as f:
        template = f.read()

    return template.replace("{{resume_text}}", resume_text)


if __name__ == "__main__":
    resume = "I worked with Python, Flask, SQL and AWS."
    print(build_skill_prompt(resume))
