const groups = document.querySelectorAll(".pos-eye");
const passwordInput = document.getElementById("Password");
const CallsignInput = document.getElementById("Callsign");
const emailInput = document.getElementById("email");
const confirmInput = document.getElementById("confirm-password");
const checkbox = document.getElementById("checkbox");

const strengthBar = document.querySelector(".strength-bar");
const callsign = document.getElementById("callsign-status");
const emailStatus = document.getElementById("email-status");
const passwordStatus = document.getElementById("passwordStatus");
const confirmStatus = document.getElementById("confirm-status");
const termsStatus = document.getElementById("terms-status");

// ---------- زرار العين ----------
groups.forEach((group) => {
    const input = group.querySelector("input");
    const eye = group.querySelector(".eye");
    const eyeClose = group.querySelector(".eye-close");

    eye.addEventListener("click", function () {
        input.type = "text";
        eyeClose.style.display = "block";
        eye.style.display = "none";
    });
    eyeClose.addEventListener("click", function () {
        input.type = "password";
        eyeClose.style.display = "none";
        eye.style.display = "block";
    });
});

// ---------- Callsign ----------
CallsignInput.addEventListener("input", function () {
    const value = CallsignInput.value;

    if (value === "") {
        CallsignInput.classList.remove("invalid");
        callsign.textContent = "Pending";
        callsign.classList.remove("ok");
    } else if (!/^[A-Za-z0-9_-]{3,20}$/.test(value)) {
        CallsignInput.classList.add("invalid");
        callsign.textContent = "Pending";
        callsign.classList.remove("ok");
    } else {
        CallsignInput.classList.remove("invalid");
        callsign.textContent = "Ok";
        callsign.classList.add("ok");
    }
});

// ---------- Email ----------
emailInput.addEventListener("input", function () {
    const value = emailInput.value;

    if (value === "") {
        emailInput.classList.remove("invalid");
        emailStatus.textContent = "Pending";
        emailStatus.classList.remove("ok");
    } else if (!emailInput.validity.valid) {
        emailInput.classList.add("invalid");
        emailStatus.textContent = "Pending";
        emailStatus.classList.remove("ok");
    } else {
        emailInput.classList.remove("invalid");
        emailStatus.textContent = "Ok";
        emailStatus.classList.add("ok");
    }
});

// ---------- Password ----------
passwordInput.addEventListener("input", function () {
    const value = passwordInput.value;

    if (value === "") {
        strengthBar.className = "strength-bar";
        passwordStatus.textContent = "Pending";
        passwordStatus.classList.remove("ok");
        return;
    }

    let score = 0;
    if (value.length >= 8) score++;
    if (/\d/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    let level;
    if (score <= 1) level = "weak";
    else if (score === 2) level = "medium";
    else if (score === 3) level = "good";
    else level = "strong";

    strengthBar.className = "strength-bar " + level;

    if (score === 4) {
        passwordStatus.textContent = "Ok";
        passwordStatus.classList.add("ok");
    } else {
        passwordStatus.textContent = "Pending";
        passwordStatus.classList.remove("ok");
    }
});

// ---------- Confirm ----------
function checkConfirm() {
    const value = confirmInput.value;

    if (value === "") {
        confirmInput.classList.remove("invalid");
        confirmStatus.textContent = "Pending";
        confirmStatus.classList.remove("ok");
    } else if (value !== passwordInput.value) {
        confirmInput.classList.add("invalid");
        confirmStatus.textContent = "Pending";
        confirmStatus.classList.remove("ok");
    } else {
        confirmInput.classList.remove("invalid");
        confirmStatus.textContent = "Ok";
        confirmStatus.classList.add("ok");
    }
}

confirmInput.addEventListener("input", checkConfirm);
passwordInput.addEventListener("input", checkConfirm);

// ---------- Terms ----------
checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        termsStatus.textContent = "Ok";
        termsStatus.classList.add("ok");
    } else {
        termsStatus.textContent = "Required";
        termsStatus.classList.remove("ok");
    }
    
});
const readyCount = document.getElementById("ready-count");
const operatorName = document.getElementById("operator-name");
const form = document.querySelector("form");

function updateCounter() {
    const count = document.querySelectorAll(".status-value.ok").length;
    readyCount.textContent = `${count}/5 ready`;

    if (count === 5) {
        operatorName.textContent = "Verified";
        operatorName.classList.add("ok");
    } else {
        operatorName.textContent = "Unassigned";
        operatorName.classList.remove("ok");
    }
}

form.addEventListener("input", updateCounter);
form.addEventListener("change", updateCounter);