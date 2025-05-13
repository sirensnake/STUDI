// Variables globales
let questions = [];
let tempsRestant = 600; // 10 minutes
let timerInterval;

// Charger les questions
document.addEventListener('DOMContentLoaded', () => {
  // Questions originales
  questions = [
    { q: "Que signifie ITIL ?", r: "b", c: ["International Technology Infrastructure Language", "Information Technology Infrastructure Library", "Internet Transport Integration Layer"] },
    { q: "Quel est le but principal d'un service IT selon ITIL ?", r: "b", c: ["Fournir des équipements", "Créer de la valeur sans que l'utilisateur gère les coûts/risques", "Vendre des produits"] },
    { q: "Combien de dimensions identifie ITIL 4 ?", r: "b", c: ["3", "4", "5"] },
    { q: "Laquelle est une pratique ITIL ?", r: "b", c: ["Gestion des émotions", "Gestion des incidents", "Gestion des congés"] },
    { q: "Quel est le rôle du Service Desk ?", r: "c", c: ["Gérer les ventes", "Gérer le personnel", "Point de contact unique pour les utilisateurs"] },
    { q: "La chaîne de valeur ITIL commence par :", r: "a", c: ["Planifier", "Construire", "Engager"] },
    { q: "ITIL considère que la valeur est :", r: "c", c: ["Créée par le fournisseur seul", "Indépendante des résultats", "Co-créée avec le client"] },
    { q: "Une interruption de service est appelée :", r: "a", c: ["Incident", "Problème", "Erreur"] },
    { q: "Le modèle d'amélioration continue comporte :", r: "b", c: ["3 étapes", "7 étapes", "9 étapes"] },
    { q: "Un problème est :", r: "c", c: ["Un changement", "Un bug logiciel", "La cause racine d'un ou plusieurs incidents"] },
    { q: "La dimension 'Flux de valeur & processus' concerne :", r: "a", c: ["Les activités coordonnées", "Le matériel utilisé", "Les contrats fournisseurs"] },
    { q: "Combien de pratiques ITIL sont listées dans ITIL 4 ?", r: "c", c: ["12", "21", "34"] },
    { q: "L'objectif de la gestion des changements est :", r: "b", c: ["Bloquer tout changement", "Maximiser la réussite des changements", "Éviter les changements"] },
    { q: "Le système de valeur des services (SVS) comprend :", r: "a", c: ["Chaîne de valeur, principes, pratiques, gouvernance", "Réseaux et systèmes", "Plans de formation"] },
    { q: "L'activité ITIL 'Engage' signifie :", r: "c", c: ["Analyser les performances", "Livrer les services", "Interagir avec les parties prenantes"] },
    { q: "Quel principe guide recommande de réutiliser ce qui fonctionne ?", r: "a", c: ["Commencer là où vous êtes", "Progresser par itération", "Penser et travailler de manière holistique"] },
    { q: "Un produit ITIL comprend :", r: "b", c: ["Un serveur uniquement", "Ressources configurées pour créer de la valeur", "Un contrat"] },
    { q: "Une demande de service est :", r: "c", c: ["Un incident", "Un problème", "Une requête utilisateur standard"] },
    { q: "Laquelle n'est PAS une des 4 dimensions ?", r: "a", c: ["Dimension stratégique", "Information & technologie", "Partenaires & fournisseurs"] },
    { q: "Un exemple de flux de valeur est :", r: "c", c: ["Un rôle métier", "Un type de contrat", "Le traitement d'une demande utilisateur"] }
  ];

  // Explications pour chaque question
  const explanations = [
    "ITIL signifie Information Technology Infrastructure Library.",
    "Un service IT vise à créer de la valeur sans que le client gère les coûts/risques.",
    "ITIL 4 repose sur 4 dimensions fondamentales.",
    "La gestion des incidents est une pratique ITIL essentielle.",
    "Le Service Desk est le point de contact unique entre IT et utilisateurs.",
    "L'activité initiale de la chaîne de valeur est « Planifier ».",
    "La valeur est co-créée avec le client.",
    "Une interruption est un incident.",
    "Le modèle d'amélioration continue comporte 7 étapes.",
    "Un problème est la cause racine d'un ou plusieurs incidents.",
    "La dimension « flux de valeur & processus » traite des activités coordonnées.",
    "ITIL 4 recense 34 pratiques.",
    "La gestion des changements maximise la réussite des changements.",
    "Le SVS regroupe chaîne de valeur, principes, pratiques, gouvernance.",
    "« Engage » signifie interagir avec les parties prenantes.",
    "Le principe « Commencer là où vous êtes » recommande la réutilisation.",
    "Un produit ITIL est une ressource configurée pour créer de la valeur.",
    "Une demande de service est une requête standard.",
    "Il n'existe pas de dimension « stratégique » dans ITIL 4.",
    "Le traitement d'une demande utilisateur est un exemple de flux de valeur."
  ];

  // Générer le formulaire de quiz
  genererQuiz();

  // Activer le bouton mélanger si présent
  const btnMelanger = document.getElementById('btnMelanger');
  if (btnMelanger) {
    btnMelanger.addEventListener('click', () => {
      melangerQuestions();
      genererQuiz();
    });
  }

  // Activer le bouton timer si présent
  const btnTimer = document.getElementById('btnTimer');
  if (btnTimer) {
    btnTimer.addEventListener('click', demarrerTimer);
  }
});

