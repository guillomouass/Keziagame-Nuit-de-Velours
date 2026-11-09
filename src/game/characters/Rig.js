import Phaser from 'phaser';

// Personnage articulé (pantin 2D) : jambes, bras, buste, tête interchangeable selon l'expression.
// Animations procédurales : marche, respiration, clignement des yeux, saut, petites émotions.
// Coordonnées internes non mises à l'échelle : les pieds sont en (0,0).

const WORLD_EXPR = ['neutral', 'smile', 'laugh', 'surprised', 'blink', 'tease', 'shy'];

export class Rig extends Phaser.GameObjects.Container {
  constructor(scene, x, y, id, opts = {}) {
    super(scene, x, y);
    this.id = id;
    this.baseScale = opts.scale ?? 0.6;
    this.seated = !!opts.seated;
    this.dir = opts.face ?? 1;
    this.expr = opts.expr || 'neutral';
    this.walkPhase = 0;
    this.speed = 0;
    this.airborne = false;
    this.t = Math.random() * 10;
    this.nextBlink = 1500 + Math.random() * 2500;
    this.tempExprTimer = null;
    this.talking = false;
    this.mood = opts.mood || 'idle'; // idle | dance | cheer | phone

    const tex = (k) => (scene.textures.exists(k) ? k : '__MISSING');
    this.shadow = scene.add.image(0, 2, 'shadow').setScale(0.75, 0.6).setAlpha(0.8);
    this.legL = scene.add.image(-12, -100, tex(`${id}_leg`)).setOrigin(18 / 44, 0.02);
    this.legR = scene.add.image(12, -100, tex(`${id}_leg`)).setOrigin(18 / 44, 0.02);
    this.armB = scene.add.image(-44, -195, tex(`${id}_arm`)).setOrigin(0.5, 0.08);
    this.armF = scene.add.image(44, -195, tex(`${id}_arm`)).setOrigin(0.5, 0.08);
    const torsoKey = opts.pearl && scene.textures.exists(`${id}_torso_pearl`) ? `${id}_torso_pearl` : `${id}_torso`;
    this.torso = scene.add.image(0, -205, tex(torsoKey)).setOrigin(0.5, 0);
    this.head = scene.add.image(0, -198, this.headKey(this.expr)).setOrigin(0.5, 0.95);
    const parts = this.seated ? [this.armB, this.armF, this.torso, this.head] : [this.shadow, this.legL, this.legR, this.armB, this.armF, this.torso, this.head];
    if (this.seated) { this.shadow.setVisible(false); this.legL.setVisible(false); this.legR.setVisible(false); }
    this.add(parts);
    this.setScale(this.baseScale * this.dir, this.baseScale);
    scene.add.existing(this);
  }

  headKey(e) {
    const k = `${this.id}_head_${e}`;
    if (this.scene.textures.exists(k)) return k;
    const alt = { tease: 'smile', shy: 'smile', tender: 'smile', thinking: 'neutral' }[e];
    if (alt && this.scene.textures.exists(`${this.id}_head_${alt}`)) return `${this.id}_head_${alt}`;
    return `${this.id}_head_neutral`;
  }

  setPearl(on) {
    const k = on ? `${this.id}_torso_pearl` : `${this.id}_torso`;
    if (this.scene.textures.exists(k)) this.torso.setTexture(k);
  }

  setExpression(e, ms = 0) {
    if (!e) return this;
    if (!WORLD_EXPR.includes(e) && !['tender', 'thinking'].includes(e)) e = 'neutral';
    if (ms) {
      clearTimeout(this.tempExprTimer);
      const prev = this.expr;
      this.head.setTexture(this.headKey(e));
      this.tempExprTimer = setTimeout(() => this.active && this.head.setTexture(this.headKey(prev)), ms);
      return this;
    }
    this.expr = e;
    this.head.setTexture(this.headKey(e));
    return this;
  }

  face(dir) {
    if (!dir || dir === this.dir) return this;
    this.dir = dir > 0 ? 1 : -1;
    this.scaleX = this.baseScale * this.dir;
    return this;
  }

