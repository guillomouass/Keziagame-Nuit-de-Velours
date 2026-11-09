import Phaser from 'phaser';
import { RES, HEAD, HEAD_PIVOT, LIPS, BODY } from '../../data/baiser.js';
import { fitCamera } from '../systems/View.js';

// Cinématique finale : Guillo et Kezia de profil sous la lune.
// Rapprochement progressif, les yeux se ferment, baiser, léger éloignement, sourire.
// Chaque personnage est un buste + une tête qui s'incline. À chaque image, la position des bustes
// est recalculée à partir de la position voulue des lèvres : elles se touchent exactement,
// sans que les visages se traversent. Kezia est au premier plan, tout est opaque.
// Aucune réplique n'est ajoutée : la scène est entièrement visuelle et musicale.

const S = 1.2; // échelle des personnages
const CX = 640; // point de rencontre des lèvres
const CY = 330;
const DEG = Math.PI / 180;

// Déroulé (ms). Le mouvement du baiser lui-même (approche → baiser → léger recul) dure 4,4 s.
const T = { intro: 1100, approach: 1700, kiss: 1600, release: 1100, end: 2600, fade: 1400 };

export class KissScene extends Phaser.Scene {
  constructor() { super('Kiss'); }

  init(data) { this.done = data.done; }

  create() {
    const app = this.game.app;
    this.app = app;
    this.game.rigs = {};
    app.ui.showHud(false);
    app.audio.music('final');
    const cam = this.cameras.main;
    cam.setBackgroundColor('#0d0614');
    // portrait : la caméra recule pour garder les deux personnages entiers (zoom de base `vz`, 1 sur ordinateur)
    fitCamera(this, { needW: 820 });
    const vz = this.viewZoom;
    const big = Math.max(1, 1 / vz); // le décor est agrandi pour remplir la zone, plus haute que 720

    // décor : ciel des souvenirs, lune, halo rose, lanternes et lucioles — tout derrière les personnages
    this.add.image(CX, 360, 'bg_memories_far').setTint(0xffe6f2).setDepth(0).setScale(big);
    this.add.rectangle(CX, 360, 1280 * big, 720 * big, 0x1a0b2a, 0.3).setDepth(1);
    this.moon = this.add.image(CX, 250, 'cine_moon').setScale(1.1).setDepth(2);
    this.glow = this.add.image(CX, CY - 30, 'halo').setScale(4.5).setTint(0xff9fc0).setAlpha(0.18).setBlendMode(Phaser.BlendModes.ADD).setDepth(3);
    this.lanterns = this.add.particles(0, 0, 'cine_lantern', {
      x: { min: CX - 640 * big, max: CX + 640 * big }, y: 360 + 360 * big + 50, lifespan: 15000, speedY: { min: -55, max: -28 }, speedX: { min: -10, max: 10 },
      scale: { start: 0.7, end: 0.3 }, alpha: { start: 1, end: 0 }, frequency: 650, rotate: { min: -10, max: 10 },
    }).setDepth(4);
    this.lanterns.fastForward(9000);
    this.add.particles(0, 0, 'px', {
      x: { min: CX - 640 * big, max: CX + 640 * big }, y: { min: 360 - 280 * big, max: 360 + 340 * big }, lifespan: 5000, speedY: { min: -14, max: -4 },
      scale: { start: 0.6, end: 0 }, alpha: { start: 0.8, end: 0 }, frequency: 110, tint: [0xffd27a, 0xff9fb2, 0xffffff], blendMode: 'ADD',
    }).setDepth(5);

    // les deux personnages (Kezia retournée pour faire face à Guillo, au premier plan)
    this.gr = this.rig('guillo', 1, 10);
    this.kr = this.rig('kezia', -1, 20, app.save.flag('pearl'));

    // état animé : écart entre les lèvres, décalages verticaux, inclinaisons (degrés)
    this.st = { gap: 190, gUp: -26, kUp: 30, tiltG: -2, tiltK: 2, lean: 0, bob: 0 };
    this.pose();

    cam.fadeIn(T.intro, 13, 6, 20);
    this.run();
  }

  rig(id, flip, depth, pearl = false) {
    const c = this.add.container(0, 0).setDepth(depth);
    const body = this.add.image(0, 0, `cine_baiser_${id}_body`).setOrigin(BODY.OX / BODY.W, BODY.OY / BODY.H).setScale(1 / RES);
    const head = this.add.image(0, 0, `cine_baiser_${id}_head_look`)
      .setOrigin((HEAD.OX + HEAD_PIVOT.x) / HEAD.W, (HEAD.OY + HEAD_PIVOT.y) / HEAD.H).setScale(1 / RES);
    c.add(body);
    if (pearl) c.add(this.add.image(0, 0, 'cine_baiser_kezia_pearl').setOrigin(BODY.OX / BODY.W, BODY.OY / BODY.H).setScale(1 / RES));
    c.add(head);
    c.setScale(S * flip, S);
    return { id, c, head, flip, tilt: 0, lean: 0 };
  }

