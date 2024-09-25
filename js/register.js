const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    alert("Username already exists");
  } else {
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html"; // Redirect to login page
  }
});
