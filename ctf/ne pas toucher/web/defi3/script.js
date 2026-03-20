document.getElementById("btn").addEventListener("click", () => {
    alert("Votre avenir est déjà écrit ⭐");
});

// Le destin ne se lit pas en surface...
const _x = [95, 112, 97, 115, 95].map(c => String.fromCharCode(c)).join('');
const _y = btoa("ce_que_");
window.__fate = { part2: _x, part3: _y };
