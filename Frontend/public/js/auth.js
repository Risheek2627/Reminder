const BASE_URL = "http://localhost:5000";

// Register
document
  .getElementById("registerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const res = await fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "login.html";
    } else {
      showAlert(data.message || "Registration failed");
    }
  });

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  const res = await fetch("/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    showAlert(data.message || "Invalid credentials");
  }
});

function showAlert(msg) {
  document.getElementById("alertBox").innerHTML = `
    <div class="alert alert-danger">${msg}</div>
  `;
}
