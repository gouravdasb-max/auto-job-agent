import subprocess

def run_prompt(prompt: str) -> str:
    """
    Runs a real LLM locally using Ollama.
    """

    process = subprocess.Popen(
        ["ollama", "run", "mistral"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    stdout, stderr = process.communicate(prompt)

    if stderr:
        print("LLM error:", stderr)

    return stdout.strip()