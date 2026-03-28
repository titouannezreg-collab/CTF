function login() {
    // Le mot de passe a été "sécurisé" en deux étapes
    // Indice : parfois il faut lire à l'envers
    const layer1 = "eXRyZXphMzIx"; // première couche
    const step1 = atob(layer1);
    const secret = step1.split('').reverse().join('');

    const pass = prompt("Entrez le mot de passe");

    if (pass === secret) {
        alert("Bravo, maintenant utilise ce mot de passe pour le flag");
    } else {
        alert("Mauvais mot de passe");
    }
}
