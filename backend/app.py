from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv("backend/jobs.csv")

@app.route("/")
def home():
    return "Backend is running. Use /jobs"

@app.route("/jobs", methods=["GET"])
def get_jobs():
    return jsonify(df.to_dict(orient="records"))



from flask import request
from ai.application_filler import fill_application

@app.route("/apply", methods=["POST"])
def apply_job():
    data = request.json

    if not data or "student_profile" not in data or "answer_library" not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    job = data["job"]
    student_profile = data["student_profile"]
    answer_library = data["answer_library"]

    application = fill_application(
        student_profile=student_profile,
        answer_library=answer_library,
        job=job
    )

    return jsonify(application)

if __name__ == "__main__":
    app.run(port=5000, debug=True)