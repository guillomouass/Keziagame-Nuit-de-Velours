import Phaser from 'phaser';
import { controls } from '../systems/Controls.js';
import { fitCamera, viewEdges, softEdges } from '../systems/View.js';

// Mini-jeu de bowling : viser (flèche qui oscille), doser la puissance, lancer. 3 lancers.
export class BowlingScene extends Phaser.Scene {
  constructor() { super('Bowling'); }
  init(data) { this.done = data.done; this.frames = data.frames ?? 3; }

  create() {
    const app = this.game.app;
    this.app = app;
    this.game.rigs = {};
    this.add.image(0, 0, 'bg_bowling_far').setOrigin(0).setAlpha(0.9);
    const g = this.add.graphics();
    // piste en perspective
    g.fillStyle(0x05030c).fillRect(0, 160, 1280, 560);
    g.fillStyle(0x222233).fillPoints([{ x: 520, y: 200 }, { x: 760, y: 200 }, { x: 1010, y: 720 }, { x: 270, y: 720 }], true);
    g.fillGradientStyle(0xc99a61, 0xc99a61, 0xf0c98e, 0xf0c98e).fillPoints([{ x: 545, y: 200 }, { x: 735, y: 200 }, { x: 960, y: 720 }, { x: 320, y: 720 }], true);
    g.lineStyle(1, 0xb07e48, 0.6);
    for (let i = 1; i < 10; i++) g.lineBetween(545 + i * 19, 200, 320 + i * 64, 720);
    for (let i = 0; i < 7; i++) g.fillStyle(0x7a3a1e).fillTriangle(560 + i * 27, 470, 566 + i * 27, 450, 572 + i * 27, 470);
    this.add.image(640, 200, 'halo').setScale(2).setTint(0xffffff).setAlpha(0.25).setBlendMode(Phaser.BlendModes.ADD);

    this.title = this.add.text(640, 40, 'Afterparty · Piste 7', { fontFamily: 'Playfair Display, Georgia', fontSize: '34px', color: '#fff6ea', stroke: '#1d1028', strokeThickness: 6 }).setOrigin(0.5);
    this.info = this.add.text(640, 92, '', { fontFamily: 'Nunito, sans-serif', fontSize: '20px', color: '#ffe14f', stroke: '#1d1028', strokeThickness: 5 }).setOrigin(0.5);
    this.scoreTxt = this.add.text(1240, 140, '', { fontFamily: 'Nunito, sans-serif', fontSize: '22px', color: '#3de0ff', align: 'right', stroke: '#1d1028', strokeThickness: 5 }).setOrigin(1, 0);
    this.cheer = this.add.text(40, 560, '', { fontFamily: 'Nunito, sans-serif', fontSize: '20px', color: '#fff', backgroundColor: '#7356a6cc', padding: { x: 14, y: 10 }, wordWrap: { width: 300 } }).setAlpha(0);
    this.staecyHead = this.add.image(90, 520, 'staecy_head_smile').setScale(0.5);

    this.arrow = this.add.graphics();
    this.powerBg = this.add.rectangle(1140, 600, 34, 220, 0x1d1028).setStrokeStyle(3, 0xffffff, 0.5);
    this.powerFill = this.add.rectangle(1140, 710, 26, 0, 0x4fc38a).setOrigin(0.5, 1);
    // portrait : la piste reste centrée ; jauge, score et encouragements se replacent dans la zone visible
    softEdges(this, { depth: 40, size: 44 });
    for (const t of [this.title, this.info, this.scoreTxt, this.cheer, this.staecyHead]) t.setDepth(50); // au-dessus du fondu des bords
    fitCamera(this, { needW: 700 });
    this.placeUi();
    this.scale.on('resize', this.placeUi, this);
    this.events.once('shutdown', () => this.scale.off('resize', this.placeUi, this));
    this.ball = this.add.image(640, 650, 'boule').setScale(0.6);
    this.pins = [];
    this.score = 0;
    this.strikes = 0;
    this.frame = 0;
    this.results = [];
    this.keys = this.input.keyboard.addKeys('SPACE,ENTER,E');
    this.input.on('pointerdown', () => this.press());
    app.audio.music('night');
    app.ui.showHud(true);
    app.ui.objective('Bowling : appuie une fois pour viser, une seconde fois pour la puissance.');
    this.cameras.main.fadeIn(500, 13, 6, 20);
    this.newFrame();
  }

  // Ancre les éléments d'interface aux bords visibles. Ordinateur (1280 de large) : positions d'origine.
  placeUi() {
    if (!this.powerBg || !this.powerBg.scene) return;
    const E = viewEdges(this);
    const narrow = E.w < 1200;
    const px = narrow ? E.right - 46 : E.right - 140;
    const py = narrow ? 560 : 600;
    this.powerBg.setPosition(px, py);
    this.powerFill.setPosition(px, py + 110);
    // En portrait, le bandeau d'objectif (HUD) couvre le haut de l'écran : titre, statut et score descendent.
    this.title.setVisible(!narrow);
    if (narrow) {
      this.info.setPosition(E.cx, 700);
      this.scoreTxt.setOrigin(0, 1).setAlign('left').setPosition(E.left + 14, 708);
      this.cheer.setOrigin(0.5, 0).setPosition(E.cx, 500).setStyle({ wordWrap: { width: Math.min(360, E.w - 60) }, align: 'center' });
      this.staecyHead.setPosition(E.left + 44, 560).setScale(0.4);
    } else {
      this.info.setPosition(640, 92);
      this.scoreTxt.setOrigin(1, 0).setAlign('right').setPosition(E.right - 40, 140);
      this.cheer.setOrigin(0, 0).setPosition(E.left + 40, 560).setStyle({ wordWrap: { width: 300 }, align: 'left' });
      this.staecyHead.setPosition(E.left + 90, 520).setScale(0.5);
    }
  }

