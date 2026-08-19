const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};

const loginButton = document.getElementById("loginButton");
const logoutButton = document.getElementById("logoutButton");

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const loginMessage = document.getElementById("loginMessage");
const chairName = document.getElementById("chairName");

const delegatesButton =
  document.getElementById("delegatesButton");

const delegatesPage =
  document.getElementById("delegatesPage");

const addDelegateButton =
  document.getElementById("addDelegateButton");

const delegateList =
  document.getElementById("delegateList");


/* LOGIN */

loginButton.addEventListener("click", function () {

  const id =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;

  if (chairs[id] === password) {

    loginPage.style.display = "none";

    dashboard.style.display = "flex";

    chairName.textContent = id;

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


/* DELEGATES */

delegatesButton.addEventListener("click", function () {

  document.querySelector(".header").style.display = "none";

  document.querySelector(".cards").style.display = "none";

  document.querySelector(".welcome-box").style.display = "none";

  delegatesPage.style.display = "block";

});


/* ADD DELEGATE */

let delegateNumber = 0;

addDelegateButton.addEventListener("click", function () {

  const country = prompt("Enter country:");

  if (!country) return;

  const delegate = prompt("Enter delegate name:");

  if (!delegate) return;

  const attendance = prompt(
    "Attendance status:\n\n1 = Present\n2 = Absent\n3 = Late"
  );

  if (!attendance) return;

  let attendanceStatus;

  if (attendance === "1") {
    attendanceStatus = "Present";
  } 
  else if (attendance === "2") {
    attendanceStatus = "Absent";
  } 
  else if (attendance === "3") {
    attendanceStatus = "Late";
  } 
  else {
    alert("Please enter 1, 2 or 3.");
    return;
  }

  delegateNumber++;

  if (delegateNumber === 1) {
    delegateList.innerHTML = "";
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${delegateNumber}</td>
    <td>${country}</td>
    <td>${delegate}</td>
    <td>${attendanceStatus}</td>
    <td>0</td>
    <td>
      <button class="deleteDelegate">
        Delete
      </button>
    </td>
  `;

  delegateList.appendChild(row);

});


/* DELETE DELEGATE */

delegateList.addEventListener("click", function (event) {

  if (!event.target.classList.contains("deleteDelegate")) {
    return;
  }

  const row = event.target.closest("tr");

  const country =
    row.children[1].textContent;

  const delegate =
    row.children[2].textContent;

  const confirmDelete = confirm(
    `Delete ${delegate} (${country})?`
  );

  if (!confirmDelete) {
    return;
  }

  row.remove();

});
