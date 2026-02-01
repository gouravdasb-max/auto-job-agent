let remaining = 10;

import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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

window.login = login;
window.signup = signup;

async function loadJobs() {
  const skillInput = document.getElementById("skills").value;
  const div = document.getElementById("jobs");
  
  try {
    div.innerHTML = "Loading jobs...";
    const res = await fetch("http://localhost:5000/jobs");
    const jobs = await res.json();

    if (jobs.length === 0) {
  div.innerHTML = "No matching jobs found";
  return -1
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
          
          <button onclick="apply(this)">Apply</button>
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

function apply(btn) {
  if (remaining > 0) {
    remaining--;
    document.getElementById("count").innerText = remaining;
    btn.innerText = "Applied";
    btn.disabled = true;
  } else {
    alert("Limit reached");
  }
}
