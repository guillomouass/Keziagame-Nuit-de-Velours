import { WORLDS } from '../../data/layout.js';
import * as D from '../dialogues/ch7.js';

const P = WORLDS.paris;

export default {
  id: 'ch7',
  short: '7',
  num: 'Chapitre 7',
  title: 'The Paris Meetings',
  date: 'De retour à Paris',
  tagline: 'Une sortie à trois… qui se fait à deux.',
  music: 'night',
  steps: [
    async (G) => {
      await G.card({ text: D.intro, hold: 2800 });
      await G.world({
        bg: 'paris',
        music: 'night',
        start: { x: 140 },
        objective: 'Rejoins Kezia et Staecy au restaurant',
        lights: [120, 540, 960, 1380, 1800, 2220].map((x) => ({ x, y: 360, r: 160, a: 0.25 })),
        triggers: [{ x: 800, run: async (G2) => {
          await G2.notification('staecy', D.staecyCancel);
          await G2.say(D.afterCancel);
          G2.objective('Rejoins Kezia devant le restaurant');
        } }],
        npcs: [
          { id: 'kezia', x: P.restaurant - 150, face: -1, expr: 'smile', label: 'Rejoindre Kezia', talk: async (G2, scene) => {
            await G2.say(D.meet);
            scene.finish();
          } },
          { id: 'invite1', x: 1250, face: 1, expr: 'smile' },
          { id: 'invite3', x: 1330, face: -1, expr: 'laugh' },
        ],
      });
    },
    async (G) => {
      await G.backdrop({
        bg: 'restaurant', fg: 'restaurant_table', music: 'night',
        chars: [
          { id: 'guillo', x: 380, y: 615, scale: 0.95, face: 1, seated: true },
          { id: 'kezia', x: 900, y: 615, scale: 0.95, face: -1, seated: true, expr: 'smile' },
          { id: 'serveur', x: 1150, y: 790, scale: 0.9, face: -1, expr: 'smile', depth: 25 },
        ],
        lights: [{ x: 640, y: 470, r: 200, a: 0.4, depth: 21 }],
      });
      await G.say(D.dinner);
      await G.memory('assiette');
    },
    async (G) => {
      await G.card({ text: D.again, hold: 2800 });
      await G.backdrop({ bg: 'room_night', music: 'menu', chars: [{ id: 'guillo', x: 640, y: 780, scale: 0.9, face: 1, mood: 'phone', expr: 'smile' }], lights: [{ x: 1000, y: 330, r: 260, a: 0.3 }] });
      await G.notification('kezia', 'Kezia : Dis… ça te dit ?');
      await G.chat(D.invite);
      await G.memory('invitation');
      await G.say(D.afterInvite);
    },
  ],
};