  newFrame() {
    this.pins.forEach((p) => p.destroy());
    this.pins = [];
    const rows = [[0], [-1, 1], [-2, 0, 2], [-3, -1, 1, 3]];
    rows.forEach((row, r) => row.forEach((c) => {
      const p = this.add.image(640 + c * 13, 215 - r * 7, 'quille').setScale(0.24).setOrigin(0.5, 1).setDepth(5 - r);
      p.col = c; p.row = r;
      this.pins.push(p);
    }));
    this.ball.setPosition(640, 650).setScale(0.6).setAlpha(1).setRotation(0);
    this.phase = 'aim';
    this.t0 = this.time.now;
    this.info.setText(`Lancer ${this.frame + 1} / ${this.frames} — Vise !`);
    this.updateScore();
  }

  updateScore() { this.scoreTxt.setText(`Score : ${this.score}\n${this.results.map((r) => (r === 10 ? 'X' : r)).join('  ')}`); }

  say(t) {
    this.cheer.setText(`Staecy : ${t}`).setAlpha(1);
    this.tweens.killTweensOf(this.cheer);
    this.tweens.add({ targets: this.cheer, alpha: 0, delay: 2200, duration: 600 });
  }

  press() {
    if (this.app.paused) return;
    if (this.phase === 'aim') { this.phase = 'power'; this.t1 = this.time.now; this.app.audio.sfx('select'); this.info.setText('Puissance !'); }
    else if (this.phase === 'power') { this.throw(); }
  }

  throw() {
    this.phase = 'roll';
    this.arrow.clear();
    const angle = this.aim;
    const power = this.power;
    const endX = 640 + angle * 420;
    this.app.audio.sfx('roll');
    this.tweens.add({ targets: this.ball, x: endX, y: 222, scale: 0.16, rotation: 6 * (0.5 + power), duration: 1500 - power * 700, ease: 'Quad.easeIn', onComplete: () => this.hit(endX, power) });
  }

  hit(x, power) {
    const off = Math.abs(x - 640);
    let n;
    if (off > 92) n = 0;
    else {
      const acc = 1 - off / 92;
      n = Math.round(Phaser.Math.Clamp(acc * 0.85 + power * 0.3 - 0.1 + Math.random() * 0.12, 0, 1) * 10);
      if (acc > 0.86 && power > 0.55) n = 10;
    }
    if (n > 0) this.app.audio.sfx('strike', { volume: 0.4 + n / 20 });
    else this.app.audio.sfx('miss');
    // les quilles les plus proches de la trajectoire tombent en premier
    const sorted = [...this.pins].sort((a, b) => Math.abs(a.x - x) - Math.abs(b.x - x));
    sorted.slice(0, n).forEach((p, i) => {
      this.tweens.add({ targets: p, angle: (p.x < x ? -1 : 1) * (70 + Math.random() * 60), x: p.x + (p.x < x ? -1 : 1) * (20 + Math.random() * 40), y: p.y - 10 - Math.random() * 30, alpha: 0, delay: i * 25, duration: 600 });
    });
    this.tweens.add({ targets: this.ball, alpha: 0, duration: 300 });
    this.score += n;
    this.results.push(n);
    if (n === 10) { this.strikes++; this.cameras.main.shake(250, 0.006); }
    const lines = n === 10
      ? ['STRIKE ! Ok monsieur l’organisateur 😮', 'Attends… t’es pro en fait ?!']
      : n >= 7 ? ['Pas mal du tout !'] : n > 0 ? ['C’est… un début 😅', 'On applaudit l’effort !'] : ['Dans la rigole ! 😂', 'La boule a pris la sortie de secours.'];
    this.say(lines[Math.floor(Math.random() * lines.length)]);
    this.info.setText(n === 10 ? 'STRIKE !' : `${n} quille${n > 1 ? 's' : ''} !`);
    this.updateScore();
    this.phase = 'wait';
    this.time.delayedCall(2200, () => {
      this.frame++;
      if (this.frame < this.frames) this.newFrame();
      else this.finish();
    });
  }

  finish() {
    this.phase = 'end';
    this.info.setText(`Total : ${this.score} quilles`);
    this.app.audio.sfx('success');
    this.app.ui.objective('');
    this.time.delayedCall(1600, () => {
      this.cameras.main.fadeOut(500, 13, 6, 20);
      this.time.delayedCall(520, () => this.done && this.done({ score: this.score, strikes: this.strikes }));
    });
  }

  update(t) {
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE) || Phaser.Input.Keyboard.JustDown(this.keys.ENTER) || Phaser.Input.Keyboard.JustDown(this.keys.E) || controls.consumeAction() || controls.consumeJump()) this.press();
    if (this.phase === 'aim') {
      this.aim = Math.sin((t - this.t0) / 380) * 0.3;
      this.arrow.clear().lineStyle(8, 0xffe14f, 0.9);
      const ex = 640 + this.aim * 420, ey = 300;
      this.arrow.lineBetween(640, 620, ex, ey);
      this.arrow.fillStyle(0xffe14f).fillCircle(ex, ey, 10);
      this.powerFill.height = 0;
    } else if (this.phase === 'power') {
      this.power = (Math.sin((t - this.t1) / 260 - Math.PI / 2) + 1) / 2;
      this.powerFill.height = 210 * this.power;
      this.powerFill.fillColor = this.power > 0.55 ? 0x4fc38a : this.power > 0.3 ? 0xf4c25a : 0xd4643f;
    }
  }
}
