// Le terminal est chiffré. La clé n'est pas ici.
// Cherche ailleurs dans la page...

const ENCRYPTED_FLAG = [0x8, 0x9, 0xe, 0x9, 0x24, 0x5, 0x0, 0x69, 0x0, 0x6a,
                         0x1d, 0x7d, 0xa, 0x78, 0x5, 0x6, 0x6, 0x71, 0xc, 0x5,
                         0x1a, 0x19, 0x4e];

function xorDecrypt(data, key) {
    return data.map((b, i) => String.fromCharCode(b ^ key.charCodeAt(i % key.length))).join('');
}

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

const KEY_HASH = 1945105960; // hash de la clé correcte

const inputField = document.getElementById('inputField');
const output = document.getElementById('output');

inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.trim();

        if (hashString(val) === KEY_HASH) {
            const flag = xorDecrypt(ENCRYPTED_FLAG, val);
            output.innerHTML = 'ACCÈS AUTORISÉ.<br>FLAG: ' + flag;
            this.style.display = 'none';
        } else {
            output.innerHTML = 'ERREUR. CLÉ INCORRECTE.<br>TENTATIVE ENREGISTRÉE.';
            this.value = '';
        }
    }
});
