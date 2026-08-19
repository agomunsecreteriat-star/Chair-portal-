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


// LOGIN
loginButton.addEventListener("click", function () {

  const chairID = document.getElementById("chairID").value.trim();
  const password = document.getElementById("chairPassword").value;

  if (chairs[chairID] === password) {

    loginPage.style.display = "none";
    dashboard.style.display = "flex";

    chairName.textContent = chairID;
    loginMessage.textContent = "";

  } else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


// LOGOUT
logoutButton.addEventListener("click", function () {

  dashboard.style.display = "none";
  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";
  document.getElementById("chairPassword").value = "";

});


// NAVIGATION
const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".portal-section");

navButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const target = button.getAttribute("data-section");

    if (!target) return;

    navButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    sections.forEach(function (section) {
      section.classList.remove("active-section");
    });

    const targetSection = document.getElementById(target);

    if (targetSection) {
      targetSection.classList.add("active-section");
    }

  });

});
const navButtons = document.querySelectorAll(".nav-button");
const sections = document.querySelectorAll(".portal-section");

navButtons.forEach(function(button) {
  button.addEventListener("click", function() {

    const target = button.getAttribute("data-section");

    if (!target) return;

    navButtons.forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    sections.forEach(function(section) {
      section.classList.remove("active-section");
    });

    const targetSection = document.getElementById(target);

    if (targetSection) {
      targetSection.classList.add("active-section");
    }

  });
});
