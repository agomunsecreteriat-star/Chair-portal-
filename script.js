const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};

document.addEventListener("DOMContentLoaded", function () {

  const loginButton = document.getElementById("loginButton");
  const loginPage = document.getElementById("loginPage");
  const portal = document.getElementById("portal");
  const loginMessage = document.getElementById("loginMessage");
  const chairName = document.getElementById("chairName");

  loginButton.onclick = function () {

    const id = document.getElementById("chairID").value.trim();
    const password = document.getElementById("chairPassword").value;

    if (chairs[id] === password) {

      loginPage.style.display = "none";
      portal.style.display = "flex";

      if (chairName) {
        chairName.textContent = id;
      }

      loginMessage.textContent = "";

    } else {

      loginMessage.textContent =
        "Invalid Chair ID or password.";

    }

  };

});
