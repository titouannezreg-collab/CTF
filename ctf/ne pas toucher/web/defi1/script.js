$("#bouton").on("click", function (event) {
  event.preventDefault();

  const password = $("#inputPassword").val();
  const result = $("#return");

  // Mot de passe encodé en ASCII — à toi de le décoder
  const encoded = [102, 108, 97, 103, 123, 67, 84, 70, 87, 69, 66, 125];
  const correctPassword = encoded.map(c => String.fromCharCode(c)).join('');

  if (password === correctPassword) {
    result.css("color", "green");
    result.text("Connecté avec succès !");
    $(".form-signin form").hide();
  } else {
    result.css("color", "red");
    result.text("Mot de passe incorrect.");
  }
});
