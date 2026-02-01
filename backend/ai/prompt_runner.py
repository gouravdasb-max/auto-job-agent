import subprocess

def run_prompt(prompt: str) -> str:
    process = subprocess.Popen(
    ["ollama", "run", "deepseek-coder"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    stdout, stderr = process.communicate(prompt)

    if stderr:
        print(stderr)

    return stdout.strip()