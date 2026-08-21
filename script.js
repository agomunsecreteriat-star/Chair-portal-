document.addEventListener("DOMContentLoaded", function () {
    // Sabit Giriş Bilgileri
    const VALID_USER = "chair";
    const VALID_PASS = "agora2026";

    // Elementler
    const loginForm = document.getElementById('loginForm');
    const loginScreen = document.getElementById('loginScreen');
    const app = document.getElementById('app');
    const displayCommittee = document.getElementById('displayCommittee');
    const logoutBtn = document.getElementById('logoutBtn');

    // Timer Değişkenleri
    let timerInterval = null;
    let timeLeft = 90; // Varsayılan: 1 dakika 30 saniye

    // LOGIN MANTIĞI
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const user = document.getElementById('username').value.trim();
        const pass = document.getElementById('passcode').value.trim();
        const comm = document.getElementById('committee').value;

        if (user === VALID_USER && pass === VALID_PASS) {
            if (comm !== "") {
                loginScreen.style.display = 'none';
                app.style.display = 'block';
                displayCommittee.innerText = comm;
            } else {
                alert("Please select a committee!");
            }
        } else {
            alert("Invalid username or passcode!");
        }
    });

    // LOGOUT
    logoutBtn.addEventListener('click', function () {
        location.reload();
    });

    // TIMER MANTIĞI
    const timerDisplay = document.getElementById('timer');
    const startTimerBtn = document.getElementById('startTimerBtn');
    const pauseTimerBtn = document.getElementById('pauseTimerBtn');
    const resetTimerBtn = document.getElementById('resetTimerBtn');

    function updateTimerDisplay() {
        const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const sec = (timeLeft % 60).toString().padStart(2, '0');
        timerDisplay.innerText = `${min}:${sec}`;
    }

    startTimerBtn.addEventListener('click', function () {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                alert("Time is up!");
            }
        }, 1000);
    });

    pauseTimerBtn.addEventListener('click', function () {
        clearInterval(timerInterval);
    });

    resetTimerBtn.addEventListener('click', function () {
        clearInterval(timerInterval);
        timeLeft = 90;
        updateTimerDisplay();
    });

    // SPEAKERS LIST MANTIĞI
    const addSpeakerBtn = document.getElementById('addSpeakerBtn');
    const speakerInput = document.getElementById('speakerInput');
    const speakersList = document.getElementById('speakersList');

    addSpeakerBtn.addEventListener('click', function () {
        const name = speakerInput.value.trim();
        if (!name) return;

        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span>`;

        const removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener('click', function () {
            li.remove();
        });

        li.appendChild(removeBtn);
        speakersList.appendChild(li);
        speakerInput.value = '';
    });

    // VOTING RESET
    const resetVotesBtn = document.getElementById('resetVotesBtn');
    resetVotesBtn.addEventListener('click', function () {
        document.getElementById('voteFavor').value = 0;
        document.getElementById('voteAgainst').value = 0;
        document.getElementById('voteAbstain').value = 0;
    });
});
