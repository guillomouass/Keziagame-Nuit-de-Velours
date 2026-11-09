import { WORLDS, GROUND_Y } from '../../data/layout.js';
import * as D from '../dialogues/ch1.js';

const E = WORLDS.event;

export default {
  id: 'ch1',
  short: '1',
  num: 'Chapitre 1',
  title: 'The First Encounter',
  date: '13 septembre 2025',
  tagline: 'Une soirée networking NWAJA. Un organisateur très occupé. Et puis, elle.',
  music: 'explore',
  steps: [
    async (G) => {
      let stars = 0;
      const star = (x, y) => ({ tex: 'etoile', x, y, scale: 0.36, onPick: async (G2) => { stars++; if (stars === 3) { await G2.say(D.stars); await G2.memory('etoiles'); } } });
      await G.world({
        bg: 'event',
        music: 'explore',
        start: { x: 140 },
        objective: 'Accueille les invités de la soirée NWAJA',
        lights: [{ x: 780, y: 300, r: 380, a: 0.25 }, { x: 2350, y: 380, r: 300, color: 0x7bc96f, a: 0.18 }, { x: 2860, y: 340, r: 200, color: 0xff7ad9, a: 0.3 }],
        platforms: [
          { x: E.stage.x, y: GROUND_Y - E.stage.h, w: E.stage.w, h: 20, style: 'invisible' },
          { x: 1480, y: GROUND_Y - 100, w: 90, style: 'crate' },
          { x: 1570, y: GROUND_Y - 190, w: 90, style: 'crate' },
          { x: 2580, y: 490, w: 130, style: 'shelf' },
        ],
        items: [star(940, 230), star(1615, 250), star(2645, 220)].map((s) => ({ ...s, secret: true })),
        hotspots: [
          { x: E.stage.x + E.stage.w / 2, label: 'Tester le micro', talk: (G2) => G2.say(D.micro) },
        ],
        npcs: [
          { id: 'invite1', x: 1250, face: -1, label: 'Discuter avec un invité', talk: (G2) => G2.say(D.guests.invite1) },
          { id: 'invite3', x: 1780, face: -1, label: 'Discuter avec une invitée', talk: (G2) => G2.say(D.guests.invite3) },
          { id: 'invite2', x: 1960, face: 1, mood: 'dance', label: 'Discuter avec une invitée', talk: (G2) => G2.say(D.guests.invite2) },
          { id: 'invite4', x: 2120, face: -1, label: 'Discuter avec un invité', talk: (G2) => G2.say(D.guests.invite4) },
          { id: 'kezia', x: E.bar - 60, face: 1, label: 'Saluer les deux invitées', talk: async (G2) => {
            await G2.say(D.meet);
            G2.flag('ch1_met');
            await G2.memory('badge');
            G2.objective('Direction l’afterparty → (porte au fond de la salle)');
          } },
          { id: 'staecy', x: E.bar + 60, face: -1, expr: 'smile' },
        ],
        exit: { x: E.exit, label: 'Partir à l’afterparty →', when: () => G.has('ch1_met'), locked: (G2) => G2.say(D.exitLocked) },
        onStart: (G2) => G2.say(D.intro),
      });
    },
  ],
};
