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


/* DELETE DE
