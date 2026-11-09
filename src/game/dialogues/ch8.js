// Chapitre 8 — Miles Apart
// Faits réels : Guillo part un mois en Irlande, puis six mois en Malaisie ; ils continuent à s'appeler
// et à se soutenir ; Guillo poursuit ses études d'ingénieur, Kezia développe ses projets.

export const departure = { title: 'Puis vient le temps des départs.', text: 'Un mois en Irlande.<br>Puis six mois en Malaisie.' };

export const ireland = [
  { s: 'kezia', e: 'smile', t: 'Alors, l’Irlande ? Il pleut ?' },
  { s: 'guillo', e: 'laugh', t: 'Il pleut à l’horizontale. Je ne savais même pas que c’était possible.' },
  { s: 'kezia', e: 'laugh', t: 'Avec des plats de doberman que tu manges 🤣' },
  {
    choice: [
      { t: 'mdrrr laisse-moi.', c: 3, then: [{ s: 'kezia', e: 'shy', t: '🤣🤣🤣🤣🤣🤣.' }] },
      { t: 'oh non je souffre 😭.', c: 2, then: [{ s: 'kezia', e: 'laugh', t: 'qui t’a envoyé mdrr.' }] },
    ],
  },
];

export const malaysiaIntro = { text: 'Six mois en Malaisie.<br>Sept heures de décalage.' };

export const malaysiaStart = [
  { s: 'think', e: 'smile', t: 'Kuala Lumpur, la nuit. Des messages vocaux de Kezia m’attendent… quelque part sur les toits.' },
];

// Messages vocaux (imaginés pour le jeu) ramassés sur les toits
export const VOICE_NOTES = [
  '« Bonne chance pour ton partiel, tu vas tout déchirer ! »',
  '« Ma vidéo sur les cheveux afro a cartonné ! »',
  '« Le podcast avance, l’équipe est motivée ! »',
  '« Tu as mangé ? Mange. »',
  '« Appelle-moi quand tu peux 🌙 »',
];

export const exitLocked = [{ s: 'think', e: 'thinking', t: 'Il me reste des messages vocaux à écouter. Ils sont sur les toits.' }];

export const call = [
  { s: 'kezia', e: 'smile', t: 'Allô ? Il est quelle heure chez toi ?' },
  { s: 'guillo', e: 'laugh', t: 'Une heure du matin. Mais pour toi, je suis frais comme un croissant.' },
  { s: 'kezia', e: 'laugh', t: 'Menteur. Tu as une tête de zombie.' },
  { s: 'guillo', e: 'smile', t: 'Raconte-moi ta journée. Tes projets, ta vidéo, tout.' },
  { s: 'kezia', e: 'smile', t: 'J’ai bossé toute la journée sur mon contenu, et j’ai plein d’idées pour le podcast. Et toi, tes études ?' },
  { s: 'guillo', e: 'smile', t: 'Les cours d’ingénieur sont intenses, mais j’avance. Et savoir que toi aussi tu avances, ça me motive.' },
  {
    prompt: 'Avant de raccrocher :',
    choice: [
      { t: 'Je suis fier de toi, tu sais.', c: 4, then: [{ s: 'kezia', e: 'shy', t: 'Merci… Moi aussi, je suis fière de toi.' }] },
      { t: 'Même à 10 000 km, tu restes ma personne préférée à appeler.', c: 4, then: [{ s: 'kezia', e: 'tender', t: 'Va dormir, monsieur le charmeur 🌙' }] },
    ],
  },
  { s: 'narr', t: 'Ils continuent à s’appeler, à se soutenir. La distance change les horaires, pas l’envie de se parler.' },
];
