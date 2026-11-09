// Chapitre 4 — The Paris Adventures (Foire de Paris)
// Faits réels : faux couple qui cherche un appartement ; test d'un lit avec la phrase de Kezia à la vendeuse
// (réplique authentique, à conserver exactement) ; jeu de la perle dans un coquillage : Guillo trouve
// la bonne du premier coup et achète le collier ; Kezia est surprise et ravie.

export const intro = [
  { s: 'narr', t: 'La Foire de Paris. Des stands à perte de vue… et une idée un peu folle.' },
  { s: 'guillo', e: 'tease', t: 'T’es forte en jeu de role ? On va faire semblant d’etre un jeune couple de cadre dynamique' },
  { s: 'kezia', e: 'surprised', t: 'M D R alors toi n’importe 😭' },
  { s: 'guillo', e: 'laugh', t: 'Allez ! Ce sera drôle. Toute facon si je parle t’auras pas le choix ?' },
  {
    choice: [
      { t: '« Chérie, on y va ? »', c: 3, then: [{ s: 'kezia', e: 'laugh', t: 'Oh non, il est déjà dans le rôle 😂' }] },
      { t: 'Je suis né pour ce rôle.', c: 2, then: [{ s: 'kezia', e: 'tease', t: 'On verra bien, monsieur l’acteur.' }] },
    ],
  },
];

export const immo = [
  { s: 'agent', e: 'smile', t: 'Bonjour ! Vous cherchez votre premier appartement ensemble ?' },
  { s: 'kezia', e: 'smile', t: 'Oui ! On cherche quelque chose de… cosy.' },
  { s: 'agent', e: 'smile', t: 'Parfait. Combien de chambres ?' },
  {
    prompt: 'Combien de chambres ?',
    choice: [
      { t: 'Trois : une pour nous, une pour la chambre d’invité, une pour ses produits capillaires.', c: 4, then: [
        { s: 'kezia', e: 'laugh', t: 'Il n’a pas tort, mes produits ont besoin d’espace 😌' },
        { s: 'agent', e: 'laugh', t: 'C’est noté !' },
      ] },
      { t: 'Une seule. On est un couple très fusionnel.', c: 2, then: [
        { s: 'kezia', e: 'surprised', t: '😭😭😭😭' },
        { s: 'agent', e: 'laugh', t: 'Ah, l’amour !' },
      ] },
      { t: 'C’est elle qui décide. Moi, je signe.', c: 3, then: [
        { s: 'kezia', e: 'tease', t: 'Bonne réponse. Il apprend vite.' },
      ] },
    ],
  },
  { s: 'agent', e: 'smile', t: 'Et vous êtes ensemble depuis longtemps ?' },
  { s: 'kezia', e: 'tease', t: 'Oh… depuis… (elle se tourne vers Guillo en se retenant de rire)' },
  {
    prompt: 'Vite, invente quelque chose !',
    choice: [
      { t: 'Depuis un bon petit moment maintenant.', c: 4, then: [
        { s: 'kezia', e: 'shy', t: 'Et puis il n’a pas honte de mentir quoi 😭😂' },
      ] },
      { t: 'Depuis 2ans maintenant.', c: 3, then: [
        { s: 'agent', e: 'surprised', t: 'Quelle histoire !' },
        { s: 'kezia', e: 'laugh', t: 'Regardez-moi ce menteur là .' },
      ] },
    ],
  },
  { s: 'agent', e: 'smile', t: 'Je vous laisse la brochure. Revenez quand vous voulez, les amoureux !' },
  { s: 'think', e: 'shy', t: 'Faire semblant d’être son copain… c’est l’exercice le plus facile et le plus dangereux de ma vie.' },
];

export const toBed = [
  { s: 'vendeuse', e: 'smile', t: 'Bonjour ! Vous voulez essayer notre matelas vedette ? Allongez-vous, c’est fait pour ça !' },
  { s: 'kezia', e: 'laugh', t: 'Oh oui ! Viens, chéri, on teste.' },
];

export const bed = [
  { s: 'vendeuse', e: 'smile', t: 'Alors ? Un vrai nuage, non ?' },
  { s: 'guillo', e: 'laugh', t: 'Oh. Wow. Je crois que je vais habiter ici.' },
  { s: 'kezia', e: 'smile', t: 'Il est trop bien… attendez, il coûte combien ?' },
  { s: 'vendeuse', e: 'smile', t: 'Pour un jeune couple comme vous, on a justement une offre spéciale !' },
  { s: 'kezia', e: 'tease', t: "Ce garçon dit qu'il veut me marier alors qu'il n'a même pas de bague !", real: true },
  { s: 'vendeuse', e: 'laugh', t: 'Oh là là ! Monsieur, il va falloir assurer !' },
  {
    prompt: 'Guillo doit se défendre !',
    choice: [
      { t: 'La bague est en commande. Livraison… bientôt.', c: 3, then: [{ s: 'kezia', e: 'laugh', t: 'Bientôt ?! Il ose 😂' }] },
      { t: 'Je voulais d’abord tester le lit. Chaque chose en son temps.', c: 2, then: [
        { s: 'vendeuse', e: 'laugh', t: 'Il est pragmatique !' },
        { s: 'kezia', e: 'laugh', t: 'Je suis choquée.' },
      ] },
      { t: 'Madame, je vous jure que je suis un homme sérieux.', c: 3, then: [{ s: 'kezia', e: 'tease', t: 'Sérieux… allongé sur un lit d’exposition. Très crédible.' }] },
    ],
  },
  { s: 'narr', t: 'Ils rient tellement que deux visiteurs s’arrêtent pour les regarder.' },
];

export const toShell = [
  { s: 'perliere', e: 'smile', t: 'Venez, venez ! Une perle se cache dans l’un de ces coquillages. Trouvez-la, et je vous la monte en collier !' },
  { s: 'kezia', e: 'surprised', t: 'Oh, c’est trop joli ! On essaie ?' },
];

export const shellIntro = [
  { s: 'perliere', e: 'smile', t: 'Regardez bien… la perle est ici. Je referme, je mélange… et à vous de jouer !' },
  { s: 'kezia', e: 'tease', t: 'Vas-y, Guillo. Montre-moi ton talent.' },
  { s: 'guillo', e: 'smile', t: 'Concentration maximale. Les yeux sur la perle.' },
];

export const shellWin = [
  { s: 'perliere', e: 'surprised', t: 'Du premier coup ?! Je n’ai jamais vu ça !' },
  { s: 'kezia', e: 'surprised', t: 'Attends… QUOI ?! Du premier coup ?!' },
  { s: 'guillo', e: 'laugh', t: 'Je t’avais dit : concentration maximale.' },
  { s: 'kezia', e: 'laugh', t: 'Non mais tu triches, c’est pas possible !' },
  { s: 'guillo', e: 'smile', t: 'Madame, je vais vous prendre le collier, s’il vous plaît.' },
  { s: 'kezia', e: 'surprised', t: '… Pour moi ?' },
  { s: 'guillo', e: 'tender', t: 'Bien sûr que c’est pour toi.' },
  { s: 'kezia', e: 'shy', t: 'Il est magnifique… merci.', hearts: 5 },
];

export const after = [
  { s: 'think', e: 'tender', t: 'Elle n’arrête pas de le toucher du bout des doigts. Mission accomplie.' },
];

export const exitLocked = [{ s: 'kezia', e: 'tease', t: 'On ne part pas déjà ! Il reste des stands à voir.' }];
