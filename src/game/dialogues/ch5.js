// Chapitre 5 — The Train Conversation
// ⚠️ Les quatre répliques marquées `real: true` sont le dialogue réel validé : NE PAS LES MODIFIER.
// (Un test automatique, tests/dialogues.test.js, vérifie qu'elles restent identiques mot pour mot.)

export const before = [
  { s: 'narr', t: 'Après cette belle journée, le train du retour. Face à face.' },
  { s: 'kezia', e: 'smile', t: 'Merci pour aujourd’hui. Vraiment.' },
  {
    prompt: 'Le paysage défile…',
    choice: [
      { t: 'Lui sourire.', c: 1, then: [{ s: 'narr', t: 'Elle lui rend son sourire. Puis son regard se pose sur la fenêtre.' }] },
      { t: 'Regarder le coucher de soleil avec elle.', c: 1, then: [{ s: 'narr', t: 'Le ciel devient orange, puis rose. Un silence confortable s’installe.' }] },
    ],
  },
  { s: 'narr', t: 'Puis Kezia reprend, plus doucement.' },
];

export const TRAIN_DIALOGUE = [
  { s: 'kezia', e: 'thinking', real: true, t: 'Tu sais, en ce moment, je préfère vraiment me concentrer sur moi-même et sur mes projets.' },
  { s: 'guillo', e: 'neutral', real: true, t: 'Ah oui, je comprends.' },
  { s: 'kezia', e: 'tender', real: true, t: "J'aime bien passer du temps avec toi, mais je ne me vois pas forcément me remettre en couple maintenant. Je sors d'une relation qui a duré un certain temps et j'ai besoin de penser à moi." },
  { s: 'guillo', e: 'tender', real: true, t: "Je comprends totalement. Je ne vais pas te mettre la pression. De mon côté, je ne suis pas encore dans une situation totalement stable non plus. Mais je veux que tu saches une chose : tu m'intéresses vraiment. Je ne suis pas pressé, je ne veux pas te mettre la pression. Ça prendra le temps que ça prendra." },
];

export const after = [
  { s: 'narr', t: 'Pas de promesse. Pas de pression. Juste deux personnes qui se comprennent, pendant que le train file vers Paris.' },
];
