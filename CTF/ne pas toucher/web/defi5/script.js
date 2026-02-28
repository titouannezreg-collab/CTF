function login() {
          const secret = "MTIzYXplcnR5"; 
          const pass = prompt("Entrez le mot de passe");

         if (pass === atob(secret)) {
              alert("Bravo, maintenant utilise ce mot de passe pour le flag");
          } else {
              alert("Mauvais mot de passe");
          }
        }