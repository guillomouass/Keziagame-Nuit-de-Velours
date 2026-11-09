// Le « Director » enchaîne les chapitres étape par étape, sauvegarde après chaque étape
// et fournit aux scripts de chapitre une boîte à outils `G` (dialogues, scènes, souvenirs…).
// Si le joueur revient au menu, l'exécution en cours est annulée proprement (CancelledError).

import { CHAPTERS } from '../chapters/index.js';
import { memoryById } from '../../data/memories.js';
import * as phone from '../mechanics/phone.js';
import * as mg from '../mechanics/minigames.js';
import * as fin from '../mechanics/finale.js';

export class CancelledError extends Error {
  constructor() { super('cancelled'); this.cancelled = true; }
}

const GAME_SCENES = ['World', 'Backdrop', 'Train', 'Bowling', 'Shell', 'Kiss'];

export class Director {
  constructor(app) {
    this.app = app;
    this.runId = 0;
  }

  get chapters() { return CHAPTERS; }

  stopScenes() {
    const sm = this.app.game.scene;
    for (const k of GAME_SCENES) if (sm.isActive(k) || sm.isPaused(k) || sm.isSleeping(k)) sm.stop(k);
    this.app.game.rigs = {};
  }

  startScene(key, data) {
    const sm = this.app.game.scene;
    for (const k of GAME_SCENES) if (k !== key && (sm.isActive(k) || sm.isPaused(k))) sm.stop(k);
    if (sm.isActive(key) || sm.isPaused(key)) sm.stop(key);
    sm.start(key, data);
  }

  cancel() {
    this.runId++;
    this.stopScenes();
    this.app.audio.stopLoops();
  }

  async run(ci = 0, si = 0) {
    this.cancel();
    const id = this.runId;
    const G = this.makeG(id);
    const { save, ui } = this.app;
    try {
      for (let c = ci; c < CHAPTERS.length; c++) {
        const ch = CHAPTERS[c];
        const from = c === ci ? si : 0;
        if (from === 0) {
          save.progress(c, 0);
          this.stopScenes();
          ui.showHud(false);
          await G.title(ch);
        }
        for (let s = from; s < ch.steps.length; s++) {
          save.progress(c, s);
          if (s > 0 || c > 0) ui.toastSave();
          await ch.steps[s](G);
          G.check();
        }
      }
      save.finish();
      this.app.toMenu();
    } catch (e) {
      if (!e || !e.cancelled) {
        console.error(e);
        ui.toast('Oups, un petit souci : retour au menu.');
        this.app.toMenu();
      }
    }
  }

  makeG(id) {
    const app = this.app;
    const { ui, save, audio, game } = app;
    const dir = this;
    const check = () => { if (dir.runId !== id) throw new CancelledError(); };
    const guard = async (p) => { check(); const r = await p; check(); return r; };

    const G = {
      ui, save, audio, game, check,
      wait: (ms) => guard(new Promise((r) => setTimeout(r, ms))),
      sfx: (k, o) => audio.sfx(k, o),
      music: (k) => audio.music(k),
      objective: (t) => ui.objective(t),
      flag: (k, v = true) => save.setFlag(k, v),
      has: (k) => !!save.flag(k),
      rig: (id2) => (game.rigs || {})[id2],
      expr(id2, e, ms) { const r = G.rig(id2); if (r) r.setExpression(e, ms); },

      complicity(n) {
        const d = save.addComplicity(n);
        ui.setComplicity(save.state.complicity, d);
        if (d > 0) { audio.sfx('heart', { volume: 0.5 }); const k = G.rig('kezia'); if (k && n >= 3) k.emote('♥'); }
      },

      async memory(mid) {
        const m = memoryById[mid];
        if (!m) return;
        if (save.unlockMemory(mid)) { ui.toastMemory(m); audio.sfx('collect'); }
      },

      say(nodes) {
        // portrait : la caméra du décor suit celui qui parle s'il est hors cadre (BackdropScene.focus)
        const follow = (key) => { const bd = game.scene.getScene('Backdrop'); if (bd && bd.focus && game.scene.isActive('Backdrop')) bd.focus(key); };
        const p = ui.play(nodes, {
          cancelled: () => dir.runId !== id,
          complicity: (n) => G.complicity(n),
          flag: (k) => G.flag(k),
          onLine: (node) => {
            const who = node.s === 'think' ? 'guillo' : node.s;
            const r = G.rig(who);
            Object.values(game.rigs || {}).forEach((x) => (x.talking = false));
            if (r) { if (node.e) r.setExpression(node.e === 'thinking' ? 'neutral' : node.e); if (node.s !== 'think') r.talking = true; }
            if (node.emote && r) r.emote(node.emote);
            if (node.hearts && r) r.hearts(node.hearts);
            follow(who);
          },
        });
        p.finally(() => follow(null)).catch(() => {}); // l'annulation est déjà gérée par guard()
        return guard(p);
      },
      choose: (opts, prompt) => guard(ui.choose(opts, prompt)),
      card: (o) => guard(ui.card(o)),
      fade: (on) => guard(ui.fade(on)),
      async title(ch) {
        audio.music(ch.music || 'menu');
        await guard(ui.card({ num: ch.num, title: ch.title, date: ch.date, text: ch.tagline, hold: 3600 }));
      },

      world: (cfg) => guard(new Promise((done) => dir.startScene('World', { cfg, G, done }))),
      backdrop: (cfg) => guard(new Promise((ready) => dir.startScene('Backdrop', { cfg, ready }))),
      train: () => guard(new Promise((ready) => dir.startScene('Train', { ready }))),
      shell: () => guard(new Promise((ready) => dir.startScene('Shell', { ready }))),
      bowling: (data = {}) => guard(new Promise((done) => dir.startScene('Bowling', { ...data, done }))),
      kiss: () => guard(new Promise((done) => dir.startScene('Kiss', { done }))),

      chat: (cfg) => guard(phone.chat(G, cfg)),
      incoming: (who) => guard(phone.incoming(G, who)),
      notification: (from, text) => guard(phone.notification(G, from, text)),
      callPill: (who, label) => phone.callPill(G, who, label),
      timezone: () => guard(mg.timezone(G)),
      podcast: () => guard(mg.podcast(G)),
      necklace: (lines) => guard(fin.necklaceCinematic(G, lines)),
      constellation: (text) => guard(fin.constellation(G, text)),
      letter: (p, sig) => guard(fin.letter(G, p, sig)),
      credits: (lines) => guard(fin.credits(G, lines)),
    };
    return G;
  }
}
