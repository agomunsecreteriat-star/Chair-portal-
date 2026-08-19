const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};

let delegates = [];
let speakers = [];


const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const loginMessage = document.getElementById("loginMessage");
const chairName = document.getElementById("chairName");
const committeeChair = document.getElementById("committeeChair");


/* LOGIN */

loginButton.addEventListener("click", function () {

  const chairID =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;

  if (chairs[chairID] && chairs[chairID] === password) {

    loginPage.style.display = "none";
    dashboard.style.display = "flex";

    chairName.textContent = chairID;
    committeeChair.textContent = chairID;

    loginMessage.textContent = "";

  } else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


/* LOGOUT */

logoutButton.addEventListener("click", function () {

  dashboard.style.display = "none";
  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";
  document.getElementById("chairPassword").value = "";

  loginMessage.textContent = "";

});


/* NAVIGATION */

const navButtons =
  document.querySelectorAll(".nav-button");

const sections =
  document.querySelectorAll(".portal-section");


navButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const target =
      button.getAttribute("data-section");

    if (!target) return;

    navButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    sections.forEach(function (section) {
      section.classList.remove("active-section");
    });

    const targetSection =
      document.getElementById(target);

    if (targetSection) {
      targetSection.classList.add("active-section");
    }

  });

});


/* ADD DELEGATE */

const addDelegateButton =
  document.getElementById("addDelegateButton");

const delegateModal =
  document.getElementById("delegateModal");

const closeModalButton =
  document.getElementById("closeModalButton");

const saveDelegateButton =
  document.getElementById("saveDelegateButton");


addDelegateButton.addEventListener("click", function () {

  delegateModal.style.display = "flex";

});


closeModalButton.addEventListener("click", function () {

  delegateModal.style.display = "none";

});


saveDelegateButton.addEventListener("click", function () {

  const country =
    document.getElementById("countryInput").value.trim();

  const name =
    document.getElementById("delegateNameInput").value.trim();


  if (!country || !name) {
    alert("Please enter both country and delegate name.");
    return;
  }


  delegates.push({

    country: country,

    name: name,

    attendance: "Present",

    score: 0

  });


  document.getElementById("countryInput").value = "";

  document.getElementById("delegateNameInput").value = "";

  delegateModal.style.display = "none";

  renderDelegates();

});


/* RENDER DELEGATES */

function renderDelegates() {

  const list =
    document.getElementById("delegateList");

  const count =
    document.getElementById("delegateCount");


  count.textContent = delegates.length;


  if (delegates.length === 0) {

    list.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          No delegates added yet.
        </td>
      </tr>
    `;

    return;
  }


  list.innerHTML = "";


  delegates.forEach(function (delegate, index) {

    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>${index + 1}</td>

      <td>
        <strong>${delegate.country}</strong>
      </td>

      <td>${delegate.name}</td>

      <td>${delegate.attendance}</td>

      <td>${delegate.score}</td>

      <td>
        <button
          class="cancel-button"
          onclick="deleteDelegate(${index})">
          Delete
        </button>
      </td>
    `;


    list.appendChild(row);

  });


  renderAttendance();

  renderScores();

}


/* DELETE DELEGATE */

function deleteDelegate(index) {

  delegates.splice(index, 1);

  renderDelegates();

}


/* ATTENDANCE */

function renderAttendance() {

  const list =
    document.getElementById("attendanceList");

  const rate =
    document.getElementById("attendanceRate");


  if (delegates.length === 0) {

    list.innerHTML = `
      <div class="empty-state">
        No delegates added yet.
      </div>
    `;

    rate.textContent = "0%";

    return;
  }


  list.innerHTML = "";


  delegates.forEach(function (delegate, index) {

    const item =
      document.createElement("div");

    item.className = "attendance-item";


    item.innerHTML = `
      <strong>${delegate.country}</strong>
      <p>${delegate.name}</p>

      <select
        onchange="changeAttendance(${index}, this.value)"
        style="
          margin-top:10px;
          padding:8px;
          background:#0d1325;
          color:white;
          border:1px solid #303a55;
          border-radius:7px;
        "
      >

        <option
          ${delegate.attendance === "Present" ? "selected" : ""}>
          Present
        </option>

        <option
          ${delegate.attendance === "Late" ? "selected" : ""}>
          Late
        </option>

        <option
          ${delegate.attendance === "Absent" ? "selected" : ""}>
          Absent
        </option>

      </select>
    `;


    list.appendChild(item);

  });


  updateAttendanceRate();

}


function changeAttendance(index, value) {

  delegates[index].attendance = value;

  updateAttendanceRate();

  renderDelegates();

}


function updateAttendanceRate() {

  if (delegates.length === 0) {

    document.getElementById("attendanceRate").textContent =
      "0%";

    return;
  }


  const present =
    delegates.filter(function (delegate) {

      return delegate.attendance === "Present";

    }).length;


  const percentage =
    Math.round((present / delegates.length) * 100);


  document.getElementById("attendanceRate").textContent =
    percentage + "%";

}


/* SCORES */

function renderScores() {

  const list =
    document.getElementById("scoreList");


  if (delegates.length === 0) {

    list.innerHTML = `
      <div class="empty-state">
        No delegates added yet.
      </div>
    `;

    return;
  }


  list.innerHTML = "";


  delegates.forEach(function (delegate, index) {

    const item =
      document.createElement("div");

    item.className = "score-item";


    item.innerHTML = `
      <strong>${delegate.country}</strong>

      <p style="margin-top:6px;color:#8994ad;">
        ${delegate.name}
      </p>

      <input
        type="number"
        min="0"
        max="100"
        value="${delegate.score}"
        onchange="changeScore(${index}, this.value)"
        style="margin-top:12px;"
      >
    `;


    list.appendChild(item);

  });

}


function changeScore(index, value) {

  let score = Number(value);


  if (score < 0) score = 0;

  if (score > 100) score = 100;


  delegates[index].score = score;

  renderDelegates();

}


/* SPEAKERS */

const addSpeakerButton =
  document.getElementById("addSpeakerButton");


addSpeakerButton.addEventListener("click", function () {

  if (delegates.length === 0) {

    alert("Add delegates first.");

    return;

  }


  const available =
    delegates.filter(function (delegate) {

      return !speakers.includes(delegate.name);

    });


  if (available.length === 0) {

    alert("All delegates are already on the speakers list.");

    return;

  }


  speakers.push(available[0].name);

  renderSpeakers();

});


function renderSpeakers() {

  const list =
    document.getElementById("speakerList");


  if (speakers.length === 0) {

    list.innerHTML = `
      <div class="empty-state">
        No speakers added.
      </div>
    `;

    return;
  }


  list.innerHTML = "";


  speakers.forEach(function (speaker, index) {

    const item =
      document.createElement("div");

    item.className = "speaker-item";


    item.innerHTML = `
      <strong>
        #${index + 1} — ${speaker}
      </strong>

      <button
        class="cancel-button"
        style="float:right;"
        onclick="removeSpeaker(${index})">
        Remove
      </button>
    `;


    list.appendChild(item);

  });

}


function removeSpeaker(index) {

  speakers.splice(index, 1);

  renderSpeakers();

}


/* INITIAL STATE */

renderDelegates();
renderSpeakers();
