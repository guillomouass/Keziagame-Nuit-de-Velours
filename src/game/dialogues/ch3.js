// Chapitre 3 — The Group Chat
// Faits réels : Kezia et Staecy contactent ensemble Guillo pour aider NWAJA ; un groupe à trois est créé ;
// les discussions deviennent personnelles, les appels se multiplient ; Guillo flirte avec Kezia et lui
// explique qu'elle l'intéressait dès la première rencontre, même sans connaître son prénom, et qu'il était intimidé.
// Les messages ci-dessous sont réimaginés pour le jeu.

export const group = {
  title: 'Team NWAJA ✨',
  members: ['kezia', 'staecy'],
  script: [
    { sys: 'Staecy a créé le groupe « Team NWAJA ✨ »' },
    { sys: 'Staecy a ajouté Kezia et Guillo' },
    { from: 'staecy', t: 'Coucou Guillo ! C’est Staecy, de l’évènement Nwaja 🎳' },
    { from: 'kezia', t: 'Hello ! On a adoré la soirée NWAJA. On se disait qu’on aimerait aider, si tu as besoin de monde 🙌' },
    { choice: [
      { t: 'Sérieusement ? Vous tombez à pic : j’ai mille idées et seulement deux mains.', c: 2, then: [
        { from: 'kezia', t: 'Parfait, on apporte quatre mains en plus 😊' },
      ] },
      { t: 'Bienvenue dans l’équipe !', c: 3, then: [
        { from: 'staecy', t: '😂 En tout cas si t’as besoin j’suis là.' },
        { from: 'kezia', t: 'Moi aussi.' },
      ] },
    ] },
    { me: 'Carrément on peut s’appeler !' },
    { sys: '📞 Appel de groupe · 1 h 12', pause: 900 },
    { sys: '— Les jours passent —', pause: 1100 },
    { sys: '📞 Appel de groupe · 2 h 05', pause: 900 },
    { from: 'kezia', t: 'Bon. On a parlé de NWAJA 20 minutes… et de nos vies pendant 1 h 45 😂' },
    { choice: [
      { t: 'au moins on a bien rigolé et on a pu faire connaissance haha.', c: 2 },
      { t: 'faudrait créer un groupe Snap pour parler autre que de Nwaja.', c: 3, then: [
        { from: 'staecy', t: 'De ouf, même tiktok en vrai 😂' },
        { sys: 'Staecy a renommé le groupe « Thérapie NWAJA 🛋️ »' },
      ] },
    ] },
  ],
};

export const transition = 'Les appels se multiplient. Puis, un soir, une conversation privée commence…';

export const priv = {
  title: 'Kezia',
  members: ['kezia'],
  status: 'en ligne',
  script: [
    { from: 'kezia', t: 'Au fait, merci pour l’appel d’hier, j’ai bien rigolé 😄' },
    { choice: [
      { t: 'moi aussi je t’avoue, j’ai bien rigolé, t’es vraiment drôle.', c: 4, then: [{ from: 'kezia', t: 'je sais, je sais MDR 😏' }] },
      { t: 'staecy a vraiment joué contre moi, elle gâche mes plans comme ça 😭.', c: 3, then: [
        { from: 'kezia', t: 'mdrr non mais vous les congolais on sait déjà ☕😂' },
        { me: 'n’importe quoi 😭' }, // marqué « Guillo (reçu) » dans la révision : traité comme un message envoyé par Guillo
      ] },
    ] },
    { from: 'kezia', t: 'Je peux te poser une question ?' },
    { me: 'Vas-y.' },
    { from: 'kezia', t: 'Le soir de l’événement, tu nous as dit bonjour, tu as été super poli… et après, plus rien. J’ai cru que tu nous avais oubliées 🙃' },
    { choice: [
      { t: 'Oublier ? Impossible.', c: 4 },
      { t: 'La vérité ? Tu m’intéressais déjà. Mais je ne connaissais même pas ton prénom.', c: 4 },
    ] },
    { me: 'Et pour être honnête… j’étais intimidé 😅' },
    { from: 'kezia', t: 'Intimidé ?? Toi ? Le monsieur qui parle devant plein de personnes ? 😂' },
    { me: 'non mais c’est pas pareil mdrr.' },
    { fn: (G) => G.complicity(5) }, // « (complicité +5) » indiqué sur ce message dans la révision
    { from: 'kezia', t: 'oui allez allez 😌' },
  ],
};
