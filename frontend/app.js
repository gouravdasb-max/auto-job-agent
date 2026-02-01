function login() {
  // Later connect Firebase here
  alert("Login clicked");
  window.location.href = "dashboard.html";
}

async function loadJobs() {
  const jobsDiv = document.getElementById("jobs");
  jobsDiv.innerHTML = "Loading...";

  // Demo data for now
  const demoJobs = [
    { company: "Google", role: "Software Engineer" },
    { company: "Amazon", role: "Backend Developer" }
  ];

  jobsDiv.innerHTML = "";

  demoJobs.forEach(job => {
    jobsDiv.innerHTML += `
      <p><b>${job.company}</b> - ${job.role}</p>
    `;
  });
}

git config --global user.name "Gourav"
>> git config --global user.email "gouravdas.b@gmail.com" 