// login.js

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Predefined users
    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "comercial", password: "comercial123", role: "comercial" },
        { username: "asesor", password: "asesor123", role: "asesor" }
    ];

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Validate credentials
        const user = users.find(
            (u) => u.username === username && u.password === password
        );

        if (user) {
            // Store user role in localStorage
            localStorage.setItem("userRole", user.role);

            // Redirect to index.html
            window.location.href = "index.html";
        } else {
            alert("Credenciales inválidas. Intente nuevamente.");
        }
    });
});
