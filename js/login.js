const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    alert("Login successful!");
    localStorage.setItem("currentUser", JSON.stringify(user)); // Store user
    window.location.href = "posts.html"; // Redirect to posts page
  } else {
    alert("Invalid credentials");
  }
});
