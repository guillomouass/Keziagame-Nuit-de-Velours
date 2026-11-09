import Phaser from 'phaser';
import { Rig } from '../characters/Rig.js';
import { controls } from '../systems/Controls.js';
import { WORLDS, GROUND_Y, VIEW } from '../../data/layout.js';
import { layout } from '../systems/Layout.js';

const FACT = { far: 0.22, mid: 0.55, near: 1, fg: 1.3 };
const SPEED = 290;
const JUMP = 820;
const LIFT = 130;

/**
 * Scène d'exploration générique (plateforme légère, défilement horizontal, parallaxe 4 couches).
 * Tout le contenu (PNJ, objets, plateformes, déclencheurs, sortie) vient de la config du chapitre.
 */
export class WorldScene extends Phaser.Scene {
  constructor() { super('World'); }

  init(data) {
    this.cfg = data.cfg;
    this.G = data.G;
    this.done = data.done;
    this.busy = false;
    this.finished = false;
  }

  create() {
    const cfg = this.cfg;
    const app = this.game.app;
    this.app = app;
    const W = cfg.width || WORLDS[cfg.bg].width;
    this.W = W;
    this.game.rigs = {};
    // La caméra peut descendre de LIFT px pendant les dialogues : les personnages remontent
    // au-dessus de la boîte de texte. La zone sous le décor est masquée par cette boîte.
    this.cameras.main.setBounds(0, 0, W, VIEW.H + LIFT).setBackgroundColor(cfg.bgColor || '#0d0614');
    this.physics.world.setBounds(0, -400, W, VIEW.H + 400);
    this.add.rectangle(0, VIEW.H - 2, W * 2, LIFT + 40, 0x0d0614).setOrigin(0, 0).setDepth(-11);

    // décor en couches
    for (const layer of ['far', 'mid', 'near']) {
      const k = `bg_${cfg.bg}_${layer}`;
      if (this.textures.exists(k)) this.add.image(0, 0, k).setOrigin(0).setScrollFactor(FACT[layer], 1).setDepth(layer === 'near' ? -10 : layer === 'mid' ? -20 : -30);
    }
    const fgk = `bg_${cfg.bg}_fg`;
    if (this.textures.exists(fgk)) this.add.image(0, 0, fgk).setOrigin(0).setScrollFactor(FACT.fg, 1).setDepth(60);

    for (const l of cfg.lights || []) {
      const h = this.add.image(l.x, l.y, 'halo').setScale(l.r / 128).setTint(l.color ?? 0xffd27a).setAlpha(l.a ?? 0.35).setBlendMode(Phaser.BlendModes.ADD).setDepth(l.front ? 55 : -5);
      this.tweens.add({ targets: h, alpha: (l.a ?? 0.35) * 0.6, duration: 1800 + Math.random() * 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }
    this.add.particles(0, 0, 'px', {
      x: { min: 0, max: W }, y: { min: 60, max: GROUND_Y },
      lifespan: 7000, speedY: { min: -18, max: -4 }, speedX: { min: -6, max: 6 },
      scale: { start: 0.5, end: 0 }, alpha: { start: 0.55, end: 0 },
      frequency: cfg.dust === false ? -1 : 140, tint: cfg.dustTint ?? [0xffd27a, 0xffffff, 0xff9fb2], blendMode: 'ADD',
    }).setDepth(40);

    // physique : sol + plateformes
    this.solids = this.physics.add.staticGroup();
    const ground = this.add.zone(W / 2, GROUND_Y + 30, W, 60);
    this.solids.add(ground);
    this.gfx = this.add.graphics().setDepth(-4);
    for (const p of cfg.platforms || []) this.addPlatform(p);

    // joueur
    const sx = cfg.start?.x ?? 160;
    this.body = this.add.zone(sx, GROUND_Y - 80, 46, 150);
    this.physics.add.existing(this.body);
    this.body.body.setCollideWorldBounds(true).setMaxVelocity(600, 1400);
    this.physics.add.collider(this.body, this.solids);
    this.player = new Rig(this, sx, GROUND_Y, cfg.player || 'guillo', { face: cfg.start?.face ?? 1 }).setDepth(20);
    this.game.rigs[cfg.player || 'guillo'] = this.player;
    this.lastDir = cfg.start?.face ?? 1;

    if (cfg.follower) {
      this.follower = new Rig(this, sx - 110, GROUND_Y, cfg.follower, { pearl: app.save.flag('pearl') && cfg.follower === 'kezia' }).setDepth(19);
      this.game.rigs[cfg.follower] = this.follower;
    }

    // PNJ
    this.npcs = (cfg.npcs || []).map((n) => {
      const rig = new Rig(this, n.x, n.y ?? GROUND_Y, n.tex || n.id, { face: n.face ?? -1, expr: n.expr, mood: n.mood, scale: n.scale, pearl: n.id === 'kezia' && app.save.flag('pearl') }).setDepth(n.depth ?? 15);
      if (n.hidden) rig.setVisible(false);
      this.game.rigs[n.key || n.id] = rig;
      return { ...n, rig, kind: 'npc' };
    });
    this.hotspots = (cfg.hotspots || []).map((h) => ({ ...h, kind: 'spot' }));

    // objets à ramasser
    this.items = (cfg.items || []).filter((it) => !(it.memory && it.secret && app.save.hasMemory(it.memory) && !it.always)).map((it) => {
      const img = this.add.image(it.x, it.y ?? GROUND_Y - 60, it.tex).setScale(it.scale ?? 0.42).setDepth(18);
      const glow = this.add.image(it.x, it.y ?? GROUND_Y - 60, 'halo').setScale(0.35).setTint(0xffd27a).setAlpha(0.5).setBlendMode(Phaser.BlendModes.ADD).setDepth(17);
      this.tweens.add({ targets: [img, glow], y: '-=10', duration: 1100, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
      this.tweens.add({ targets: glow, alpha: 0.2, duration: 900, yoyo: true, repeat: -1 });
      return { ...it, img, glow, taken: false };
    });
    this.triggers = (cfg.triggers || []).map((t) => ({ ...t, fired: false }));

    this.cameras.main.startFollow(this.player, true, 0.09, 0, 0, 0);
    this.cameras.main.setDeadzone(120, 2000);
    this.cameras.main.scrollY = 0;
    this.cameras.main.fadeIn(600, 13, 6, 20);

    this.keys = this.input.keyboard.addKeys({
      left: 'LEFT', right: 'RIGHT', up: 'UP', a: 'A', q: 'Q', d: 'D', w: 'W', z: 'Z', space: 'SPACE', e: 'E', enter: 'ENTER',
    });

    app.ui.setTouch(true);
    app.ui.showHud(true);
    if (cfg.objective) app.ui.objective(cfg.objective);
    if (cfg.music) app.audio.music(cfg.music);

    this.events.once('shutdown', () => { app.ui.prompt(null); app.ui.objective(''); app.ui.setTouch(false); });
    if (cfg.onStart) this.run(() => cfg.onStart(this.G, this));
  }

  addPlatform(p) {
    const z = this.add.zone(p.x + p.w / 2, p.y + (p.h ?? 24) / 2, p.w, p.h ?? 24);
    this.solids.add(z);
    const b = z.body;
    b.checkCollision.down = false;
    b.checkCollision.left = false;
    b.checkCollision.right = false;
    const g = this.gfx;
    const h = p.h ?? 24;
    switch (p.style) {
      case 'crate':
        g.fillStyle(0x8a5a3a).fillRoundedRect(p.x, p.y, p.w, GROUND_Y - p.y, 6);
        g.fillStyle(0xb07a4e).fillRect(p.x, p.y, p.w, 8);
        g.lineStyle(4, 0x5a3a26).strokeRoundedRect(p.x + 4, p.y + 4, p.w - 8, GROUND_Y - p.y - 8, 4);
        g.lineBetween(p.x + 6, p.y + 6, p.x + p.w - 6, GROUND_Y - 6);
        break;
      case 'shelf':
        g.fillStyle(0x5a3a26).fillRoundedRect(p.x, p.y, p.w, 14, 4);
        g.fillStyle(0x8a6a4a).fillRect(p.x, p.y, p.w, 4);
        g.fillStyle(0x3a2416).fillRect(p.x + 14, p.y + 14, 8, 26).fillRect(p.x + p.w - 22, p.y + 14, 8, 26);
        break;
      case 'roof':
        g.fillStyle(0x2a2e42).fillRect(p.x, p.y, p.w, VIEW.H - p.y);
        g.fillStyle(0x5a6078).fillRect(p.x - 6, p.y - 4, p.w + 12, 10);
        for (let x = p.x + 20; x < p.x + p.w - 30; x += 70) g.fillStyle(0xffcf7a, 0.85).fillRect(x, p.y + 40, 26, 34);
        break;
      case 'scaffold':
        g.fillStyle(0x59607a).fillRect(p.x + 16, p.y + 10, 6, GROUND_Y - p.y - 10).fillRect(p.x + p.w - 22, p.y + 10, 6, GROUND_Y - p.y - 10);
        g.lineStyle(3, 0x59607a, 0.8).lineBetween(p.x + 19, p.y + 30, p.x + p.w - 19, GROUND_Y - 10).lineBetween(p.x + p.w - 19, p.y + 30, p.x + 19, GROUND_Y - 10);
        g.fillStyle(0x7a819c).fillRoundedRect(p.x, p.y, p.w, 14, 4);
        g.fillStyle(0xff6b5a, 0.9).fillCircle(p.x + 8, p.y + 7, 3).fillCircle(p.x + p.w - 8, p.y + 7, 3);
        break;
      case 'cloud':
        g.fillStyle(0xffe6f5, 0.85).fillRoundedRect(p.x, p.y, p.w, h, h / 2);
        g.fillStyle(0xffffff, 0.6).fillRoundedRect(p.x + 10, p.y + 3, p.w - 20, 6, 3);
        break;
      case 'table':
        g.fillStyle(0x5a3a2c).fillEllipse(p.x + p.w / 2, p.y + 6, p.w, 18);
        g.fillStyle(0x2b1d1a).fillRect(p.x + p.w / 2 - 4, p.y + 8, 8, GROUND_Y - p.y - 8);
        break;
      default: break; // invisible : déjà dessinée dans le décor
    }
  }

  run(fn) {
    this.busy = true;
    this.app.ui.prompt(null);
    this.body.body.setVelocityX(0);
    return Promise.resolve()
      .then(fn)
      .catch((e) => { if (!e || !e.cancelled) console.error(e); })
      .finally(() => { if (this.sys && this.sys.isActive()) { this.busy = false; this.target = null; controls.consumeAction(); controls.consumeJump(); } });
  }

  finish() {
    if (this.finished) return;
    this.finished = true;
    this.busy = true;
    this.app.ui.prompt(null);
    this.cameras.main.fadeOut(500, 13, 6, 20);
    this.time.delayedCall(520, () => this.done && this.done());
  }

  nearest() {
    const px = this.player.x;
    const py = this.body.body.bottom;
    let best = null, bd = 1e9;
    const consider = (o, x, range = 110) => {
      const d = Math.abs(x - px);
      if (d < range && d < bd) { bd = d; best = o; }
    };
    for (const n of this.npcs) if (n.talk && !n.done && n.rig.visible && (!n.when || n.when()) && py > GROUND_Y - 60) consider(n, n.rig.x, n.range);
    for (const h of this.hotspots) if (!h.done && (!h.when || h.when())) consider(h, h.x, h.range ?? 130);
    const ex = this.cfg.exit;
    if (ex && Math.abs(ex.x - px) < 90) consider({ kind: 'exit', label: ex.label || 'Continuer →' }, ex.x, 90);
    return best;
  }

  interact(t) {
    if (t.kind === 'exit') {
      const ex = this.cfg.exit;
      if (ex.when && !ex.when()) { if (ex.locked) this.run(() => ex.locked(this.G, this)); return; }
      this.app.audio.sfx('confirm');
      this.finish();
      return;
    }
    if (t.kind === 'npc') { t.rig.faceTowards(this.player.x); this.player.faceTowards(t.rig.x); t.rig.talking = true; }
    this.run(async () => {
      await t.talk(this.G, this, t);
      if (t.once !== false) t.done = true;
    }).finally(() => { if (t.rig) t.rig.talking = false; });
  }

  pick(it) {
    it.taken = true;
    this.app.audio.sfx('collect');
    this.tweens.add({ targets: it.img, y: it.img.y - 80, scale: (it.scale ?? 0.42) * 1.6, alpha: 0, duration: 600, ease: 'Back.easeIn', onComplete: () => it.img.destroy() });
    it.glow.destroy();
    this.player.emote('✦', '#f4c25a');
    if (it.memory) this.G.memory(it.memory).catch(() => {});
    if (it.onPick) this.run(() => it.onPick(this.G, this, it));
  }

  update(time, dt) {
    if (!this.player) return;
    const b = this.body.body;
    const k = this.keys;
    const onFloor = b.blocked.down || b.touching.down;
    let vx = 0;
    if (!this.busy && !this.finished && !this.app.paused) {
      if (k.left.isDown || k.a.isDown || k.q.isDown || controls.left) vx -= SPEED;
      if (k.right.isDown || k.d.isDown || controls.right) vx += SPEED;
      const jumpKey = Phaser.Input.Keyboard.JustDown(k.space) || Phaser.Input.Keyboard.JustDown(k.up) || Phaser.Input.Keyboard.JustDown(k.w) || Phaser.Input.Keyboard.JustDown(k.z) || controls.consumeJump();
      if (jumpKey && onFloor && !this.cfg.noJump) { b.setVelocityY(-JUMP); this.app.audio.sfx('jump', { volume: 0.5 }); }

      const t = this.nearest();
      if (t !== this.target) { this.target = t; this.app.ui.prompt(t ? t.label : null); }
      const act = Phaser.Input.Keyboard.JustDown(k.e) || Phaser.Input.Keyboard.JustDown(k.enter) || controls.consumeAction();
      if (act && t) this.interact(t);

      for (const it of this.items) if (!it.taken && Math.abs(it.img.x - this.player.x) < 50 && Math.abs(it.img.y - (b.bottom - 80)) < 110) this.pick(it);
      for (const tr of this.triggers) if (!tr.fired && this.player.x >= tr.x && (!tr.when || tr.when())) { tr.fired = true; this.run(() => tr.run(this.G, this)); break; }
    } else if (this.target) { this.target = null; this.app.ui.prompt(null); }
    b.setVelocityX(vx);
    if (vx) this.lastDir = Math.sign(vx);

    this.player.x = b.center.x;
    this.player.y = b.bottom;
    this.player.speed = vx;
    this.player.airborne = !onFloor;
    if (!this.busy) this.player.face(this.lastDir);
    this.player.update(dt);

    if (this.follower) {
      const f = this.follower;
      const target = this.player.x - 120 * this.lastDir;
      const d = target - f.x;
      const sp = Math.abs(d) > 30 ? Math.sign(d) * Math.min(SPEED * 0.95, Math.abs(d) * 4) : 0;
      f.x += (sp * dt) / 1000;
      f.speed = sp;
      if (sp) f.face(Math.sign(sp));
      else if (!this.busy) f.faceTowards(this.player.x);
      f.update(dt);
    }
    for (const n of this.npcs) n.rig.update(dt);
    const cam = this.cameras.main;
    // En portrait le dialogue a son propre panneau sous la scène : inutile de remonter la caméra.
    const lift = this.app.ui.dialogActive && !layout.portrait ? LIFT : 0;
    cam.scrollY += (lift - cam.scrollY) * Math.min(1, dt / 160);
    if (this.cfg.onUpdate) this.cfg.onUpdate(this, dt);
  }
}
