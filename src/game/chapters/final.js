import { WORLDS, GROUND_Y } from '../../data/layout.js';
import * as D from '../dialogues/final.js';
import { CREDITS } from '../dialogues/common.js';

const MW = WORLDS.memories;

const stage = (G, expr = 'smile') => G.backdrop({
  bg: 'bg_memories_far', music: 'final', particleTint: [0xffd27a, 0xff9fb2, 0xb48cff],
  chars: [{ id: 'guillo', x: 500, y: 760, scale: 0.95, face: 1, expr: 'smile' }, { id: 'kezia', x: 790, y: 760, scale: 0.95, face: -1, expr }],
  lights: [{ x: 640, y: 380, r: 320, color: 0xff9fb2, a: 0.25 }],
});

export default {
  id: 'final',
  short: '♥',
  num: 'Chapitre final',
  title: 'À la conquête du cœur de Kezia',
  date: 'Maintenant',
  tagline: 'Tous les souvenirs mènent ici.',
  music: 'final',
  steps: [
    async (G) => {
      await G.world({
        bg: 'memories',
        music: 'final',
        start: { x: 140 },
        objective: 'Suis le chemin des souvenirs',
        dustTint: [0xffd27a, 0xff9fb2, 0xb48cff],
        lights: [{ x: MW.tree, y: 260, r: 420, color: 0xffd27a, a: 0.3 }],
        items: D.ORBS.map((o) => ({ tex: o.tex, x: o.x, y: GROUND_Y - 120, scale: 0.5, onPick: (G2) => G2.say([{ s: 'think', e: 'tender', t: o.t }]) })),
        platforms: [{ x: 1700, y: 470, w: 160, style: 'cloud', h: 26 }, { x: 1900, y: 360, w: 140, style: 'cloud', h: 26 }],
        npcs: [
          { id: 'kezia', x: MW.tree - 110, face: -1, expr: 'smile', label: 'Rejoindre Kezia', talk: async (G2, scene) => {
            G2.objective('');
            scene.finish();
          } },
        ],
        onStart: (G2) => G2.say(D.intro),
      });
    },
    async (G) => {
      await stage(G);
      await G.say(D.meet);
      await G.say(D.meter(G.save.state.complicity));
      await G.constellation(D.CONSTELLATION);
    },
    async (G) => {
      await stage(G, 'tender');
      await G.letter(D.LETTER, D.SIGNATURE);
      await G.say(D.choiceIntro);
      await G.say(D.finalChoice);
      await G.memory('dernier');
      await G.kiss(); // cinématique finale : le baiser
      await G.card({ title: 'À suivre…', text: 'Ça prendra le temps que ça prendra.', hold: 4000 });
      G.music('menu');
      await G.credits(CREDITS);
    },
  ],
};
