function i(event) {
      event.preventDefault();

      var l = document.log.login.value;
      var p = document.log.password.value;

      if (l === "Admin" && p === "ALW7hsCNY9") {
        alert("BRAVO !!! Ce mot de passe sera votre FLAG");
      } else {
        alert("C'est pas du tout ca....");
      }
    }