  // Place un personnage pour que ses lèvres soient exactement en (tx, ty).
  place(r, tx, ty) {
    const lx = LIPS.x - HEAD_PIVOT.x, ly = LIPS.y - HEAD_PIVOT.y;
    const ct = Math.cos(r.tilt), sn = Math.sin(r.tilt);
    const px = (lx * ct - ly * sn) * S * r.flip, py = (lx * sn + ly * ct) * S;
    const cl = Math.cos(r.lean), sl = Math.sin(r.lean);
    r.c.setPosition(tx - (px * cl - py * sl), ty - (px * sl + py * cl)).setRotation(r.lean);
    r.head.setRotation(r.tilt);
  }

  pose() {
    const s = this.st;
    // Guillo penche la tête vers elle, Kezia lève le menton ; les bustes s'inclinent un peu
    this.gr.tilt = s.tiltG * DEG; this.gr.lean = s.lean * DEG;
    this.kr.tilt = s.tiltK * DEG; this.kr.lean = -s.lean * 0.8 * DEG;
    this.place(this.gr, CX - s.gap / 2, CY + s.gUp + s.bob);
    this.place(this.kr, CX + s.gap / 2, CY + s.kUp + s.bob);
  }

  // ---------------------------------------------------------------- outils
  tw(cfg) { return new Promise((res) => this.tweens.add({ targets: this.st, ...cfg, onComplete: res })); }
  wait(ms) { return new Promise((res) => this.time.delayedCall(ms, res)); }
  sfx(k, o) { this.app.audio.sfx(k, o); }
  eyes(r, st) { r.head.setTexture(`cine_baiser_${r.id}_head_${st}`); }

  async run() {
    const cam = this.cameras.main;
    // 1. Face à face sous la lune ; Kezia cligne des yeux
    this.time.delayedCall(700, () => { this.eyes(this.kr, 'closed'); this.time.delayedCall(140, () => this.eyes(this.kr, 'look')); });
    await this.wait(T.intro);

    // 2. Rapprochement progressif : il se penche, elle se hisse ; les yeux se ferment
    this.sfx('beat', { volume: 0.4 });
    this.time.delayedCall(700, () => this.sfx('beat', { volume: 0.5 }));
    this.time.delayedCall(1250, () => this.sfx('beat', { volume: 0.6 }));
    cam.zoomTo(1.14 * this.viewZoom, T.approach + 400, 'Sine.easeInOut');
    cam.pan(CX, CY - 20, T.approach + 400, 'Sine.easeInOut');
    this.time.delayedCall(T.approach * 0.62, () => this.eyes(this.kr, 'closed'));
    this.time.delayedCall(T.approach * 0.74, () => this.eyes(this.gr, 'closed'));
    await this.tw({ gap: 0, gUp: 0, kUp: 0, tiltG: 12, tiltK: -9, lean: 4, duration: T.approach, ease: 'Sine.easeInOut' });

    // 3. Le baiser
    this.sfx('heart', { volume: 0.7 });
    this.tweens.add({ targets: this.glow, alpha: 0.42, scale: 5.4, duration: 900, ease: 'Sine.easeOut' });
    this.hearts = this.add.particles(0, 0, 'coeur', {
      x: { min: CX - 90, max: CX + 90 }, y: CY - 230, speedY: { min: -60, max: -30 }, speedX: { min: -18, max: 18 },
      lifespan: 2600, scale: { start: 0.15, end: 0.07 }, alpha: { start: 1, end: 0 }, frequency: 260,
    }).setDepth(30);
    await this.tw({ tiltG: 13, tiltK: -10, duration: T.kiss, ease: 'Sine.easeInOut' });

    // 4. Léger éloignement, ils rouvrent les yeux en souriant
    this.time.delayedCall(T.release * 0.45, () => { this.eyes(this.kr, 'happy'); this.eyes(this.gr, 'happy'); });
    cam.zoomTo(1.08 * this.viewZoom, T.release + 600, 'Sine.easeInOut');
    await this.tw({ gap: 22, tiltG: 7, tiltK: -5, lean: 2, gUp: -4, kUp: 4, duration: T.release, ease: 'Sine.easeInOut' });

    // 5. Image finale : tous les deux, sous la lune
    this.sfx('collect', { volume: 0.4, rate: 0.8 });
    this.tweens.add({ targets: this.glow, alpha: 0.28, duration: 1200 });
    await this.wait(T.end);
    this.hearts.stop();

    // 6. Fondu vers l'écran de fin
    cam.fadeOut(T.fade, 13, 6, 20);
    await this.wait(T.fade + 50);
    this.done && this.done();
  }

  update(t) {
    // respiration douce, commune aux deux pour que les lèvres restent jointes
    this.st.bob = Math.sin(t / 900) * 2;
    this.pose();
  }
}
