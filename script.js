const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};


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


/* LOGIN */

loginButton.addEventListener("click", function() {

  const id =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;


  if (chairs[id] === password) {

    loginPage.style.display = "none";

    dashboard.style.display = "flex";

    chairName.textContent = id;

    loginMessage.textContent = "";

  }

  else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


/* LOGOUT */

logoutButton.addEventListener("click", function() {

  dashboard.style.display = "none";

  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";

  document.getElementById("chairPassword").value = "";

  loginMessage.textContent = "";

});
/* DELEGATES PAGE */

const delegatesButton =
  document.getElementById("delegatesButton");

const delegatesPage =
  document.getElementById("delegatesPage");


delegatesButton.addEventListener("click", function() {

  document.querySelector(".header").style.display = "none";

  document.querySelector(".cards").style.display = "none";

  document.querySelector(".welcome-box").style.display = "none";

  delegatesPage.style.display = "block";

});
