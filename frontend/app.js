let remaining = 10;
function login() {
  // Later connect Firebase here
  alert("Login clicked");
  window.location.href = "dashboard.html";
}

async function loadJobs() {
  const skillInput = document.getElementById("skills").value;
  const div = document.getElementById("jobs");
  div.innerHTML = "Loading...";
  
  try {
    const res = await fetch("http://localhost:5000/jobs");
    const jobs = await res.json();
    
    document.getElementById("jobs").innerHTML =
      `<p>Showing jobs for: ${skillInput}</p>`;
    div.innerHTML = "";

    jobs.slice(0, 10).forEach((j) => {
      div.innerHTML += `
        <div class="job-card">
          <h3>${j.company}</h3>
          <p>${j.position}</p>
          <p>${j.location}</p>
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

function applyJob(btn) {
  if (remaining > 0) {
    remaining--;
    document.getElementById("count").innerText = remaining;
    btn.innerText = "Applied";
    btn.disabled = true;
  } else {
    alert("Limit reached");
  }
}

async function applyJob(job) {
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
}

