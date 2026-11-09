// Chapitre 1 — The First Encounter (13 septembre 2025, soirée networking NWAJA)
// Les faits réels : Guillo organise, rencontre Kezia et Staecy, demande comment elles ont connu NWAJA
// (Kezia : par sa cousine), puis leur souhaite une excellente soirée.

export const intro = [
  { s: 'narr', t: 'Soirée networking NWAJA. Guillo est l’organisateur : micro, sourires… tout est sous contrôle.' },
  { s: 'think', e: 'smile', t: 'Tout est prêt. Rien ne peut me déstabiliser ce soir.' },
  { s: 'narr', t: '(Spoiler : quelque chose va le déstabiliser.)' },
];

export const guests = {
  invite1: [
    { s: 'invite1', e: 'smile', t: 'Super soirée ! en plus y’a des petits bg mdrr !' },
    { s: 'guillo', e: 'laugh', t: 'haha j’suis mort, faut networker avec eux alors !' },
  ],
  invite3: [
    { s: 'invite3', e: 'smile', t: 'C’est toi qui as organisé tout ça ? Bravo, c’est super bien fait !' },
    { s: 'guillo', e: 'smile', t: 'Merci ! C’est le début d’une grande aventure.' },
    { s: 'invite3', e: 'laugh', t: 'Par contre, tu regardes souvent vers le bar à jus… tu cherches quelqu’un ?' },
    { s: 'think', e: 'surprised', t: 'Ça se voit tant que ça ?!' },
  ],
  invite2: [
    { s: 'invite2', e: 'laugh', t: 'La playlist est parfaite ! Qui l’a choisie ?' },
    { s: 'guillo', e: 'smile', t: 'Merci, c’est ma playlist spotify' },
  ],
  invite4: [
    { s: 'invite4', e: 'smile', t: 'Un conseil d’entrepreneur, gratuit : « Ose. » Toujours. Même quand ça fait peur.' },
    { s: 'think', e: 'thinking', t: 'Ose… Facile à dire.' },
  ],
};

export const micro = [
  { s: 'guillo', e: 'smile', t: 'Un, deux… un, deux. Bienvenue à toutes et à tous à la soirée NWAJA !' },
  { s: 'narr', t: 'Quelque part près du bar à jus, quelqu’un rit. Guillo ne sait pas encore qui.' },
];

export const meet = [
  { s: 'narr', t: 'Près du bar à jus, deux invitées discutent.' },
  { s: 'think', e: 'surprised', t: 'wshh c’est qui elle ?!!' },
  { s: 'think', e: 'shy', t: 'Je vais aller leur dire bonjour' },
  { s: 'guillo', e: 'smile', t: 'Bonsoir ! Bienvenue à la soirée NWAJA. Je suis Guillo, l’organisateur. Ça se passe bien pour vous ?' },
  { s: 'staecy', e: 'smile', t: 'Super bien ! L’ambiance est top.' },
  { s: 'kezia', e: 'smile', t: 'Oui, c’est vraiment sympa. Il y a du monde !' },
  { s: 'guillo', e: 'smile', t: 'Ça fait plaisir. Et dites-moi, comment vous avez connu NWAJA ?' },
  { s: 'kezia', e: 'smile', t: 'C’est ma cousine qui m’en a parlé. Elle m’a dit qu’il fallait absolument que je vienne.' },
  { s: 'guillo', e: 'smile', t: 'Ta cousine a connu comment Nwaja ?' },
  { fn: (ctx) => ctx.complicity && ctx.complicity(4) }, // « (complicité +4) » indiqué sur cette réplique dans la révision
  { s: 'kezia', e: 'laugh', t: "Sur les réseaux sociaux, mais elle n’a jamais eu l'opportunité de venir. Elle m'a partagé le compte en me disant de venir à la soirée NWAJA" },
  { s: 'guillo', e: 'smile', t: 'Ah ok ! En tout cas, je vous souhaite une excellente soirée. Profitez bien !' },
  { s: 'kezia', e: 'smile', t: 'Merci, toi aussi !' },
  { s: 'think', e: 'surprised', t: '« Excellente soirée » ? C’est tout ? Je ne lui ai même pas demandé son prénom…' },
];

export const exitLocked = [
  { s: 'think', e: 'thinking', t: 'Je ne peux pas filer à l’afterparty sans avoir salué tout le monde… surtout les deux invitées près du bar à jus.' },
];

export const stars = [
  { s: 'think', e: 'laugh', t: 'Les trois étoiles NWAJA ! Je les avais cachées en hauteur pour les plus curieux… et c’est moi qui les retrouve.' },
];
