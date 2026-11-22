// Mentions légales et politique de confidentialité d'AdamOS.
// Cadre : LCEN (loi n° 2004-575, art. 6 III), RGPD (règlement UE 2016/679),
// loi Informatique et Libertés, recommandations CNIL sur les traceurs.
// Dernière vérification des informations des prestataires : 21 novembre 2026.

import { EMAIL } from './content'

export const LEGAL_UPDATED = '21 novembre 2026'

export const HOST = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis',
  contact: 'privacy@vercel.com',
  site: 'https://vercel.com',
}

export const LEGAL_NOTICE = [
  {
    h: 'Éditeur du site',
    p: [
      `Ce site est le portfolio personnel d'Adam Bettayeb, particulier, édité à titre non professionnel et sans activité commerciale.`,
      `Contact : ${EMAIL} · 06 64 50 25 68.`,
      `Conformément à l'article 6 III-2 de la loi n° 2004-575 du 21 juin 2004 (LCEN), l'éditeur, personne physique éditant à titre non professionnel, a communiqué ses éléments d'identification à l'hébergeur ; son adresse postale n'est donc pas publiée.`,
    ],
  },
  {
    h: 'Directeur de la publication',
    p: ['Adam Bettayeb.'],
  },
  {
    h: 'Hébergeur',
    p: [`${HOST.name}, ${HOST.address}.`, `Contact : ${HOST.contact} · ${HOST.site}`],
  },
  {
    h: 'Propriété intellectuelle',
    p: [
      `Les textes, le code, le design d'AdamOS et les icônes en pixel art sont la propriété d'Adam Bettayeb, sauf mention contraire. Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite (articles L.111-1 et suivants du Code de la propriété intellectuelle).`,
      `Les captures d'écran présentent des projets réalisés par Adam Bettayeb, dont certains en équipe dans le cadre du BUT MMI.`,
      `Les marques, noms et visuels de tiers restent la propriété de leurs titulaires respectifs, notamment le nom du jeu télévisé « Motus » et les personnages de l'univers Dragon Ball visibles dans le projet étudiant Motus. Ils apparaissent dans un cadre pédagogique, non commercial, sans affiliation avec leurs ayants droit. Sur simple demande d'un ayant droit, le contenu concerné sera retiré.`,
      `Le mini-jeu « Glouton » s'inspire du principe de Pac-Man (marque de Bandai Namco) : c'est une réimplémentation originale, sans aucun nom, graphisme ni son du jeu d'origine. « Snake » et « Démineur » désignent des genres de jeux génériques.`,
      `Polices : Pixelify Sans et IBM Plex (licence SIL Open Font License 1.1). Icônes d'interface : Phosphor Icons (licence MIT).`,
    ],
  },
  {
    h: 'Liens externes',
    p: [
      `Le site contient des liens vers des sites tiers (LinkedIn, GitHub, projets hébergés sur d'autres services). Adam Bettayeb n'est pas responsable de leur contenu ni de leurs pratiques en matière de données personnelles.`,
    ],
  },
  {
    h: 'Responsabilité',
    p: [
      `Les informations du site sont fournies à titre indicatif et mises à jour régulièrement. L'éditeur ne saurait être tenu responsable d'une indisponibilité temporaire du site ou d'une erreur malgré le soin apporté à son contenu.`,
    ],
  },
  {
    h: 'Droit applicable',
    p: ['Le présent site et ses mentions légales sont soumis au droit français.'],
  },
]

export const PRIVACY = [
  {
    h: 'En bref',
    p: [
      `Ce site ne dépose aucun cookie, n'utilise aucun outil de mesure d'audience, aucune publicité et ne charge aucune ressource tierce (les polices sont hébergées sur le site). Les seules données personnelles traitées sont celles que vous envoyez via le formulaire de contact, et les données techniques de l'hébergeur.`,
    ],
  },
  {
    h: 'Responsable du traitement',
    p: [`Adam Bettayeb, joignable à ${EMAIL}.`],
  },
  {
    h: 'Formulaire de contact (Messagerie)',
    p: [
      `Données : votre nom, votre adresse email et le contenu de votre message.`,
      `Finalité : vous répondre, notamment au sujet d'une alternance ou d'une proposition professionnelle.`,
      `Base légale : les mesures précontractuelles prises à votre demande (article 6.1.b du RGPD) et l'intérêt légitime à répondre aux messages reçus (article 6.1.f).`,
      `Destinataires : Adam Bettayeb uniquement. L'envoi passe par le service Formspree, Inc. (États-Unis), qui agit comme sous-traitant pour acheminer le message par email. Ce transfert hors de l'Union européenne est encadré par les garanties annoncées par Formspree dans sa politique de confidentialité.`,
      `Durée de conservation : le temps de l'échange, puis 12 mois au maximum après le dernier contact, avant suppression.`,
      `Le formulaire est facultatif : vous pouvez aussi écrire directement à ${EMAIL}.`,
    ],
  },
  {
    h: 'Hébergement et données techniques',
    p: [
      `Comme tout hébergeur, ${HOST.name} enregistre des données techniques lors de votre visite (adresse IP, date et heure, navigateur, page demandée) pour assurer le fonctionnement et la sécurité du site. Base légale : intérêt légitime (article 6.1.f). Vercel est situé aux États-Unis et adhère au Data Privacy Framework entre l’UE et les États-Unis, qui encadre ce transfert. La durée de conservation de ces journaux est fixée par Vercel.`,
    ],
  },
  {
    h: 'Cookies et stockage local',
    p: [
      `Aucun cookie n'est déposé. Le site enregistre seulement, dans le stockage de session de votre navigateur (sessionStorage), une valeur « adamos-booted » qui évite de rejouer l'écran de démarrage pendant votre visite. Elle ne contient aucune donnée personnelle et s'efface à la fermeture de l'onglet. Les meilleurs scores des mini-jeux ne sont gardés qu'en mémoire, le temps de la visite.`,
      `Ce stockage sert uniquement au fonctionnement de l'interface que vous utilisez : conformément aux lignes directrices de la CNIL, il est exempté de consentement. C'est pourquoi le site n'affiche pas de bandeau cookies.`,
    ],
  },
  {
    h: 'Vos droits',
    p: [
      `Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données (articles 15 à 21 du RGPD). Pour les exercer, écrivez à ${EMAIL} ; une réponse vous sera apportée dans un délai d'un mois.`,
      `Si vous estimez que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL : www.cnil.fr, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07.`,
    ],
  },
  {
    h: 'Sécurité',
    p: [`Le site est servi exclusivement en HTTPS. Les messages sont transmis de façon chiffrée (TLS) à Formspree.`],
  },
  {
    h: 'Modifications',
    p: [`Cette politique peut évoluer, par exemple en cas de changement de prestataire. La date de dernière mise à jour figure en haut du document.`],
  },
]
