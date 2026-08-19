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


loginButton.addEventListener("click", function () {

  const chairID =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;


  if (chairs[chairID] && chairs[chairID] === password) {

    loginPage.style.display = "none";
    dashboard.style.display = "flex";

    chairName.textContent = chairID;

    loginMessage.textContent = "";

  } else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


logoutButton.addEventListener("click", function () {

  dashboard.style.display = "none";
  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";
  document.getElementById("chairPassword").value = "";

  loginMessage.textContent = "";

});
