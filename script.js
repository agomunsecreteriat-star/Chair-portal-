const chairs = {
  "CHAIR001": "Agomun123",
  "CHAIR002": "Chair456",
  "CHAIR003": "MUN789"
};


let delegates = [];


/* ELEMENTS */

const loginPage =
  document.getElementById("loginPage");

const portal =
  document.getElementById("portal");

const loginButton =
  document.getElementById("loginButton");

const logoutButton =
  document.getElementById("logoutButton");

const loginMessage =
  document.getElementById("loginMessage");

const chairName =
  document.getElementById("chairName");

const committeeChair =
  document.getElementById("committeeChair");


/* LOGIN */

loginButton.addEventListener("click", function () {

  const id =
    document.getElementById("chairID").value.trim();

  const password =
    document.getElementById("chairPassword").value;


  if (chairs[id] && chairs[id] === password) {

    loginPage.style.display = "none";

    portal.style.display = "flex";

    chairName.textContent = id;

    committeeChair.textContent = id;

    loginMessage.textContent = "";

  } else {

    loginMessage.textContent =
      "Invalid Chair ID or password.";

  }

});


/* LOGOUT */

logoutButton.addEventListener("click", function () {

  portal.style.display = "none";

  loginPage.style.display = "flex";

  document.getElementById("chairID").value = "";

  document.getElementById("chairPassword").value = "";

});


/* NAVIGATION */

const menuButtons =
  document.querySelectorAll(".menu");

const pages =
  document.querySelectorAll(".page");


menuButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    const target =
      button.getAttribute("data-page");


    menuButtons.forEach(function (item) {

      item.classList.remove("active");

    });


    button.classList.add("active");


    pages.forEach(function (page) {

      page.classList.remove("active-page");

    });


    const targetPage =
      document.getElementById(target);


    if (targetPage) {

      targetPage.classList.add("active-page");

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

    alert("Please enter country and delegate name.");

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


/* DELEGATES TABLE */

function renderDelegates() {

  const list =
    document.getElementById("delegateList");

  const count =
    document.getElementById("delegateCount");


  count.textContent =
    delegates.length;


  if (delegates.length === 0) {

    list.innerHTML = `
      <tr>
        <td colspan="6" class="empty">
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

      <td>
        ${index + 1}
      </td>

      <td>
        ${delegate.country}
      </td>

      <td>
        ${delegate.name}
      </td>

      <td>
        ${delegate.attendance}
      </td>

      <td>
        ${delegate.score}
      </td>

      <td>

        <button
          class="secondary"
          onclick="deleteDelegate(${index})">

          Delete

        </button>

      </td>

    `;


    list.appendChild(row);

  });

}


function deleteDelegate(index) {

  delegates.splice(index, 1);

  renderDelegates();

}


/* INITIAL */

renderDelegates();
