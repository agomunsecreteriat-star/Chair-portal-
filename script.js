const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};


/* =========================
   SAVED DATA
========================= */

let delegates =
  JSON.parse(localStorage.getItem("agomunDelegates")) || [];

let loggedInChair =
  localStorage.getItem("agomunChair") || null;


/* =========================
   ELEMENTS
========================= */

const loginButton =
  document.getElementById("loginButton");

const logoutButton =
  document.getElementById("logoutButton");

const loginPage =
  document.getElementById("loginPage");

const dashboard =
  document.getElementById("dashboard");

const loginMessage =
  document.getElementById("loginMessage");

const chairName =
  document.getElementById("chairName");

const delegatesButton =
  document.getElementById("delegatesButton");

const delegatesPage =
  document.getElementById("delegatesPage");

const addDelegateButton =
  document.getElementById("addDelegateButton");

const delegateList =
  document.getElementById("delegateList");


/* =========================
   LOGIN
========================= */

loginButton.addEventListener("click", function () {

  const id =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;


  if (chairs[id] === password) {

    localStorage.setItem("agomunChair", id);

    loggedInChair = id;

    loginPage.style.display = "none";

    dashboard.style.display = "flex";

    chairName.textContent = id;

    loginMessage.textContent = "";

    renderDelegates();

  } else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


/* =========================
   LOGOUT
========================= */

logoutButton.addEventListener("click", function () {

  localStorage.removeItem("agomunChair");

  loggedInChair = null;

  dashboard.style.display = "none";

  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";

  document.getElementById("chairPassword").value = "";

  loginMessage.textContent = "";

});


/* =========================
   DELEGATES PAGE
========================= */

delegatesButton.addEventListener("click", function () {

  document.querySelector(".header").style.display = "none";

  document.querySelector(".cards").style.display = "none";

  document.querySelector(".welcome-box").style.display = "none";

  delegatesPage.style.display = "block";

  renderDelegates();

});


/* =========================
   ADD DELEGATE
========================= */

addDelegateButton.addEventListener("click", function () {

  const country =
    prompt("Enter country:");

  if (!country || country.trim() === "") {
    return;
  }


  const delegate =
    prompt("Enter delegate name:");

  if (!delegate || delegate.trim() === "") {
    return;
  }


  const attendance =
    prompt(
      "Attendance:\n\n1 - Present\n2 - Absent\n3 - Late"
    );

  if (!attendance) {
    return;
  }


  let attendanceStatus;

  if (attendance === "1") {

    attendanceStatus = "Present";

  } else if (attendance === "2") {

    attendanceStatus = "Absent";

  } else if (attendance === "3") {

    attendanceStatus = "Late";

  } else {

    alert("Please enter 1, 2 or 3.");

    return;

  }


  const score =
    prompt("Enter starting score (0-100):");

  if (score === null || score.trim() === "") {
    return;
  }


  const numericScore =
    Number(score);


  if (
    isNaN(numericScore) ||
    numericScore < 0 ||
    numericScore > 100
  ) {

    alert("Score must be between 0 and 100.");

    return;

  }


  /* CREATE DELEGATE */

  const newDelegate = {

    country: country.trim(),

    name: delegate.trim(),

    attendance: attendanceStatus,

    score: numericScore

  };


  delegates.push(newDelegate);


  /* SAVE PERMANENTLY */

  localStorage.setItem(
    "agomunDelegates",
    JSON.stringify(delegates)
  );


  renderDelegates();

});


/* =========================
   DISPLAY DELEGATES
========================= */

function renderDelegates() {

  if (!delegateList) {
    return;
  }


  if (delegates.length === 0) {

    delegateList.innerHTML = `
      <tr>
        <td colspan="6" class="empty">
          No delegates added yet.
        </td>
      </tr>
    `;

    return;

  }


  delegateList.innerHTML = "";


  delegates.forEach(function (delegate, index) {

    const row =
      document.createElement("tr");


    row.innerHTML = `
      <td>${index + 1}</td>

      <td>${delegate.country}</td>

      <td>${delegate.name}</td>

      <td>${delegate.attendance}</td>

      <td>${delegate.score}</td>

      <td>
        <button
          class="deleteDelegate"
          type="button"
          data-index="${index}">
          Delete
        </button>
      </td>
    `;


    delegateList.appendChild(row);

  });

}


/* =========================
   DELETE DELEGATE
========================= */

delegateList.addEventListener("click", function (event) {

  if (
    !event.target.classList.contains("deleteDelegate")
  ) {
    return;
  }


  const index =
    Number(event.target.dataset.index);


  const delegate =
    delegates[index];


  const confirmation =
    confirm(
      "Delete " +
      delegate.name +
      " (" +
      delegate.country +
      ")?"
    );


  if (!confirmation) {
    return;
  }


  delegates.splice(index, 1);


  /* SAVE AFTER DELETE */

  localStorage.setItem(
    "agomunDelegates",
    JSON.stringify(delegates)
  );


  renderDelegates();

});


/* =========================
   RESTORE LOGIN AFTER REFRESH
========================= */

if (
  loggedInChair &&
  chairs[loggedInChair]
) {

  loginPage.style.display = "none";

  dashboard.style.display = "flex";

  chairName.textContent =
    loggedInChair;

}


/* =========================
   RESTORE DELEGATES
========================= */

renderDelegates();
