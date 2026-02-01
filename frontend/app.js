let remaining = 10;
function login() {
  // Later connect Firebase here
  alert("Login clicked");
  window.location.href = "dashboard.html";
}

async function loadJobs() {
  const skillInput = document.getElementById("skills").value;
  console.log("Skills:", skillInput);

  const div = document.getElementById("jobs");
  div.innerHTML = "Loading...";

  try {
    const res = await fetch("http://localhost:5000/jobs");
    const jobs = await res.json();

    div.innerHTML = "";

    jobs.slice(0, 10).forEach(j => {
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

function extractSkills() {
  const resumeText = document.getElementById("resume").value;
  console.log("Resume:", resumeText);

  // Later this will call Ollama / AI
  alert("AI will extract skills here");
}

function applyJob(btn){
  if(remaining > 0){
    remaining--;
    document.getElementById("count").innerText = remaining;
    btn.innerText = "Applied";
    btn.disabled = true;
  } else {
    alert("Limit reached");
  }
}