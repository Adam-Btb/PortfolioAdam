// Contenu réel d'Adam, partagé par toutes les applications d'AdamOS.

export const EMAIL = 'adam.bettayeb26@gmail.com'

export const PROJECTS = [
  {
    id: 'motus',
    file: 'motus.exe',
    title: 'Motus',
    category: 'Full stack · PHP',
    subtitle: 'Jeu web en PHP orienté objet & MVC, sans framework',
    description:
      "Un jeu web complet, sécurisé et jouable, développé sans framework en PHP orienté objet et architecture MVC stricte. La grille est générée côté serveur avec la librairie GD pour empêcher toute triche, avec sessions sécurisées et requêtes préparées via PDO.",
    images: ['/projets/motus-1.webp', '/projets/motus-2.webp', '/projets/motus-3.webp'],
    stack: ['PHP OOP', 'MVC', 'MySQL', 'GD Library', 'HTML/CSS'],
    layers: { front: 'HTML/CSS', back: 'PHP POO/MVC', bdd: 'MySQL · PDO' },
    link: { label: 'Jouer en ligne', href: 'https://motusdragonballz.gamer.gd/' },
  },
  {
    id: 'bravery',
    file: 'bravery-quest.exe',
    title: 'Bravery Quest',
    category: 'Full stack · temps réel · équipe',
    subtitle: 'Jeu web multijoueur en temps réel',
    description:
      "Un jeu web réalisé en équipe, jouable directement dans le navigateur : rendu HTML5 Canvas en JavaScript et parties en temps réel (solo ou duo) via Socket.IO, avec un serveur Node.js hébergé sur Render.",
    role: "J'ai dessiné la carte et les PNJ, et codé les mécaniques de soin et de combat.",
    // Serveur Render gratuit : mis en veille sans visiteur, il met ~20 s à redémarrer.
    linkNote: 'Hébergé gratuitement sur Render : le premier chargement peut prendre une vingtaine de secondes, le temps que le serveur démarre.',
    images: ['/projets/bravery-1.webp', '/projets/bravery-2.webp', '/projets/bravery-3.webp'],
    stack: ['JavaScript', 'Canvas', 'Node.js', 'Socket.IO'],
    layers: { front: 'Canvas JS', back: 'Node.js · Socket.IO' },
    link: { label: 'Jouer en ligne', href: 'https://sae402.onrender.com/' },
  },
  {
    id: 'dataviz',
    file: 'dataviz-sae303.html',
    title: 'La donnée mise en image',
    category: 'Dataviz · D3.js',
    subtitle: 'Dashboard interactif avec D3.js · SAE 303',
    description:
      "Application interactive pour explorer l'opinion des Français sur le changement climatique, à partir du Baromètre ADEME. Graphiques dynamiques et carte SVG sur-mesure construits avec D3.js : barres, camembert, courbes, histogramme et nuages de points.",
    images: ['/projets/303-1.webp', '/projets/303-2.webp', '/projets/303-3.webp'],
    stack: ['JavaScript', 'D3.js', 'SVG', 'HTML/CSS', 'Data'],
    layers: { front: 'D3.js · SVG' },
    link: { label: 'Voir le projet', href: '/SAE303/index.html' },
  },
  {
    id: 'devfront',
    file: 'devfront/',
    title: 'DevFront',
    category: 'Front-end',
    subtitle: 'Une série de mini-projets HTML, CSS & JS',
    description:
      "Un ensemble de mini-projets réalisés en cours de développement front-end, en HTML, CSS et JavaScript : autant d'exercices pour travailler l'intégration, la mise en page et les interactions.",
    images: ['/projets/devfront1.webp', '/projets/devfront2.webp', '/projets/devfront3.webp'],
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    layers: { front: 'HTML/CSS/JS' },
    link: { label: 'Voir le projet', href: '/devfront/index.html' },
  },
  {
    id: 'portfolio',
    file: 'adamos.jsx',
    title: 'AdamOS (ce portfolio)',
    category: 'React',
    subtitle: 'React, Tailwind CSS & Framer Motion',
    description:
      "Le système que vous utilisez : un gestionnaire de fenêtres écrit en React (ouverture, déplacement, réduction, focus clavier), avec Tailwind CSS et Framer Motion, et une version mobile façon écran d'accueil.",
    images: ['/projets/portfolio-1.webp', '/projets/portfolio-2.webp', '/projets/portfolio-3.webp'],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    layers: { front: 'React' },
    link: { label: 'Code source sur GitHub', href: 'https://github.com/Adam-Btb/PortfolioAdam' },
  },
]

export const TIERS = [
  { id: 'front', short: 'F', label: 'Interface' },
  { id: 'back', short: 'B', label: 'Serveur' },
  { id: 'bdd', short: 'D', label: 'Base de données' },
]

export const SPECS = [
  { k: 'Interface', v: 'React · JavaScript · HTML/CSS · Canvas' },
  { k: 'Serveur', v: 'PHP (POO / MVC) · Node.js · Socket.IO · C#' },
  { k: 'Base de données', v: 'MySQL · requêtes préparées PDO' },
  { k: 'Data & IA', v: 'D3.js · analyse de KPI · Claude · Claude Code · ChatGPT · Gemini · Nano Banana' },
  { k: 'Outils', v: 'GitHub · Render · Figma · Suite Adobe · Unity · PowerPoint' },
  { k: 'Formation', v: 'BUT MMI, 3ᵉ année · IUT de Bobigny (Sorbonne Paris Nord)' },
  { k: 'Savoir-être', v: "Travail d'équipe · adaptabilité · persévérance · communication" },
]

export const PROOFS = [
  { k: 'PHP · MVC', v: 'Motus, en POO et architecture MVC stricte, sans framework.' },
  { k: 'SQL', v: 'MySQL et requêtes préparées PDO dans Motus.' },
  { k: 'Node.js', v: 'Le serveur temps réel de Bravery Quest (Socket.IO), déployé sur Render.' },
  { k: 'React', v: 'Ce portfolio : un gestionnaire de fenêtres complet.' },
  { k: 'D3.js', v: 'La SAE 303 : graphiques et carte SVG sur le Baromètre ADEME.' },
  { k: 'IA', v: "Chez Air Liquide, j'ai conçu des modules d'accompagnement pour aider les équipes à adopter l'IA." },
  { k: 'KPI', v: 'Analyse de KPI et dashboards pendant ce même stage.' },
]

export const JOURNAL = [
  { date: '2019-2021', status: 'OK', text: "Bac STI2D, option Systèmes d'Information et Numérique, mention Bien." },
  { date: '2022-2023', status: 'OK', text: "BTS MCO en alternance chez Bouygues Telecom : analyse des besoins clients, vente de solutions numériques." },
  { date: '2023-12', status: 'OK', text: 'Éducateur spécialisé aux Enfants inadaptés de Noisy-le-Sec (déc. 2023 à janv. 2024).' },
  { date: '2024', status: 'OK', text: "Missions d'intérim en logistique." },
  { date: '2024-2027', status: 'EN COURS', text: "BUT MMI à l'IUT de Bobigny (Sorbonne Paris Nord), parcours développement web et dispositifs interactifs." },
  { date: '2026-04', status: 'OK', text: "Stage chez Air Liquide (avr. à juil. 2026) : conception de modules d'accompagnement pour former les équipes à l'IA, analyse de KPI et dashboards." },
  { date: '2026-09', status: 'EN ATTENTE', text: "Alternance d'un an, 1 semaine école / 1 semaine entreprise. Recherche d'entreprise en cours" },
]
