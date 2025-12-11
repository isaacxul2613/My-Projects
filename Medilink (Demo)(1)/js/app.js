document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const seedBtn = document.getElementById("seedBtn");

  seedBtn.addEventListener("click", () => {
    MediLinkDB.reset();
    alert("Demo data has been reset");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const user = MediLinkDB.authenticate(email, password, role);

    if (user) {
      localStorage.setItem("activeUser", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please check and try again.");
    }
  });
});
