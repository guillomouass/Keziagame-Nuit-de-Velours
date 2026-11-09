// Chapitre final — À la conquête du cœur de Kezia
// Les textes ci-dessous suivent la révision des dialogues. Après le choix de Kezia, la cinématique finale
// (src/game/scenes/KissScene.js) montre le baiser de Guillo et Kezia, puis l'écran « À suivre… ».
// La lettre est écrite au nom de Guillo : il peut la personnaliser librement ci-dessous (LETTER).

export const intro = [
  { s: 'narr', t: 'Un chemin de lumière. Des souvenirs qui flottent dans la nuit.' },
  { s: 'think', e: 'tender', t: 'Tous nos souvenirs mènent ici.' },
];

// Les orbes de souvenirs sur le chemin (icône, position, réplique)
export const ORBS = [
  { tex: 'badge_nwaja', x: 420, t: 'Le 13 septembre. Je ne connaissais même pas ton prénom.' },
  { tex: 'quille', x: 800, t: 'Le bowling. Je n’ai pas osé. Heureusement, Staecy a décroché.' },
  { tex: 'telephone', x: 1180, t: 'Le groupe à trois. Les appels qui duraient des heures.' },
  { tex: 'ticket_foire', x: 1560, t: 'La Foire de Paris. Notre faux appartement. Nos vrais fous rires.' },
  { tex: 'collier', x: 1940, t: 'Le collier. Une perle trouvée du premier coup. Certains appellent ça de la chance.' },
  { tex: 'billet_train', x: 2320, t: '« Ça prendra le temps que ça prendra. » Je le pensais. Je le pense toujours.' },
  { tex: 'micro', x: 2700, t: 'NWAJA, le podcast, tes vidéos. Te voir grandir, c’est mon spectacle préféré.' },
  { tex: 'avion', x: 3080, t: 'L’Irlande, la Malaisie, le décalage horaire. Les appels ont continué.' },
];

export const meet = [
  { s: 'kezia', e: 'smile', t: 'Alors c’est ça, ton jeu ? Tous nos souvenirs ?' },
  { s: 'guillo', e: 'smile', t: 'Tous. Enfin… presque. J’en garde quelques-uns pour la suite.' },
  { s: 'kezia', e: 'tease', t: 'Et c’est quoi, le but du jeu ? « Conquérir mon cœur » ?' },
  { s: 'guillo', e: 'laugh', t: 'C’est écrit dans le titre, oui. Je ne suis pas très subtil.' },
  { s: 'kezia', e: 'laugh', t: 'Pas du tout, non.' },
];

export const meter = (n) => [
  { s: 'narr', t: `Jauge de complicité : ${n} %.` },
  { s: 'guillo', e: 'tender', t: 'Tu vois cette jauge ? Elle ne dépassera jamais 99 %.' },
  { s: 'kezia', e: 'surprised', t: 'Pourquoi ?' },
  { s: 'guillo', e: 'tender', t: 'Parce que le dernier pourcent ne se gagne pas. Il se donne. Et ça, c’est toi qui décides. Quand tu veux. Si tu veux.' },
  { s: 'kezia', e: 'shy', t: '…' },
  { s: 'guillo', e: 'smile', t: 'Mais avant, j’ai encore une chose à te montrer.' },
];

export const CONSTELLATION = 'Tous nos souvenirs, rallumés un par un.';

export const LETTER = [
  'Kezia KOUAME,',
  'Depuis le 13 septembre 2025, il y a eu une soirée NWAJA, un bowling où je n’ai pas osé, un groupe à trois, des appels qui n’en finissaient pas, une Foire de Paris où l’on a joué les faux couples, et j’en passe… Entre-temps, un an est passé : un an que j’apprends à te connaître, un an durant lequel je prends plaisir à parler au téléphone à Tonton, à te parler, à te voir sourire, rigoler, être saoulée, énervée (par ma faute, parfois 😅). Mais durant cette année, il n’y a pas eu un seul moment où je n’ai pas pensé à toi, d’autant plus que ton dernier Snap, franchement, Banger ! 😭',
  'Ce mini-jeu qui retrace quelques petits moments qu’on a passés ensemble est juste ma façon de te dire, avec un peu d’humour et beaucoup de sincérité, que tu comptes pour moi. Que j’aime te voir rire, te voir créer, te voir avancer.',
  'Je ne sais pas encore comment s’écrira la suite de l’histoire. Mais quelle qu’elle soit, je suis heureux que tu sois l’héroïne de cette histoire ❤️.',
];
export const SIGNATURE = 'Guillo 🤍✨';

export const choiceIntro = [
  { s: 'narr', t: 'Cette fois, ce n’est pas Guillo qui choisit la réponse. C’est toi, Kezia.' },
];

export const finalChoice = [
  {
    prompt: 'Que réponds-tu à Guillo ?',
    choice: [
      { t: 'On verra bien… 😏', then: [{ s: 'guillo', e: 'laugh', t: '« On verra bien. » Venant de toi, c’est déjà une super réponse.' }] },
      { t: 'Continue de m’impressionner.', then: [{ s: 'guillo', e: 'smile', t: 'J’accepte. J’ai encore plein de niveaux en réserve.' }] },
      { t: 'On en parle de vive voix.', then: [{ s: 'guillo', e: 'tender', t: 'Avec plaisir.' }] },
      { t: 'C’est trop mignon, merci pour ce jeu.', then: [{ s: 'guillo', e: 'shy', t: 'Merci à toi d’avoir joué jusqu’au bout. Ça me touche vraiment.' }] },
    ],
  },
  { s: 'kezia', e: 'tender', t: '…' , hearts: 3 },
];
