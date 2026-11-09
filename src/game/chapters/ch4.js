import { WORLDS, GROUND_Y } from '../../data/layout.js';
import * as D from '../dialogues/ch4.js';
import { NECKLACE_LINES } from '../dialogues/common.js';

const F = WORLDS.fair;

const fair = (G, extra) => ({
  bg: 'fair',
  music: 'fair',
  follower: 'kezia',
  dustTint: [0xffffff, 0xffe6b0],
  lights: [{ x: F.immo, y: 260, r: 300, a: 0.18 }, { x: F.literie, y: 260, r: 300, color: 0xd9c8ff, a: 0.2 }, { x: F.perles, y: 260, r: 300, color: 0x9fe0d7, a: 0.22 }],
  platforms: [{ x: 1120, y: 470, w: 100, style: 'crate' }],
  items: [{ tex: 'brochure', x: 1170, y: 230, memory: 'brochure', secret: true, scale: 0.4 }],
  ...extra,
});

export default {
  id: 'ch4',
  short: '4',
  num: 'Chapitre 4',
  title: 'The Paris Adventures',
  date: 'La Foire de Paris',
  tagline: 'Un faux couple, un vrai fou rire, et une perle.',
  music: 'fair',
  steps: [
    // 1. Le stand immobilier
    async (G) => {
      await G.world(fair(G, {
        start: { x: 160 },
        objective: 'Visite la Foire de Paris avec Kezia',
        onStart: async (G2) => { await G2.say(D.intro); await G2.memory('ticket'); G2.objective('Stand « Appartements neufs » : joue le faux couple'); },
        npcs: [
          { id: 'agent', x: F.immo + 140, face: -1, expr: 'smile', label: 'Parler à l’agent immobilier', talk: async (G2) => {
            await G2.say(D.immo);
            G2.flag('ch4_immo');
            await G2.memory('cle');
            G2.objective('Stand « Literie & Rêves » : on teste le lit ?');
          } },
          { id: 'vendeuse', x: F.literie + 150, face: -1, expr: 'smile', label: 'Parler à la vendeuse', when: () => G.has('ch4_immo'), talk: async (G2, scene) => {
            await G2.say(D.toBed);
            scene.finish();
          } },
          { id: 'invite3', x: 1450, face: 1, expr: 'smile' },
          { id: 'invite4', x: 2400, face: -1 },
        ],
        exit: { x: F.exit, when: () => false, locked: (G2) => G2.say(D.exitLocked) },
      }));
    },
    // 2. Le test du lit
    async (G) => {
      await G.backdrop({
        bg: 'bed_showroom', music: 'fair', drift: true,
        chars: [
          { id: 'kezia', x: 700, y: 430, scale: 0.78, face: 1, rot: -Math.PI / 2, expr: 'laugh', depth: 2 },
          { id: 'guillo', x: 760, y: 505, scale: 0.78, face: 1, rot: -Math.PI / 2, expr: 'smile', depth: 3 },
          { id: 'vendeuse', x: 1110, y: 820, scale: 1, face: -1, expr: 'smile', depth: 4 },
        ],
      });
      await G.say(D.bed);
      await G.memory('coussin');
    },
    // 3. Vers le stand des perles
    async (G) => {
      await G.world(fair(G, {
        start: { x: F.literie + 260 },
        objective: 'Stand « Perles & Coquillages »',
        npcs: [
          { id: 'vendeuse', x: F.literie + 150, face: 1, expr: 'laugh' },
          { id: 'perliere', x: F.perles + 150, face: -1, expr: 'smile', label: 'Jouer au jeu de la perle', talk: async (G2, scene) => {
            await G2.say(D.toShell);
            scene.finish();
          } },
        ],
        exit: { x: F.exit, when: () => false, locked: (G2) => G2.say(D.exitLocked) },
      }));
    },
    // 4. Le jeu de la perle
    async (G) => {
      const sc = await G.shell();
      await G.say(D.shellIntro);
      await sc.round();
      G.check();
      await G.say(D.shellWin);
      G.complicity(6);
    },
    // 5. Le collier (objet unique)
    async (G) => {
      await G.necklace(NECKLACE_LINES);
      G.flag('pearl');
      await G.memory('collier');
      await G.backdrop({ bg: 'bg_fair_far', music: 'fair', chars: [{ id: 'guillo', x: 480, y: 780, scale: 0.95, face: 1, expr: 'smile' }, { id: 'kezia', x: 800, y: 780, scale: 0.95, face: -1, expr: 'shy' }], lights: [{ x: 800, y: 520, r: 120, color: 0xffffff, a: 0.4, depth: 5 }] });
      await G.say(D.after);
    },
  ],
};
