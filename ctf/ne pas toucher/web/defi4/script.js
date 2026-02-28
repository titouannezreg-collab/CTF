$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const user = $("#username").val();
  const pass = $("#password").val();
  const result = $("#return");

  if (user === "admin" && pass === "admin") {
    sessionStorage.setItem("connected", "true");
    window.location.href = "admin/admin.html";
  } else {
    result.css("color", "red");
    result.text("Accès refusé.");
    $("#password").val(""); // vide le mot de passe
  }
});