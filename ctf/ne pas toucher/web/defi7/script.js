const FLAG_BASE64 = 'RkxBR3tOMzBOL1IzVTM2X0g0Q0tFUn0=';
const HASH_TARGET = -1164177708;

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return hash;
}

const inputField = document.getElementById('inputField');
const output = document.getElementById('output');

inputField.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.trim();
        const hash = hashString(val);

        if (hash === HASH_TARGET) {
            output.innerHTML = 'OK.<br>FLAG: ' + atob(FLAG_BASE64);
            this.style.display = 'none';
        } else {
            output.innerHTML = 'ERREUR. CLÉ INCORRECTE.';
            this.value = '';
        }
    }
});