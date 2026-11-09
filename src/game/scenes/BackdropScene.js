import Phaser from 'phaser';
import { Rig } from '../characters/Rig.js';
import { fitCamera, softEdges } from '../systems/View.js';

const MAIN = ['guillo', 'kezia', 'staecy'];

/**
 * Décor fixe animé pour les séquences de dialogue, de téléphone et de cinématique.
 * cfg = { bg, fg, chars: [{ id, x, y, scale, face, seated, expr, rot, mood }], particles, drift, music, tint }
 */
export class BackdropScene extends Phaser.Scene {
  constructor() { super('Backdrop'); }

  init(data) { this.cfg = data.cfg || {}; this.ready = data.ready; }

  create() {
    const c = this.cfg;
    const app = this.game.app;
    this.game.rigs = {};
    const cam = this.cameras.main;
    cam.setBackgroundColor('#0d0614');
    if (c.bg && this.textures.exists(c.bg)) this.bg = this.add.image(640, 360, c.bg).setDepth(-10);
    if (c.tint) this.add.rectangle(640, 360, 1280, 720, c.tint, c.tintA ?? 0.25).setDepth(-5);
    for (const l of c.lights || []) {
      const h = this.add.image(l.x, l.y, 'halo').setScale(l.r / 128).setTint(l.color ?? 0xffd27a).setAlpha(l.a ?? 0.4).setBlendMode(Phaser.BlendModes.ADD).setDepth(l.depth ?? 5);
      this.tweens.add({ targets: h, alpha: (l.a ?? 0.4) * 0.55, duration: 1500 + Math.random() * 1200, yoyo: true, repeat: -1 });
    }
    this.rigs = (c.chars || []).map((ch) => {
      const r = new Rig(this, ch.x, ch.y, ch.id, { scale: ch.scale ?? 0.62, face: ch.face ?? 1, seated: ch.seated, expr: ch.expr, mood: ch.mood, pearl: ch.id === 'kezia' && app.save.flag('pearl') }).setDepth(ch.depth ?? 1);
      if (ch.rot) r.setRotation(ch.rot);
      this.game.rigs[ch.key || ch.id] = r;
      return r;
    });
    if (c.fg && this.textures.exists(c.fg)) this.add.image(640, 360, c.fg).setDepth(20);
    if (c.particles !== false) {
      this.add.particles(0, 0, 'px', {
        x: { min: 0, max: 1280 }, y: { min: 0, max: 720 }, lifespan: 6000,
        speedY: c.particles === 'rain' ? { min: 300, max: 420 } : { min: -16, max: -4 },
        scale: { start: 0.45, end: 0 }, alpha: { start: 0.5, end: 0 }, frequency: c.particles === 'rain' ? 20 : 160,
        tint: c.particleTint ?? [0xffd27a, 0xffffff], blendMode: 'ADD',
      }).setDepth(30);
    }
    // Cadrage : sur écran étroit (portrait), la caméra se centre sur les personnages principaux
    // et recule juste assez pour les garder entiers. Sur ordinateur : aucun changement.
    // Un personnage hors cadre (ex. le serveur) est rattrapé par la caméra quand il parle : voir focus().
    const mains = (c.chars || []).filter((ch) => MAIN.includes(ch.id));
    const span = (mains.length ? mains : c.chars || []).map((ch) => [ch.x - 140 * (ch.scale ?? 0.62), ch.x + 140 * (ch.scale ?? 0.62)]);
    const lo = span.length ? Math.min(...span.map((v) => v[0])) : 640;
    const hi = span.length ? Math.max(...span.map((v) => v[1])) : 640;
    this.drift = 0;
    this.pan = 0; // décalage horizontal courant de la caméra (suit celui qui parle)
    this.panTarget = 0;
    softEdges(this);
    fitCamera(this, { needW: Math.min(900, Math.max(560, hi - lo + 90)), cx: (lo + hi) / 2 });
    if (c.drift !== false) this.tweens.add({ targets: this, drift: 1, duration: 16000, ease: 'Sine.easeInOut', yoyo: true, repeat: -1 });
    cam.fadeIn(600, 13, 6, 20);
    if (c.music !== undefined) app.audio.music(c.music);
    app.ui.showHud(c.hud !== false);
    this.ready && this.ready(this);
  }

  /**
   * Portrait : si le personnage qui parle est hors de l'écran, la caméra glisse vers lui ; sinon elle
   * revient au cadrage de base. Sans effet sur ordinateur (tout le décor est déjà visible).
   */
  focus(key) {
    const rig = key && this.game.rigs[key];
    const vz = this.viewZoom || 1;
    const halfView = this.scale.width / vz / 2;
    this.panTarget = 0;
    if (!rig || !this.viewScroll || halfView >= 640) return;
    const centre = this.viewScroll.x + this.scale.width / 2;
    const dx = rig.x - centre;
    const reach = halfView - 100; // le personnage doit rester à 100 px au moins du bord
    if (Math.abs(dx) > reach) {
      const want = Math.sign(dx) * (Math.abs(dx) - reach);
      const lo = -(centre - halfView), hi = 1280 - (centre + halfView); // ne dépasse pas l'image du décor
      this.panTarget = Math.min(hi, Math.max(lo, want));
    }
  }

  update(t, dt) {
    for (const r of this.rigs) r.update(dt);
    this.pan += (this.panTarget - this.pan) * Math.min(1, dt / 380);
    // lent mouvement de caméra (zoom 1.04 → 1.0 et petit décalage), relatif au cadrage de base
    const cam = this.cameras.main;
    if (this.cfg.drift !== false && this.viewScroll) {
      cam.setZoom((this.viewZoom || 1) * (1.04 - 0.04 * this.drift));
      cam.scrollX = this.viewScroll.x + this.pan + (this.cfg.driftX ?? 10) * this.drift;
      cam.scrollY = this.viewScroll.y;
    } else if (this.viewScroll) cam.scrollX = this.viewScroll.x + this.pan;
  }
}
