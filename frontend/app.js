let remaining = 10;
function login() {
  // Later connect Firebase here
  alert("Login clicked");
  window.location.href = "dashboard.html";
}

async function loadJobs() {
  const jobs = [
    {company:"Google", role:"Software Engineer", location:"Remote"},
    {company:"Amazon", role:"Backend Developer", location:"Bangalore"}
  ];

  const div = document.getElementById("jobs");
  div.innerHTML = "";

  jobs.forEach(j => {
    div.innerHTML += `
      <div class="job-card">
        <h3>${j.company}</h3>
        <p>${j.role}</p>
        <p>${j.location}</p>
        <button onclick="applyJob()">Apply</button>
      </div>
    `;
  });
}

function applyJob(){
  if(remaining > 0){
    remaining--;
    document.getElementById("count").innerText = remaining;
    alert("Applied!");
  } else {
    alert("Limit reached");
  }
}
