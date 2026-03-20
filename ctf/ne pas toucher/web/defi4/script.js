$("#loginForm").on("submit", function (e) {
  e.preventDefault();

  const user = $("#username").val();
  const pass = $("#password").val();
  const result = $("#return");

  // Identifiants encodés — cherche bien
  const validUser = atob("YWRtaW4=");
  const validPass = [115, 51, 99, 114, 51, 116, 33].map(c => String.fromCharCode(c)).join('');
  const token = "4dm1n_t0k3n_9f2x";

  if (user === validUser && pass === validPass) {
    sessionStorage.setItem("connected", "true");
    sessionStorage.setItem("token", token);
    window.location.href = "admin/admin.html";
  } else {
    result.css("color", "red");
    result.text("Accès refusé.");
    $("#password").val("");
  }
});
