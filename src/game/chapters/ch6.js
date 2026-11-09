import { WORLDS } from '../../data/layout.js';
import * as D from '../dialogues/ch6.js';

const S = WORLDS.studio;

export default {
  id: 'ch6',
  short: '6',
  num: 'Chapitre 6',
  title: 'Growing Together',
  date: 'Après la Foire',
  tagline: 'Ses boucles, leur podcast, une équipe qui naît.',
  music: 'explore',
  steps: [
    async (G) => {
      await G.card({ text: D.intro, hold: 2600 });
      let gear = 0;
      const got = async (G2) => {
        gear++;
        if (gear === 3) { await G2.say(D.gearDone); G2.objective('Installe le studio au bureau'); }
        else G2.objective(`Matériel du podcast : ${gear} / 3`);
      };
      await G.world({
        bg: 'studio',
        music: 'explore',
        start: { x: 140 },
        objective: 'Va voir Kezia près de la ring light',
        lights: [{ x: S.ringlight, y: 400, r: 260, color: 0xfff6dc, a: 0.35 }],
        platforms: [
          { x: 860, y: 530, w: 170, style: 'shelf' },
          { x: 1080, y: 430, w: 170, style: 'shelf' },
          { x: 1310, y: 330, w: 170, style: 'shelf' },
          { x: 1560, y: 470, w: 150, style: 'shelf' },
        ],
        items: [
          { tex: 'casque', x: 1165, y: 280, scale: 0.4, onPick: got },
          { tex: 'micro', x: 1395, y: 180, scale: 0.4, onPick: got },
          { tex: 'lampe', x: 1635, y: 330, scale: 0.4, onPick: got },
        ],
        npcs: [
          { id: 'kezia', x: S.ringlight + 90, face: -1, expr: 'smile', label: 'Parler à Kezia', talk: async (G2) => {
            await G2.say(D.hair);
            G2.flag('ch6_hair');
            await G2.memory('ringlight');
            G2.objective(`Matériel du podcast : ${gear} / 3`);
          } },
        ],
        hotspots: [
          { x: S.desk, label: 'Installer le studio', talk: async (G2, scene) => {
            if (gear < 3 || !G2.has('ch6_hair')) { await G2.say(gear < 3 ? D.deskLocked : [{ s: 'think', e: 'thinking', t: 'Je devrais d’abord passer voir Kezia.' }]); return; }
            G2.sfx('confirm');
            scene.finish();
          }, once: false },
        ],
      });
    },
    async (G) => {
      await G.backdrop({ bg: 'bg_studio_far', music: 'explore', chars: [
        { id: 'guillo', x: 380, y: 780, scale: 0.9, face: 1 },
        { id: 'kezia', x: 640, y: 780, scale: 0.9, face: -1, expr: 'smile' },
        { id: 'staecy', x: 900, y: 780, scale: 0.9, face: -1, expr: 'smile' },
      ] });
      await G.say(D.podcastIntro);
      const perfect = await G.podcast();
      G.complicity(Math.max(1, perfect));
      await G.say(D.podcastOutro(perfect));
      await G.memory('micro');
    },
    async (G) => {
      await G.backdrop({ bg: 'bg_event_far', music: 'night', chars: [
        { id: 'guillo', x: 470, y: 780, scale: 0.9, face: 1 },
        { id: 'kezia', x: 800, y: 780, scale: 0.9, face: -1, expr: 'surprised' },
      ], lights: [{ x: 640, y: 120, r: 400, a: 0.2 }] });
      await G.say(D.backstage);
    },
  ],
};