// Fonction pour générer le HTML du quiz
function genererQuiz() {
  const form = document.getElementById("quizForm");
  if (!form) return;

  form.innerHTML = ""; // Vider le formulaire
  
  questions.forEach((q, i) => {
    const id = i + 1;
    let html = `<div class="question">
      <h2>${id}. ${q.q}</h2>`;
    q.c.forEach((c, j) => {
      html += `<label><input type="radio" name="q${id}" value="${String.fromCharCode(97 + j)}"> ${c}</label>`;
    });
    html += `<div class="feedback" id="f${id}"></div>
    </div>`;
    form.innerHTML += html;
  });
}

// Fonction pour mélanger les questions
function melangerQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

// Fonction pour démarrer le timer
function demarrerTimer() {
  // Réinitialiser un timer existant
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  // Réinitialiser le temps
  tempsRestant = 600; // 10 minutes
  
  // Mettre à jour l'affichage du timer
  const timerElement = document.getElementById('timer');
  if (!timerElement) return;
  
  timerElement.style.display = 'block';
  
  // Démarrer le décompte
  timerInterval = setInterval(() => {
    tempsRestant--;
    const minutes = Math.floor(tempsRestant / 60);
    const secondes = tempsRestant % 60;
    timerElement.textContent = `⏱️ Temps restant: ${minutes}:${secondes < 10 ? '0' : ''}${secondes}`;
    
    if (tempsRestant <= 0) {
      clearInterval(timerInterval);
      corrigerQuiz(); // Correction automatique
    }
  }, 1000);
}

