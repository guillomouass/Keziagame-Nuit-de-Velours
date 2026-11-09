import { WORLDS } from '../../data/layout.js';
import * as D from '../dialogues/ch8.js';

const M = WORLDS.malaysia;

export default {
  id: 'ch8',
  short: '8',
  num: 'Chapitre 8',
  title: 'Miles Apart',
  date: 'Irlande, puis Malaisie',
  tagline: 'La distance change les horaires. Pas les appels.',
  music: 'tender',
  steps: [
    async (G) => {
      await G.card({ ...D.departure, hold: 3000 });
      await G.backdrop({ bg: 'ireland', music: 'tender', particles: 'rain', particleTint: [0xdde8f0], chars: [{ id: 'guillo', x: 900, y: 780, scale: 0.9, face: -1, mood: 'phone', expr: 'smile' }] });
      G.sfx('ring');
      await G.wait(900);
      const pill = G.callPill('kezia', 'Appel · Irlande ↔ Paris');
      try { await G.say(D.ireland); } finally { pill.close(); }
      await G.memory('tasse');
    },
    async (G) => {
      await G.card({ ...D.malaysiaIntro, hold: 2600 });
      let notes = 0;
      const note = (x, y) => ({ tex: 'message', x, y, scale: 0.38, onPick: async (G2) => {
        G2.ui.toast(`🎧 Kezia : ${D.VOICE_NOTES[notes % D.VOICE_NOTES.length]}`);
        notes++;
        G2.objective(notes >= 5 ? 'Tous les messages sont écoutés ! Va au bout du toit pour appeler Kezia' : `Messages vocaux écoutés : ${notes} / 5`);
      } });
      await G.world({
        bg: 'malaysia',
        music: 'night',
        start: { x: 120 },
        objective: 'Messages vocaux écoutés : 0 / 5',
        dustTint: [0x9fe0ff, 0xff6b5a, 0xffffff],
        platforms: [
          { x: 380, y: 520, w: 200, style: 'scaffold' },
          { x: 660, y: 420, w: 180, style: 'scaffold' },
          { x: 1020, y: 500, w: 220, style: 'scaffold' },
          { x: 1300, y: 400, w: 180, style: 'scaffold' },
          { x: 1560, y: 310, w: 160, style: 'scaffold' },
          { x: 1900, y: 480, w: 220, style: 'scaffold' },
          { x: 2180, y: 380, w: 180, style: 'scaffold' },
          { x: 2560, y: 470, w: 200, style: 'scaffold' },
          { x: 2820, y: 370, w: 160, style: 'scaffold' },
        ],
        items: [note(750, 250), note(1390, 230), note(1640, 140), note(2270, 210), note(2900, 200)],
        onStart: (G2) => G2.say(D.malaysiaStart),
        exit: { x: M.exit, label: 'Appeler Kezia 📞', when: () => notes >= 5, locked: (G2) => G2.say(D.exitLocked) },
      });
    },
    async (G) => {
      await G.backdrop({ bg: 'bg_malaysia_far', music: 'night', chars: [{ id: 'guillo', x: 640, y: 780, scale: 0.95, face: 1, mood: 'phone', expr: 'smile' }] });
      await G.timezone();
      const pill = G.callPill('kezia', 'Appel · Kuala Lumpur ↔ Paris');
      try { await G.say(D.call); } finally { pill.close(); }
      await G.memory('avion');
      await G.memory('appel');
    },
  ],
};
