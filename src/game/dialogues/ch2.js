// Chapitre 2 — The Afterparty (bowling)
// Faits réels : Guillo voit Kezia jouer et discuter avec un garçon, ne l'aborde pas ;
// il sympathise avec Staecy et lui avoue au téléphone qu'il s'intéresse à Kezia ;
// Staecy ne sait pas si Kezia est célibataire, elles se sont rencontrées le 13 septembre.

export const intro = [
  { s: 'narr', t: 'Afterparty au bowling. Les quilles tombent, les rires montent, la musique est trop forte. Parfait.' },
];

export const spot = [
  { s: 'think', e: 'surprised', t: 'Tiens… près de la piste 7. C’est elle.' },
];

export const kezia = [
  { s: 'think', e: 'thinking', t: 'Elle joue… elle discute avec un gars. Elle rit.' },
  {
    prompt: 'Que fait Guillo ?',
    choice: [
      { t: 'Aller lui parler, avec assurance.', then: [
        { s: 'think', e: 'shy', t: 'Ouais non j’suis trop timide.' },
      ] },
      { t: 'Lui faire un petit signe de loin.', then: [
        { s: 'narr', t: 'Elle ne le voit pas. Le petit signe reste suspendu dans le vide, comme un « coucou » orphelin.' },
        { s: 'think', e: 'shy', t: '… Personne n’a rien vu. Parfait.' },
      ] },
      { t: 'Ne pas déranger. Observer, puis s’éloigner.', then: [
        { s: 'think', e: 'thinking', t: 'Pas ce soir...' },
      ] },
    ],
  },
  { s: 'think', e: 'thinking', t: 'Et je ne connais toujours pas son prénom…' },
];

export const garcon = [
  { s: 'garcon', e: 'smile', t: 'Salut ! Tu cherches une piste ?' },
  { s: 'guillo', e: 'smile', t: 'Non, non, tout va bien. Bonne partie !' },
];

export const staecy = [
  { s: 'staecy', e: 'smile', t: 'Hé, l’organisateur ! Tu joues avec nous ? Il nous manque quelqu’un sur la piste d’à côté.' },
  { s: 'guillo', e: 'laugh', t: 'Avec plaisir ! Attention, je suis redoutable.' },
  { s: 'staecy', e: 'tease', t: 'On va vérifier ça tout de suite.' },
];

export const afterBowling = (score) => [
  { s: 'staecy', e: score >= 18 ? 'surprised' : 'laugh', t: score >= 18 ? `${score} quilles ! Ok, tu ne mentais pas.` : `${score} quilles… « redoutable », hein ? 😂` },
  { s: 'guillo', e: 'laugh', t: score >= 18 ? 'Je t’avais prévenue.' : 'La piste était penchée mdrr.' },
  { s: 'narr', t: 'Entre deux lancers, Guillo et Staecy sympathisent. Ils échangent leurs numéros et insta.' },
];

export const call = [
  { s: 'staecy', e: 'smile', t: 'Allô ? Guillo ? Ça va ?' },
  { s: 'guillo', e: 'smile', t: 'Ça va ! Dis, Staecy… je vais être direct avec toi.' },
  { s: 'guillo', e: 'shy', t: 'Ton amie, celle avec qui t’étais à l’évènement. Je ne connais même pas son prénom.' },
  { s: 'staecy', e: 'tease', t: 'Kezia. Elle s’appelle Kezia.' },
  { s: 'guillo', e: 'tender', t: 'Kezia hmm…' },
  {
    prompt: 'Bon. Il faut le dire.',
    choice: [
      { t: 'Elle me plaît, Staecy. Vraiment.', c: 3, then: [{ s: 'staecy', e: 'smile', t: 'Ahaha! Direct comme ça ? rahh ouais t’es piqué hein' }] },
      { t: 'J’appelle pour un ami. L’ami, c’est moi.', c: 3, then: [{ s: 'staecy', e: 'laugh', t: 'Le pire mensonge de l’histoire du téléphone.' }] },
    ],
  },
  { s: 'staecy', e: 'thinking', t: 'Par contre, je ne sais pas vraiment si elle est célibataire…' },
  { s: 'guillo', e: 'surprised', t: 'Tu ne sais pas ? Vous n’êtes pas amies depuis longtemps ?' },
  { s: 'staecy', e: 'laugh', t: 'Pas du tout ! On s’est rencontrées à ton événement, le 13 septembre. Comme toi.' },
  { s: 'think', e: 'smile', t: 'Donc ce soir-là, NWAJA a créé au moins une amitié. Peut-être plus, qui sait.' },
  { s: 'staecy', e: 'tease', t: 'Je ne promets rien. Mais je garde ça en tête. 😉' },
];