// Fonction pour corriger le quiz
function corrigerQuiz() {
  // Arrêter le timer si actif
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  const explanations = [
    "ITIL signifie Information Technology Infrastructure Library.",
    "Un service IT vise à créer de la valeur sans que le client gère les coûts/risques.",
    "ITIL 4 repose sur 4 dimensions fondamentales.",
    "La gestion des incidents est une pratique ITIL essentielle.",
    "Le Service Desk est le point de contact unique entre IT et utilisateurs.",
    "L'activité initiale de la chaîne de valeur est « Planifier ».",
    "La valeur est co-créée avec le client.",
    "Une interruption est un incident.",
    "Le modèle d'amélioration continue comporte 7 étapes.",
    "Un problème est la cause racine d'un ou plusieurs incidents.",
    "La dimension « flux de valeur & processus » traite des activités coordonnées.",
    "ITIL 4 recense 34 pratiques.",
    "La gestion des changements maximise la réussite des changements.",
    "Le SVS regroupe chaîne de valeur, principes, pratiques, gouvernance.",
    "« Engage » signifie interagir avec les parties prenantes.",
    "Le principe « Commencer là où vous êtes » recommande la réutilisation.",
    "Un produit ITIL est une ressource configurée pour créer de la valeur.",
    "Une demande de service est une requête standard.",
    "Il n'existe pas de dimension « stratégique » dans ITIL 4.",
    "Le traitement d'une demande utilisateur est un exemple de flux de valeur."
  ];

  let score = 0;
  
  // Parcourir chaque question et vérifier la réponse
  questions.forEach((q, i) => {
    const id = i + 1;
    const selected = document.querySelector(`input[name=q${id}]:checked`);
    const feedback = document.getElementById(`f${id}`);
    const questionDiv = document.querySelector(`.question:nth-child(${id})`);
    
    if (selected && selected.value === q.r) {
      feedback.innerHTML = '<span class="correct">✅ Bonne réponse</span>';
      // Ajouter une animation pour les bonnes réponses
      questionDiv.classList.add('correct-animation');
      score++;
    } else {
      feedback.innerHTML = '<span class="incorrect">❌ Mauvaise réponse</span>';
      // Ajouter l'indication de la bonne réponse
      const correctAnswerIndex = q.r.charCodeAt(0) - 97;
      feedback.innerHTML += `<span style="display:block;margin-top:5px;">La bonne réponse était : ${q.c[correctAnswerIndex]}</span>`;
    }
  });
  
  // Afficher le score final
  const scoreElement = document.getElementById("score");
  if (scoreElement) {
    scoreElement.innerHTML = `🎯 Score final : ${score}/${questions.length}`;
  }
  
  // Mettre à jour et afficher la barre de progression
  const progressContainer = document.getElementById("progress-container");
  const progressBar = document.getElementById("progress-bar");
  
  if (progressContainer && progressBar) {
    const progressPercentage = Math.round((score / questions.length) * 100);
    
    progressContainer.style.display = "block";
    progressBar.style.width = `${progressPercentage}%`;
    progressBar.textContent = `${progressPercentage}%`;
    
    // Définir la couleur de la barre en fonction du score
    if (progressPercentage < 50) {
      progressBar.style.background = "linear-gradient(90deg, #e74c3c, #c0392b)";
    } else if (progressPercentage < 75) {
      progressBar.style.background = "linear-gradient(90deg, #f39c12, #d35400)";
    } else {
      progressBar.style.background = "linear-gradient(90deg, #2ecc71, #27ae60)";
    }
  }
  
  // Générer les explications
  const list = document.getElementById("explanationList");
  if (list) {
    list.innerHTML = ""; // Vider la liste avant d'ajouter les nouvelles explications
    
    explanations.forEach((exp, i) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>Q${i+1}:</strong> ${exp}`;
      list.appendChild(li);
    });
    
    // Afficher la section des explications
    const explicationsSection = document.getElementById("explications");
    if (explicationsSection) {
      explicationsSection.style.display = "block";
    }
  }
  
  // Sauvegarder le score dans localStorage
  sauvegarderScore(score);
  
  // Afficher l'historique des scores
  afficherHistorique();
}

// Fonction pour sauvegarder les scores
function sauvegarderScore(score) {
  const historique = JSON.parse(localStorage.getItem('quizScores') || '[]');
  historique.push({
    date: new Date().toISOString(),
    score: score,
    total: questions.length
  });
  localStorage.setItem('quizScores', JSON.stringify(historique));
}

// Fonction pour afficher l'historique des scores
function afficherHistorique() {
  const historiqueElement = document.getElementById('historiqueList');
  const historiqueSection = document.getElementById('historique');
  
  if (!historiqueElement || !historiqueSection) return;
  
  const historique = JSON.parse(localStorage.getItem('quizScores') || '[]');
  
  if (historique.length === 0) return;
  
  historiqueElement.innerHTML = "";
  
  // Trier l'historique du plus récent au plus ancien
  historique.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Limiter à 5 dernières entrées
  const recentHistorique = historique.slice(0, 5);
  
  recentHistorique.forEach(entry => {
    const date = new Date(entry.date);
    const formattedDate = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
    const percentage = Math.round((entry.score / entry.total) * 100);
    
    const li = document.createElement('li');
    li.innerHTML = `<strong>${formattedDate}</strong>: ${entry.score}/${entry.total} (${percentage}%)`;
    historiqueElement.appendChild(li);
  });
  
  historiqueSection.style.display = "block";
}