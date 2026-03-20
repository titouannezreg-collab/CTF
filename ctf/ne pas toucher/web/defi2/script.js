function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

$("#bouton").on("click", function (event) {
  event.preventDefault();

  const username = $("#inputEmail").val();
  const password = $("#inputPassword").val();

  // Email vérifié par hash, mot de passe encodé en Base64
  const expectedHash = 1570933912;
  const encodedPass = "cGl6emFtYW4=";

  if (hashString(username) === expectedHash) {
    if (password === atob(encodedPass)) {
      alert("Bienvenue ! la solution est flag{W3bInv3st!gat0r}");
      $(".form-signin").html("Connecté avec succès.");
    } else {
      alert("Mauvais mot de passe !");
    }
  } else {
    alert("Mauvais identifiant !");
  }
});