  faceTowards(x) { return this.face(x >= this.x ? 1 : -1); }

  emote(symbol, color = '#ff5f7e') {
    const s = this.scene;
    const top = this.y - 390 * this.baseScale;
    const t = s.add.text(this.x, top, symbol, { fontFamily: 'Nunito, sans-serif', fontSize: '34px', color, stroke: '#1d1028', strokeThickness: 5 }).setOrigin(0.5).setDepth(this.depth + 1);
    s.tweens.add({ targets: t, y: top - 50, alpha: { from: 1, to: 0 }, scale: { from: 0.6, to: 1.2 }, duration: 1300, ease: 'Cubic.easeOut', onComplete: () => t.destroy() });
    return this;
  }

  hearts(n = 5) {
    for (let i = 0; i < n; i++) this.scene.time.delayedCall(i * 140, () => this.active && this.emote('♥', ['#ff5f7e', '#ff8fa3', '#f4c25a'][i % 3]));
  }

  hop(h = 26) {
    this.scene.tweens.add({ targets: [this.torso, this.head, this.armB, this.armF], y: `-=${h}`, yoyo: true, duration: 180, ease: 'Sine.easeOut' });
  }

  update(dt) {
    this.t += dt / 1000;
    const moving = Math.abs(this.speed) > 5 && !this.airborne;
    if (moving) this.walkPhase += (dt / 1000) * Math.min(14, 5 + Math.abs(this.speed) / 28);
    const sw = moving ? Math.sin(this.walkPhase) : 0;
    const bob = moving ? Math.abs(Math.sin(this.walkPhase)) * 7 : Math.sin(this.t * 2.2) * 1.6;
    let armSwing = sw * 0.55;
    let armBase = 0.08;
    if (this.airborne) { this.legL.rotation = 0.5; this.legR.rotation = -0.25; armSwing = 0; armBase = 1.6; }
    else { this.legL.rotation = sw * 0.55; this.legR.rotation = -sw * 0.55; }
    let ab = armSwing, af = -armSwing;
    if (this.mood === 'dance' && !moving) {
      const d = Math.sin(this.t * 6);
      ab = 0.6 + d * 0.4; af = -0.6 - d * 0.4;
    } else if (this.mood === 'cheer' && !moving) {
      const d = Math.sin(this.t * 9);
      ab = 2.6 + d * 0.2; af = -2.6 - d * 0.2;
    } else if (this.mood === 'phone' && !moving) {
      af = -2.5; ab = 0.05;
    } else if (this.talking && !moving) {
      af = -0.35 + Math.sin(this.t * 5) * 0.25;
    }
    this.armB.rotation = ab + armBase * 0.3;
    this.armF.rotation = af - armBase * 0.3;
    const dance = this.mood === 'dance' && !moving ? Math.abs(Math.sin(this.t * 6)) * 6 : 0;
    this.torso.y = -205 - bob - dance;
    this.armB.y = this.armF.y = -195 - bob - dance;
    this.head.y = -198 - bob - dance + (moving ? 0 : Math.sin(this.t * 2.2 + 0.6) * 0.8);
    this.head.rotation = moving ? Math.sin(this.walkPhase * 0.5) * 0.02 : Math.sin(this.t * 0.9) * 0.03 + (this.mood === 'dance' ? Math.sin(this.t * 6) * 0.06 : 0);
    this.torso.scaleY = 1 + Math.sin(this.t * 2.2) * 0.008;

    this.nextBlink -= dt;
    if (this.nextBlink <= 0 && ['neutral', 'surprised', 'tease', 'shy'].includes(this.expr)) {
      this.head.setTexture(this.headKey('blink'));
      this.scene.time.delayedCall(130, () => this.active && this.head.setTexture(this.headKey(this.expr)));
      this.nextBlink = 2200 + Math.random() * 3000;
    } else if (this.nextBlink <= 0) this.nextBlink = 2000;
  }
}
