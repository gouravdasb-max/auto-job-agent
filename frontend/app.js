let remaining = 10;

import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

window.studentProfile = {
  name: "",
  email: "",
  skills: [],
  education: "",
  experience: ""
};

window.answerLibrary = {
  why_this_role: "I am interested because it matches my skills.",
  strengths: "Quick learner, problem solver",
  weaknesses: "Sometimes overthink",
  career_goals: "Grow as a developer"
};

function signup(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, pass)
  .then(() => alert("Signup success"))
  .catch(err => {
    if (err.code === "auth/email-already-in-use") {
      alert("Email already exists");
    } else if (err.code === "auth/weak-password") {
      alert("Password too weak");
    } else {
      alert("Signup failed");
    }
  });
}

function login(){
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, pass)
  .then(() => window.location = "dashboard.html")
  .catch(err => {
    if (err.code === "auth/invalid-credential") {
      alert("Invalid email or password");
    } else {
      alert("Login failed");
    }
  });
}



async function loadJobs() {
  const skillInput = document.getElementById("skills").value;
  const div = document.getElementById("jobs");
  
  try {
    div.innerHTML = "Loading jobs...";
    const res = await fetch("http://localhost:5000/jobs")
    const jobs = await res.json();

    if (jobs.length === 0) {
  div.innerHTML = "No matching jobs found";
  return
}


    document.getElementById("jobs").innerHTML =
      `<p>Showing jobs for: ${skillInput}</p>`;
    div.innerHTML = "";

    jobs.slice(0, 11).forEach((j) => {
      div.innerHTML += `
        <div class="job-card">
          <h3>${j.company}</h3>
          <p>${j.role}</p>
          <p>${j.location}</p>
          <p>${j.salary_range}</p>
          <p>${j.work_mode}</p>
          
          <button onclick="applyJob(this)">Apply</button>
        </div>
      `;
    });
  } catch (err) {
    div.innerHTML = "Backend not running";
  }
}

async function extractSkills() {
  const resumeText = document.getElementById("resume").value;

  try {
    const res = await fetch("http://localhost:5000/extract-skills", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ text: resumeText })
    });

    const data = await res.json();
    document.getElementById("skills").value = data.skills;

  } catch {
    // fallback if backend not ready
    document.getElementById("skills").value = "python, javascript";
  }
}


  
 


async function applyJob(job) {
  if (remaining > 0) {
    remaining--;
    document.getElementById("count").innerText = remaining;
  const response = await fetch("http://localhost:5000/apply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    job: job,
    student_profile: window.studentProfile,
    answer_library: window.answerLibrary
  })
});

  const application = await response.json();
  showApplication(application);
}else {
    alert("Limit reached");
  }

}



function showApplication(app) {
  const box = document.getElementById("applicationBox");
  if (!box) {
    console.log("No applicationBox div found");
    return;
  }

  box.innerHTML = `
    <h3>Generated Application</h3>
    <p><b>Name:</b> ${app.name || ""}</p>
    <p><b>Email:</b> ${app.email || ""}</p>
    <p><b>Skills:</b> ${(app.skills || []).join(", ")}</p>
    <p><b>Why this role:</b> ${app.why_this_role || ""}</p>
    <p><b>Expected Salary:</b> ${app.expected_salary || ""}</p>
  `;
}

window.loadJobs = loadJobs;
window.extractSkills = extractSkills;
window.applyJob = applyJob;
window.login = login;
window.signup = signup;
