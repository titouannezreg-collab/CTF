$("#bouton").on("click", function (event) {
    event.preventDefault();

    const username = $("#inputEmail").val();
    const password = $("#inputPassword").val();

    if (password === "pizzaman") { 
      if (username === "admin@mail.com"){
        alert("Bienvenue ! la solution est flag{W3bInv3st!gat0r}");
        $(".form-signin").html("Connecté avec succès.");
      }else {
        alert("Mauvais mot de passe!!");
    }
} else {
    alert("Mauvais identifiant!!");
}
  });