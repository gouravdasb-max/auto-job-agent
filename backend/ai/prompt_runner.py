import subprocess

def run_prompt(prompt: str) -> str:
    process = subprocess.Popen(
    ["ollama", "run", "deepseek-coder"],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    encoding="utf-8",      # ADD THIS
    errors="ignore"        # ADD THIS
)
    stdout, stderr = process.communicate(prompt)

    if stderr:
        print(stderr)

    return stdout.strip()