function xorDecode(encoded, key) {
    return encoded.map(b => String.fromCharCode(b ^ key)).join('');
}

function i(event) {
    event.preventDefault();

    var l = document.log.login.value;
    var p = document.log.password.value;

    // Identifiants protégés par XOR — clé cachée quelque part ?
    const encodedUser = [0x0, 0x25, 0x2c, 0x28, 0x2f];
    const encodedPass = [0x0, 0xd, 0x16, 0x76, 0x29, 0x32, 0x2, 0xf, 0x18, 0x78];

    const KEY = 0x41; // indice : c'est une lettre majuscule connue

    if (l === xorDecode(encodedUser, KEY) && p === xorDecode(encodedPass, KEY)) {
        alert("BRAVO !!! Ce mot de passe sera votre FLAG");
    } else {
        alert("C'est pas du tout ca....");
    }
}
