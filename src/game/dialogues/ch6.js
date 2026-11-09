// Chapitre 6 — Growing Together
// Faits réels : Kezia développe son projet de contenu sur les cheveux afro, Guillo la conseille ;
// Kezia participe à NWAJA (notamment au podcast) ; premier podcast test ; l'équipe se structure ;
// Kezia découvre les coulisses d'un événement et donne son avis sur l'application.

export const intro = 'Après la Foire, les conversations continuent. Et les projets grandissent.';

export const hair = [
  { s: 'kezia', e: 'smile', t: 'Regarde ! Ma ring light est arrivée. Je lance enfin mon contenu sur les cheveux afro.' },
  { s: 'guillo', e: 'smile', t: 'Enfin ! Tu en parles depuis des semaines. Raconte, c’est quoi le concept ?' },
  { s: 'kezia', e: 'smile', t: 'Des routines, des astuces, des coiffures… Montrer que nos cheveux naturels sont magnifiques et qu’on peut en prendre soin simplement.' },
  {
    prompt: 'Le conseil de Guillo :',
    choice: [
      { t: 'Commence avant d’être parfaite. La régularité bat la perfection.', c: 3, then: [{ s: 'kezia', e: 'thinking', t: 'C’est vrai… ça fait trop longtemps que je repousse.' }] },
      { t: 'Montre les coulisses : les ratés, les essais. Les gens adorent le vrai.', c: 3, then: [{ s: 'kezia', e: 'laugh', t: 'Les ratés du wash day… j’en ai une collection 😂' }] },
      { t: 'Je peux t’aider pour la stratégie et le montage, si tu veux.', c: 4, then: [{ s: 'kezia', e: 'smile', t: 'Tu ferais ça ? Deal !' }] },
    ],
  },
  { s: 'kezia', e: 'tease', t: 'Et toi, tu ne veux pas passer devant la caméra ? Tes waves mériteraient un tuto.' },
  { s: 'guillo', e: 'laugh', t: 'Mes waves sont un secret industriel.' },
  { s: 'kezia', e: 'laugh', t: 'Pff. Bon, et le podcast NWAJA, il avance ?' },
  { s: 'guillo', e: 'smile', t: 'Justement ! Aide-moi à installer le matériel : le micro, le casque et la lampe. Ils sont… quelque part sur les étagères.' },
];

export const gearDone = [{ s: 'think', e: 'smile', t: 'Micro, casque, lampe : tout est là. Direction le bureau pour installer le studio.' }];
export const deskLocked = [{ s: 'think', e: 'thinking', t: 'Il me manque encore du matériel. Les étagères, peut-être… en sautant.' }];

export const podcastIntro = [
  { s: 'kezia', e: 'smile', t: 'Bon. On fait un premier podcast test ?' },
  { s: 'staecy', e: 'smile', t: 'Je m’occupe du chrono !' },
  { s: 'guillo', e: 'smile', t: 'Silence… on enregistre.' },
];

export const podcastOutro = (perfect) => [
  { s: 'kezia', e: perfect >= 4 ? 'laugh' : 'smile', t: perfect >= 4 ? 'On est trop forts ! On dirait des pros.' : 'Pour un premier test, c’est vraiment pas mal !' },
  { s: 'guillo', e: 'smile', t: 'Il nous faut une vraie équipe : quelqu’un au son, au montage, aux réseaux…' },
  { s: 'staecy', e: 'tease', t: 'Et quelqu’un pour empêcher Guillo de faire des blagues pendant l’enregistrement.' },
  { s: 'narr', t: 'Sur le tableau blanc, l’équipe du podcast commence à prendre forme.' },
];

export const backstage = [
  { s: 'narr', t: 'Quelques semaines plus tard : les coulisses d’un événement NWAJA.' },
  { s: 'kezia', e: 'surprised', t: 'Donc c’est ça, l’envers du décor Toi qui cours partout.' },
  { s: 'guillo', e: 'laugh', t: 'Bienvenue dans ma vie.' },
  { s: 'kezia', e: 'smile', t: 'J’ai testé l’application Nwaja avec le reste du groupe, au fait. J’ai des retours.' },
  { s: 'guillo', e: 'smile', t: 'Vas-y, je t’écoute.' },
  { s: 'kezia', e: 'thinking', t: 'L’inscription est un peu longue. Et le bouton principal… on ne le voit pas.' },
  {
    prompt: 'Guillo réagit :',
    choice: [
      { t: 'Merci, c’est précieux. On corrige ça.', c: 4, then: [{ s: 'kezia', e: 'smile', t: 'Voilà. Un fondateur qui écoute. J’aime.' }] },
      { t: 'Comment ça, on ne le voit pas ? Il est… discret. C’est un choix artistique.', c: 2, then: [
        { s: 'kezia', e: 'tease', t: 'Un choix artistique… que personne ne trouve 😂' },
        { s: 'guillo', e: 'shy', t: '… D’accord. On corrige ça.' },
      ] },
    ],
  },
  { s: 'kezia', e: 'smile', t: 'Et mets plus de photos des événements. Ça donne envie de venir.' },
  { s: 'guillo', e: 'smile', t: 'Note prise, directrice adjointe.' },
  { s: 'kezia', e: 'laugh', t: 'Adjointe carrément mdrr ! J’accepte le titre.' },
];
