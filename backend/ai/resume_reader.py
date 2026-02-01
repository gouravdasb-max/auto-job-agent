import pdfplumber

def extract_text(path):
    if path.endswith(".txt"):
        return open(path, "r", encoding="utf-8").read()

    if path.endswith(".pdf"):
        text = ""
        with pdfplumber.open(path) as pdf:
            for page in pdf.pages:
                text += page.extract_text()
        return text
