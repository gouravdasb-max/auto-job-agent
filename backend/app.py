from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

df = pd.read_csv("jobs.csv")

@app.route("/")
def home():
    return "Backend is running. Use /jobs"

@app.route("/jobs", methods=["GET"])
def get_jobs():
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(port=5000, debug=True)