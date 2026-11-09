import Phaser from 'phaser';
import { Rig } from '../characters/Rig.js';
import { controls } from '../systems/Controls.js';
import { fitCamera, softEdges } from '../systems/View.js';

// Stand « Perles & Coquillages » : la vendeuse cache une perle, mélange les coquillages,
// et Guillo doit choisir. (Spoiler : dans la vraie vie, il a trouvé du premier coup.)
export class ShellScene extends Phaser.Scene {
  constructor() { super('Shell'); }
  init(data) { this.ready = data.ready; }

  create() {
    const app = this.game.app;
    this.app = app;
    this.game.rigs = {};
    this.add.image(0, 0, 'bg_fair_far').setOrigin(0).setTint(0xd9efe9);
    this.add.image(640, 300, 'halo').setScale(5).setTint(0xfff3d0).setAlpha(0.35).setBlendMode(Phaser.BlendModes.ADD);
    const g = this.add.graphics();
    g.fillStyle(0x2f8f83).fillRect(140, 120, 1000, 70);
    this.add.text(640, 155, 'Perles & Coquillages', { fontFamily: 'Playfair Display, Georgia', fontSize: '40px', color: '#ffffff' }).setOrigin(0.5);
    this.vendor = new Rig(this, 640, 520, 'perliere', { scale: 0.7, expr: 'smile' });
    this.kezia = new Rig(this, 1060, 700, 'kezia', { scale: 0.8, face: -1, expr: 'smile' }).setDepth(30);
    this.guillo = new Rig(this, 220, 700, 'guillo', { scale: 0.8, face: 1, expr: 'smile' }).setDepth(30);
    Object.assign(this.game.rigs, { perliere: this.vendor, kezia: this.kezia, guillo: this.guillo });
    const t = this.add.graphics().setDepth(10);
    t.fillStyle(0x24706a).fillRoundedRect(230, 470, 820, 260, 18);
    t.fillStyle(0x9fe0d7).fillEllipse(640, 478, 840, 70);
    t.fillStyle(0xc9f2ec).fillEllipse(640, 472, 780, 46);
    this.slots = [370, 505, 640, 775, 910];
    this.shells = this.slots.map((x, i) => {
      const s = this.add.image(x, 470, 'coquillage').setScale(0.9).setDepth(12).setInteractive({ useHandCursor: true });
      s.slot = i;
      s.on('pointerdown', () => this.pick(s));
      return s;
    });
    this.pearl = this.add.image(640, 476, 'perle').setScale(0.35).setDepth(11).setAlpha(0);
    this.cursor = this.add.image(0, 400, 'coeur').setScale(0.28).setDepth(14).setAlpha(0);
    this.sel = 2;
    this.picking = null;
    this.keys = this.input.keyboard.addKeys('LEFT,RIGHT,A,D,Q,SPACE,ENTER,E');
    softEdges(this, { depth: 40, size: 56 });
    fitCamera(this, { needW: 960 }); // portrait : stand entier, Guillo et Kezia compris
    this.cameras.main.fadeIn(600, 13, 6, 20);
    app.audio.music('fair');
    app.ui.showHud(true);
    this.ready && this.ready(this);
  }

  async round() {
    const under = 2;
    const s = this.shells.find((x) => x.slot === under);
    await this.tw({ targets: s, y: 400, duration: 400, ease: 'Back.easeOut' });
    this.pearl.setPosition(s.x, 476).setAlpha(1);
    this.app.audio.sfx('shell', { volume: 0.6 });
    await this.wait(900);
    this.pearl.setAlpha(0);
    await this.tw({ targets: s, y: 470, duration: 300 });
    for (let i = 0; i < 7; i++) await this.swap(420 - i * 30);
    this.app.ui.objective('Choisis un coquillage ! (← → puis Espace, ou touche-le)');
    const picked = await new Promise((res) => { this.picking = res; this.cursor.setAlpha(1); });
    this.cursor.setAlpha(0);
    this.app.ui.objective('');
    // Le destin (et la vraie histoire) : la perle est dans le coquillage choisi.
    this.app.audio.sfx('shell');
    this.add.particles(picked.x, 440, 'sparkle', { speed: { min: 80, max: 260 }, scale: { start: 0.6, end: 0 }, lifespan: 1200, quantity: 24, emitting: false, tint: [0xffffff, 0xffd27a] }).setDepth(20).explode(28);
    picked.setTexture('coquillage_ouvert');
    await this.tw({ targets: picked, scale: 1.6, y: 420, duration: 600, ease: 'Back.easeOut' });
    this.cameras.main.flash(400, 255, 246, 220);
    return picked;
  }

  swap(ms) {
    const a = Phaser.Math.Between(0, 4);
    let b = Phaser.Math.Between(0, 3);
    if (b >= a) b++;
    const sa = this.shells.find((x) => x.slot === a), sb = this.shells.find((x) => x.slot === b);
    sa.slot = b; sb.slot = a;
    this.app.audio.sfx('whoosh', { volume: 0.25, rate: 1.6 });
    return Promise.all([
      this.tw({ targets: sa, x: this.slots[b], duration: ms, ease: 'Sine.easeInOut' }),
      this.tw({ targets: sb, x: this.slots[a], duration: ms, ease: 'Sine.easeInOut' }),
      this.tw({ targets: sa, y: 440, duration: ms / 2, yoyo: true }),
    ]);
  }

  pick(s) {
    if (!this.picking) return;
    const r = this.picking;
    this.picking = null;
    r(s);
  }

  tw(cfg) { return new Promise((res) => this.tweens.add({ ...cfg, onComplete: res })); }
  wait(ms) { return new Promise((res) => this.time.delayedCall(ms, res)); }

  update(t, dt) {
    for (const r of [this.vendor, this.kezia, this.guillo]) r.update(dt);
    if (!this.picking) return;
    const k = this.keys;
    const J = Phaser.Input.Keyboard.JustDown;
    if (J(k.LEFT) || J(k.A) || J(k.Q) || (controls.left && !this._l)) { this.sel = (this.sel + 4) % 5; this.app.audio.sfx('blip'); }
    if (J(k.RIGHT) || J(k.D) || (controls.right && !this._r)) { this.sel = (this.sel + 1) % 5; this.app.audio.sfx('blip'); }
    this._l = controls.left; this._r = controls.right;
    const s = this.shells.find((x) => x.slot === this.sel);
    this.cursor.setPosition(s.x, 390 + Math.sin(t / 200) * 6);
    if (J(k.SPACE) || J(k.ENTER) || J(k.E) || controls.consumeAction() || controls.consumeJump()) this.pick(s);
  }
}
