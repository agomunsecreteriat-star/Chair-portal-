const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};


/* STORAGE */

let delegates =
  JSON.parse(
    localStorage.getItem("agomunDelegates")
  ) || [];

let loggedInChair =
  localStorage.getItem("agomunChair");


/* ELEMENTS */

const loginPage =
  document.getElementById("loginPage");

const dashboard =
  document.getElementById("dashboard");

const loginButton =
  document.getElementById("loginButton");

const logoutButton =
  document.getElementById("logoutButton");

const loginMessage =
  document.getElementById("loginMessage");

const chairName =
  document.getElementById("chairName");

const dashboardButton =
  document.getElementById("dashboardButton");

const delegatesButton =
  document.getElementById("delegatesButton");

const dashboardPage =
  document.getElementById("dashboardPage");

const delegatesPage =
  document.getElementById("delegatesPage");

const addDelegateButton =
  document.getElementById("addDelegateButton");

const delegateList =
  document.getElementById("delegateList");

const delegateCount =
  document.getElementById("delegateCount");


/* SHOW DASHBOARD */

function showDashboard() {

  dashboardPage.style.display = "block";

  delegatesPage.style.display = "none";

  dashboardButton.classList.add("active");

  delegatesButton.classList.remove("active");

}


/* SHOW DELEGATES */

function showDelegates() {

  dashboardPage.style.display = "none";

  delegatesPage.style.display = "block";

  dashboardButton.classList.remove("active");

  delegatesButton.classList.add("active");

  renderDelegates();

}


/* LOGIN */

loginButton.addEventListener(
  "click",
  function () {

    const id =
      document.getElementById(
        "chairID"
      ).value.trim();

    const password =
      document.getElementById(
        "chairPassword"
      ).value;


    if (chairs[id] === password) {

      loggedInChair = id;

      localStorage.setItem(
        "agomunChair",
        id
      );


      loginPage.style.display =
        "none";

      dashboard.style.display =
        "flex";


      chairName.textContent =
        id;


      loginMessage.textContent =
        "";


      showDashboard();

    }

    else {

      loginMessage.textContent =
        "Invalid Chair ID or password.";

    }

  }
);


/* LOGOUT */

logoutButton.addEventListener(
  "click",
  function () {

    localStorage.removeItem(
      "agomunChair"
    );

    loggedInChair = null;


    dashboard.style.display =
      "none";

    loginPage.style.display =
      "flex";


    document.getElementById(
      "chairID"
    ).value = "";

    document.getElementById(
      "chairPassword"
    ).value = "";

    loginMessage.textContent =
      "";

  }
);


/* DASHBOARD */

dashboardButton.addEventListener(
  "click",
  function () {

    showDashboard();

  }
);


/* DELEGATES */

delegatesButton.addEventListener(
  "click",
  function () {

    showDelegates();

  }
);


/* ADD DELEGATE */

addDelegateButton.addEventListener(
  "click",
  function () {


    const country =
      prompt("Enter country:");

    if (
      !country ||
      country.trim() === ""
    ) {
      return;
    }


    const name =
      prompt("Enter delegate name:");

    if (
      !name ||
      name.trim() === ""
    ) {
      return;
    }


    const attendance =
      prompt(
        "Attendance:\n\n" +
        "1 = Present\n" +
        "2 = Absent\n" +
        "3 = Late"
      );


    if (!attendance) {
      return;
    }


    let attendanceStatus;


    if (attendance === "1") {

      attendanceStatus =
        "Present";

    }

    else if (attendance === "2") {

      attendanceStatus =
        "Absent";

    }

    else if (attendance === "3") {

      attendanceStatus =
        "Late";

    }

    else {

      alert(
        "Enter 1, 2 or 3."
      );

      return;

    }


    const score =
      prompt(
        "Enter starting score (0-100):"
      );


    if (
      score === null ||
      score.trim() === ""
    ) {
      return;
    }


    const numericScore =
      Number(score);


    if (
      isNaN(numericScore) ||
      numericScore < 0 ||
      numericScore > 100
    ) {

      alert(
        "Score must be between 0 and 100."
      );

      return;

    }


    const newDelegate = {

      country:
        country.trim(),

      name:
        name.trim(),

      attendance:
        attendanceStatus,

      score:
        numericScore

    };


    delegates.push(
      newDelegate
    );


    localStorage.setItem(
      "agomunDelegates",
      JSON.stringify(delegates)
    );


    renderDelegates();

  }
);


/* RENDER */

function renderDelegates() {

  delegateCount.textContent =
    delegates.length;


  if (
    delegates.length === 0
  ) {

    delegateList.innerHTML = `
      <tr>
        <td colspan="6">
          No delegates added yet.
        </td>
      </tr>
    `;

    return;

  }


  delegateList.innerHTML = "";


  delegates.forEach(
    function (delegate, index) {

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
            data-index="${index}"
            type="button">
            Delete
          </button>
        </td>
      `;


      delegateList.appendChild(
        row
      );

    }
  );

}


/* DELETE */

delegateList.addEventListener(
  "click",
  function (event) {

    if (
      !event.target.classList.contains(
        "deleteDelegate"
      )
    ) {
      return;
    }


    const index =
      Number(
        event.target.dataset.index
      );


    const delegate =
      delegates[index];


    const confirmDelete =
      confirm(
        "Delete " +
        delegate.name +
        " (" +
        delegate.country +
        ")?"
      );


    if (!confirmDelete) {
      return;
    }


    delegates.splice(
      index,
      1
    );


    localStorage.setItem(
      "agomunDelegates",
      JSON.stringify(delegates)
    );


    renderDelegates();

  }
);


/* RESTORE SESSION */

if (
  loggedInChair &&
  chairs[loggedInChair]
) {

  loginPage.style.display =
    "none";

  dashboard.style.display =
    "flex";

  chairName.textContent =
    loggedInChair;

  showDashboard();

}


/* INITIAL DATA */

renderDelegates();
