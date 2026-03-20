// DONNÉES DES CHALLENGES
const challenges = [

    { id: 1, title: "Tutoriel : Cracking", category: "Cracking", difficulty: "Très Facile", points: 5, desc: "Script Python à analyser. <br><a href='ne pas toucher/cracking/crackme.py' download class='download-btn'>Télécharger</a> ", flag: "flag{cyber}" },
    { id: 2, title: "BASE64 Cracking", category: "Cracking", difficulty: "Facile", points: 10, desc: "Crackme à analyser.<br><a href='ne pas toucher/cracking/crackme2.py' download class='download-btn'>Télécharger</a>", flag: "flag{rot13_facile}" },

    { id: 3, title: "Un PDF qui bug", category: "Forensics", difficulty: "Facile", points: 10, desc: "Analyser le PDF.<br><a href='ne pas toucher/Forensics/Mon_Document.pdf' download class='download-btn'>Télécharger</a>", flag: "flag{Easy_Cheesy}" },

    { id: 4, title: "Tutoriel", category: "Web", difficulty: "Très Facile", points: 5, desc: "Le flag est sur cette page : <br><a href='ne pas toucher/web/defi8/Tutoriel.html' target='_blank'>Clique ici</a>", flag: "FLAG{TUt0riE1_f14g}" },
    { id: 5, title: "Connection 1", category: "Web", difficulty: "Facile", points: 10, desc: "Trouver le flag sur la page.<br><a href='ne pas toucher/web/defi1/defi1.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{CTFWEB}" },
    { id: 6, title: "Connection 2", category: "Web", difficulty: "Facile", points: 10, desc: "Contourner la connexion.<br><a href='ne pas toucher/web/defi2/defi2.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{W3bInv3st!gat0r}" },
    { id: 7, title: "La fouille sera utile", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouver le flag complet.<br><a href='ne pas toucher/web/defi3/defi3.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{illusion_regarde_pas_ce_que_tu_vois}" },
    { id: 8, title: "Contournement avec style", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouvez les bons identifiants.<br><a href='ne pas toucher/web/defi4/defi4.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{ADMIN_ACCESS_GRANTED}" },
    { id: 9, title: "Mot de passe caché", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouver le mot de passe.<br><a href='ne pas toucher/web/defi5/defi5.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{123azerty}" },
    { id: 10, title: "Login côté client", category: "Web", difficulty: "Moyen", points: 20, desc: "Bypass vérification JS.<br><a href='ne pas toucher/web/defi6/defi6.html' class='WEB-btn' target='_blank'>Accéder</a>", flag: "flag{ALW7hsCNY9}" },
    { id: 11, title: "NEON_BYPASS", category: "Web", difficulty: "Difficile", points: 30, desc: "Trouvez la clé pour déverrouiller le terminal et obtenir le flag. <br><br> <a href='ne pas toucher/web/defi7/index.html' target='_blank'>Acceder au site</a>", flag: "FLAG{N30N/R3U36_H4CKER}" },

    { id: 12, title: "Tutoriel Stéganographie", category: "Stégano", difficulty: "Facile", points: 10, desc: "Voici une superbe image.<br><a href='ne pas toucher/stegano/défi1.png' download class='download-btn'>Télécharger</a>", flag: "flag{presquecaché}" },
    { id: 13, title: "Mes textures", category: "Stégano", difficulty: "Moyen", points: 20, desc: "Analyser la vidéo.<br><a href='ne pas toucher/stegano/textures.mp4' download class='download-btn'>Télécharger</a>", flag: "flag{stegapause}" },

    { id: 14, title: "Grands serpents", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Analyser le script Python.<br><a href='ne pas toucher/cryptographie/great_snakes.py' download class='download-btn'>Télécharger</a>", flag: "crypto{z3n_0f_pyth0n}" },
    { id: 15, title: "ASCII", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Décoder le message.<br><a href='ne pas toucher/cryptographie/ASCII.txt' download class='download-btn'>Télécharger</a>", flag: "crypto{ASCII_pr1nt4bl3}" },
    { id: 16, title: "HEX", category: "Crypto", difficulty: "Difficile", points: 30, desc: "Décoder le message.<br><a href='ne pas toucher/cryptographie/HEX.txt' download class='download-btn'>Télécharger</a>", flag: "crypto{You_will_be_working_with_hex_strings_a_lot}" },
    { id: 17, title: "BASE64", category: "Crypto", difficulty: "Difficile", points: 30, desc: "Décoder le message.<br><a href='ne pas toucher/cryptographie/BASE64.txt' download class='download-btn'>Télécharger</a>", flag: "crypto{Base+64+Encoding+is+Web+Safe}" },
    { id: 18, title: "XOR", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Déchiffrement XOR.<br><a href='ne pas toucher/cryptographie/xor.txt' download class='download-btn'>Télécharger</a>", flag: "crypto{LYCEE}" }
];

let userScore = 0;
let currentChallengeId = null;
let solvedChallenges = [];

// CHARGEMENT
window.onload = () => {
    loadProgress();
    distributeChallenges();
    updateUI();
};

// SAUVEGARDE LOCALE
function saveProgress() {
    localStorage.setItem('ctf_score', userScore);
    localStorage.setItem('ctf_solved', JSON.stringify(solvedChallenges));
}

function loadProgress() {
    const sScore = localStorage.getItem('ctf_score');
    const sSolved = localStorage.getItem('ctf_solved');
    if(sScore) userScore = parseInt(sScore);
    if(sSolved) solvedChallenges = JSON.parse(sSolved);
}

function updateUI() {
    document.getElementById('user-points').innerText = userScore;
}

function resetProgress() {
    if(confirm("Voulez-vous vraiment réinitialiser votre progression ?")) {
        localStorage.clear();
        location.reload();
    }
}

// AFFICHAGE DES CARTES
function distributeChallenges() {
    const categoryMapping = {
        'Web': 'list-web', 'Crypto': 'list-crypto', 'Stégano': 'list-stegano', 'Forensics': 'list-forensics', 'Cracking': 'list-Cracking'
    };

    Object.keys(categoryMapping).forEach(cat => {
        const container = document.getElementById(categoryMapping[cat]);
        if(container) {
            container.innerHTML = challenges.filter(c => c.category === cat).map(ch => {
                const isSolved = solvedChallenges.includes(ch.id) ? 'solved' : '';
                return `
                    <div class="challenge-card ${isSolved}" id="card-${ch.id}" onclick="openSidebar(${ch.id})">
                        <div class="card-diff ${getDiffClass(ch.difficulty)}">${ch.difficulty}</div>
                        <h3>${ch.title}</h3>
                        <p>${ch.points} pts</p>
                    </div>
                `;
            }).join('');
        }
    });
}

function getDiffClass(diff) {
    const map = {"Très Facile": "v-easy", "Facile": "easy", "Moyen": "medium", "Difficile": "hard"};
    return map[diff] || "easy";
}

function openSidebar(id) {
    const ch = challenges.find(c => c.id === id);
    currentChallengeId = id;
    document.getElementById('side-title').innerText = ch.title;
    document.getElementById('side-desc').innerHTML = ch.desc;
    document.getElementById('side-category').innerText = ch.category;
    document.getElementById('side-points').innerText = ch.points;
    const diffEl = document.getElementById('side-diff');
    diffEl.innerText = ch.difficulty;
    diffEl.className = "difficulty-label " + getDiffClass(ch.difficulty);
    document.getElementById('challenge-sidebar').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.getElementById('feedback').innerText = "";
    document.getElementById('flag-input').value = "";
}

function closeSidebar() {
    document.getElementById('challenge-sidebar').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
}

function checkFlag() {
    const input = document.getElementById('flag-input').value.trim();
    const ch = challenges.find(c => c.id === currentChallengeId);
    const fb = document.getElementById('feedback');

    if (input === ch.flag) {
        if (!solvedChallenges.includes(ch.id)) {
            userScore += ch.points;
            solvedChallenges.push(ch.id);
            updateUI();
            saveProgress();
            document.getElementById(`card-${ch.id}`).classList.add('solved');
        }
        fb.innerText = "ACCÈS ACCORDÉ !"; fb.style.color = "var(--very-easy)";
        setTimeout(closeSidebar, 1200);
    } else {
        fb.innerText = "ACCÈS REFUSÉ..."; fb.style.color = "var(--hard)";
    }
}

// ===============================
// NAVIGATION PAR CATÉGORIE
// ===============================

let currentSection = "all";

function showSection(sectionId) {
    const sections = document.querySelectorAll('.category-block');

    if (sectionId === "all") {
        sections.forEach(section => { section.style.display = "block"; });
        currentSection = "all";
        return;
    }

    if (currentSection === sectionId) {
        sections.forEach(section => { section.style.display = "block"; });
        currentSection = "all";
        return;
    }

    sections.forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
    currentSection = sectionId;
}