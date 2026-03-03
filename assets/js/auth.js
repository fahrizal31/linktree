// =========================
// AUTH SYSTEM
// =========================

const VALID_USERNAME = "admin";
const VALID_PASSWORD = "admin123";

// Login
function login(username, password) {
    const errorMessage = document.getElementById("errorMessage");

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        errorMessage.classList.remove("hidden");
    }
}

// Cek login
function checkLogin() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
        window.location.href = "login.html";
    }
}

// Logout redirect ke index
function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}