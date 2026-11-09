import * as D from '../dialogues/ch3.js';

const room = { bg: 'room_night', music: 'menu', chars: [{ id: 'guillo', x: 640, y: 780, scale: 0.9, face: 1, mood: 'phone', expr: 'smile' }], lights: [{ x: 1000, y: 330, r: 260, a: 0.3 }] };

export default {
  id: 'ch3',
  short: '3',
  num: 'Chapitre 3',
  title: 'The Group Chat',
  date: 'Les semaines suivantes',
  tagline: 'Trois personnes, un groupe, et des messages qui deviennent des appels.',
  music: 'menu',
  steps: [
    async (G) => {
      await G.backdrop(room);
      await G.notification('staecy', 'Staecy vous a ajouté au groupe « Team NWAJA ✨ »');
      await G.chat(D.group);
    },
    async (G) => {
      await G.card({ text: D.transition, hold: 3000 });
      await G.backdrop(room);
      await G.notification('kezia', 'Kezia : Au fait…');
      await G.chat(D.priv);
      await G.memory('groupe');
    },
  ],
};
