import { WORLDS } from '../../data/layout.js';
import * as D from '../dialogues/ch2.js';

const B = WORLDS.bowling;

export default {
  id: 'ch2',
  short: '2',
  num: 'Chapitre 2',
  title: 'The Afterparty',
  date: 'Le soir même · Bowling',
  tagline: 'Il l’a vue. Il n’a pas osé. Mais il a un allié inattendu.',
  music: 'night',
  steps: [
    async (G) => {
      await G.world({
        bg: 'bowling',
        music: 'night',
        start: { x: 140 },
        objective: 'Profite de l’afterparty',
        dustTint: [0xff4fd8, 0x3de0ff, 0xffe14f],
        lights: [{ x: 600, y: 200, r: 300, color: 0xff4fd8, a: 0.2 }, { x: 1500, y: 260, r: 320, color: 0x3de0ff, a: 0.2 }, { x: 2300, y: 200, r: 300, color: 0xffe14f, a: 0.15 }],
        triggers: [{ x: 1150, run: (G2) => { G2.objective('Kezia est près de la piste 7…'); return G2.say(D.spot); } }],
        npcs: [
          { id: 'kezia', x: B.keziaLane - 70, face: 1, expr: 'laugh', mood: 'cheer', label: 'Aborder Kezia ?', talk: async (G2) => {
            await G2.say(D.kezia);
            G2.flag('ch2_saw');
            G2.objective('Rejoins le groupe de Staecy, plus loin');
          } },
          { id: 'garcon', x: B.keziaLane + 50, face: -1, expr: 'smile', label: 'Saluer le garçon', talk: (G2) => G2.say(D.garcon) },
          { id: 'invite1', x: 600, face: 1, mood: 'cheer' },
          { id: 'invite3', x: 760, face: -1, expr: 'laugh' },
          { id: 'staecy', x: B.staecy, face: -1, expr: 'smile', label: 'Parler à Staecy', when: () => G.has('ch2_saw'), talk: async (G2, scene) => {
            await G2.say(D.staecy);
            scene.finish();
          } },
        ],
      });
    },
    async (G) => {
      const res = await G.bowling({ frames: 3 });
      if (res.strikes > 0) await G.memory('strike');
      G.complicity(2);
      await G.backdrop({ bg: 'bg_bowling_far', music: 'night', chars: [{ id: 'guillo', x: 470, y: 760, scale: 0.85, face: 1 }, { id: 'staecy', x: 810, y: 760, scale: 0.85, face: -1, expr: 'laugh' }] });
      await G.say(D.afterBowling(res.score));
    },
    async (G) => {
      await G.card({ text: 'Quelques jours plus tard…', hold: 2200 });
      await G.backdrop({ bg: 'room_night', music: 'menu', chars: [{ id: 'guillo', x: 640, y: 780, scale: 0.9, face: 1, mood: 'phone' }], lights: [{ x: 1000, y: 330, r: 260, a: 0.3 }] });
      await G.say([{ s: 'think', e: 'thinking', t: 'Allez. J’appelle Staecy. Je lui dis tout. Direct.' }]);
      G.sfx('ring');
      await G.wait(1200);
      const pill = G.callPill('staecy', 'Appel');
      try { await G.say(D.call); } finally { pill.close(); }
      await G.memory('quille');
    },
  ],
};
