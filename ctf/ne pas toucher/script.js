// ===============================
// HASH UTIL (SHA-256)
// ===============================
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===============================
// CHALLENGES (SANS FLAGS EN CLAIR)
// ===============================
const challenges = [

    { id: 1, title: "Tutoriel : Cracking", category: "Cracking", difficulty: "Très Facile", points: 5, desc: "Script Python à analyser.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 2, title: "BASE64 Cracking", category: "Cracking", difficulty: "Facile", points: 10, desc: "Crackme à analyser.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 3, title: "Un PDF qui bug", category: "Forensics", difficulty: "Facile", points: 10, desc: "Analyser le PDF.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 4, title: "Tutoriel", category: "Web", difficulty: "Très Facile", points: 5, desc: "Le flag est sur cette page.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 5, title: "Connection 1", category: "Web", difficulty: "Facile", points: 10, desc: "Trouver le flag sur la page.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 6, title: "Connection 2", category: "Web", difficulty: "Facile", points: 10, desc: "Contourner la connexion.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 7, title: "La fouille sera utile", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouver le flag complet.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 8, title: "Contournement avec style", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouvez les bons identifiants.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 9, title: "Mot de passe caché", category: "Web", difficulty: "Moyen", points: 20, desc: "Trouver le mot de passe.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 10, title: "Login côté client", category: "Web", difficulty: "Moyen", points: 20, desc: "Bypass vérification JS.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 11, title: "NEON_BYPASS", category: "Web", difficulty: "Difficile", points: 30, desc: "Trouvez la clé pour déverrouiller le terminal.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 12, title: "Tutoriel Stéganographie", category: "Stégano", difficulty: "Facile", points: 10, desc: "Analyser l'image.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 13, title: "Mes textures", category: "Stégano", difficulty: "Moyen", points: 20, desc: "Analyser la vidéo.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 14, title: "Grands serpents", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Analyser le script Python.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 15, title: "ASCII", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Décoder le message.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 16, title: "HEX", category: "Crypto", difficulty: "Difficile", points: 30, desc: "Décoder le message.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 17, title: "BASE64", category: "Crypto", difficulty: "Difficile", points: 30, desc: "Décoder le message.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },

    { id: 18, title: "XOR", category: "Crypto", difficulty: "Moyen", points: 20, desc: "Déchiffrement XOR.", flagHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" }
];

// ===============================
// STATE
// ===============================
let userScore = 0;
let currentChallengeId = null;
let solvedChallenges = [];

// ===============================
// LOAD / SAVE
// ===============================
window.onload = () => {
    loadProgress();
    distributeChallenges();
    updateUI();
};

function saveProgress() {
    localStorage.setItem('ctf_score', userScore);
    localStorage.setItem('ctf_solved', JSON.stringify(solvedChallenges));
}

function loadProgress() {
    const sScore = localStorage.getItem('ctf_score');
    const sSolved = localStorage.getItem('ctf_solved');
    if (sScore) userScore = parseInt(sScore);
    if (sSolved) solvedChallenges = JSON.parse(sSolved);
}

function updateUI() {
    document.getElementById('user-points').innerText = userScore;
}

function resetProgress() {
    if (confirm("Voulez-vous vraiment réinitialiser votre progression ?")) {
        localStorage.clear();
        location.reload();
    }
}

// ===============================
// AFFICHAGE
// ===============================
function distributeChallenges() {
    const categoryMapping = {
        'Web': 'list-web',
        'Crypto': 'list-crypto',
        'Stégano': 'list-stegano',
        'Forensics': 'list-forensics',
        'Cracking': 'list-Cracking'
    };

    Object.keys(categoryMapping).forEach(cat => {
        const container = document.getElementById(categoryMapping[cat]);

        if (container) {
            container.innerHTML = challenges
                .filter(c => c.category === cat)
                .map(ch => {
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
    const map = {
        "Très Facile": "v-easy",
        "Facile": "easy",
        "Moyen": "medium",
        "Difficile": "hard"
    };
    return map[diff] || "easy";
}

// ===============================
// SIDEBAR
// ===============================
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

// ===============================
// FLAG CHECK (SHA-256)
// ===============================
async function checkFlag() {
    const input = document.getElementById('flag-input').value.trim();
    const ch = challenges.find(c => c.id === currentChallengeId);
    const fb = document.getElementById('feedback');

    const hashedInput = await sha256(input);

    if (hashedInput === ch.flagHash) {

        if (!solvedChallenges.includes(ch.id)) {
            userScore += ch.points;
            solvedChallenges.push(ch.id);
            updateUI();
            saveProgress();
            document.getElementById(`card-${ch.id}`).classList.add('solved');
        }

        fb.innerText = "ACCÈS ACCORDÉ !";
        fb.style.color = "var(--very-easy)";

        setTimeout(closeSidebar, 1200);

    } else {
        fb.innerText = "ACCÈS REFUSÉ...";
        fb.style.color = "var(--hard)";
    }
}

// ===============================
// NAVIGATION
// ===============================
let currentSection = "all";

function showSection(sectionId) {
    const sections = document.querySelectorAll('.category-block');

    if (sectionId === "all") {
        sections.forEach(s => s.style.display = "block");
        currentSection = "all";
        return;
    }

    if (currentSection === sectionId) {
        sections.forEach(s => s.style.display = "block");
        currentSection = "all";
        return;
    }

    sections.forEach(s => {
        s.style.display = s.id === sectionId ? "block" : "none";
    });

    currentSection = sectionId;
}
