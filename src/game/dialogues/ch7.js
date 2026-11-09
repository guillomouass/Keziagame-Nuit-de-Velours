// Chapitre 7 — The Paris Meetings
// Faits réels : après le retour d'Irlande de Guillo, une sortie à trois devient un rendez-vous à deux
// (Staecy ne vient pas) ; au restaurant, Guillo raconte ses projets de vie, imagine sa future fiancée
// et sa petite famille, ils en rigolent ; ils se revoient ; plus tard, Kezia propose par message un
// restaurant africain et l'invite. (Le nom du restaurant n'est volontairement pas mentionné.)

export const intro = 'Après un mois en Irlande, Guillo est de retour à Paris. Une sortie à trois est prévue…';

export const staecyCancel = 'Je ne vais pas pouvoir venir finalement 🙈 Amusez-vous bien tous les deux !';

export const afterCancel = [
  { s: 'think', e: 'surprised', t: '« Tous les deux »… Donc c’est un rendez-vous à deux.' },
];

export const meet = [
  { s: 'kezia', e: 'smile', t: 'Staecy nous a même pas prévenus qu’elle ne venait pas' },
  { s: 'guillo', e: 'laugh', t: 'franchement, ça se voyait que des fois elle n’est pas concentrée' },
  { s: 'kezia', e: 'tease', t: 'Tu n’as pas l’air très triste non plus heinn' },
  {
    choice: [
      { t: 'c’est parce que je connais ta pote, j’ai vu quel genre de personne elle était.', c: 3, then: [{ s: 'kezia', e: 'laugh', t: 'hmm 😂' }] },
      { t: 'au moins elle me laisse seul avec toi.', c: 4, then: [{ s: 'kezia', e: 'shy', t: 'mdrr toujours plus' }] },
    ],
  },
];

export const dinner = [
  { s: 'serveur', e: 'smile', t: 'Bonsoir ! Installez-vous où vous voulez' },
  { s: 'guillo', e: 'smile', t: 'Merci' },
  { s: 'kezia', e: 'smile', t: 'Alors, raconte. C’est quoi la suite pour toi ? Les projets, la vie…' },
  { s: 'guillo', e: 'smile', t: 'Finir mon diplôme d’ingénieur. Faire grandir NWAJA. Et un jour…' },
  { s: 'kezia', e: 'tease', t: 'Et un jour… ?' },
  {
    prompt: 'Guillo imagine son avenir :',
    choice: [
      { t: 'Te mettre la bague au doigt', c: 3, then: [{ s: 'kezia', e: 'smile', t: 'allez allez, tu t’arrêtes jamais toi en fait 😭' }] },
      { t: 'Finir avec toi..', c: 4, then: [
        { s: 'kezia', e: 'tease', t: 'finis d’abord ton diplôme, on en reparlera plus tard 😏' },
        { s: 'guillo', e: 'shy', t: 'Ehh tout ça' },
      ] },
      { t: 'Rencontrer, Monsieur Kouame', c: 3, then: [{ s: 'kezia', e: 'laugh', t: 'MDR, si tu veux pas que je renvoie un message sur WhatsApp à ma mère' }] },
    ],
  },
  { s: 'kezia', e: 'laugh', t: '😭😭😭' },
  { s: 'narr', t: 'Ils rient tellement que le serveur repasse trois fois avant d’oser prendre la commande.' },
];

export const again = 'Ils se revoient ensuite lors d’une autre sortie. Puis, un soir, le téléphone vibre…';

export const invite = {
  title: 'Kezia',
  members: ['kezia'],
  status: 'en ligne',
  script: [
    { from: 'kezia', t: 'Dis… ça te dit, un restaurant africain ? J’en connais un super bon.' },
    { from: 'kezia', t: 'Et cette fois, c’est moi qui t’invite 😌' },
    { choice: [
      { t: 'Kezia qui m’invite ? Je note la date dans l’histoire.', c: 4, then: [{ from: 'kezia', t: 'Note bien, c’est rare 😂' }] },
      { t: 'Avec grand plaisir ! Je viens avec ma plus belle tenue.', c: 3, then: [{ from: 'kezia', t: 'Parfait, il y aura de quoi 😋' }] },
      { t: 'Attends… c’est un rendez-vous ?', c: 3, then: [{ from: 'kezia', t: 'C’est un restaurant. Avec toi. Interprète comme tu veux 🤭' }] },
    ] },
  ],
};

export const afterInvite = [
  { s: 'think', e: 'smile', t: 'C’est elle qui a proposé. C’est elle qui invite.' },
  { s: 'think', e: 'shy', t: '… Je souris tout seul devant mon téléphone. C’est grave ?' },
];
