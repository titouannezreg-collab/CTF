$("#bouton").on("click", function (event) {
      event.preventDefault();

      const password = $("#inputPassword").val();
      const result = $("#return");

      const part1 = "flag{CTF";
      const part2 = "WEB}";
      const correctPassword = part1 + part2;

      if (password === correctPassword) {
        result.css("color", "green");
        result.text("Connecté avec succès !");
        $(".form-signin form").hide();
      } else {
        result.css("color", "red");
        result.text("Mot de passe incorrect.");
      }
    });