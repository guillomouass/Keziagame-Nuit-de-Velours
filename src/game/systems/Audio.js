// Musique (boucles avec fondu enchaîné) et bruitages, branchés sur le gestionnaire de sons de Phaser.

export class AudioSystem {
  constructor(game, save) {
    this.game = game;
    this.save = save;
    this.current = null;
    this.currentKey = null;
    this.loops = {};
  }

  get sound() { return this.game.sound; }
  get musicVol() { return this.save.state.settings.music; }
  get sfxVol() { return this.save.state.settings.sfx; }

  music(key, fade = 900) {
    if (!key) return this.stopMusic(fade);
    const full = `music_${key}`;
    if (this.currentKey === full) return;
    if (!this.game.cache.audio.exists(full)) return;
    this.stopMusic(fade);
    const m = this.sound.add(full, { loop: true, volume: 0 });
    m.play();
    this.current = m;
    this.currentKey = full;
    this.fadeTo(m, this.musicVol, fade);
  }

  stopMusic(fade = 700) {
    const m = this.current;
    this.current = null;
    this.currentKey = null;
    if (!m) return;
    this.fadeTo(m, 0, fade, () => m.destroy());
  }

  fadeTo(snd, target, ms, done) {
    const start = snd.volume, t0 = performance.now();
    const tick = () => {
      if (!snd || snd.pendingRemove) return;
      const k = Math.min(1, (performance.now() - t0) / Math.max(1, ms));
      try { snd.setVolume(start + (target - start) * k); } catch { return; }
      if (k < 1) requestAnimationFrame(tick);
      else done && done();
    };
    tick();
  }

  duck(on) {
    if (this.current) this.fadeTo(this.current, on ? this.musicVol * 0.35 : this.musicVol, 400);
  }

  setMusicVolume(v) {
    this.save.setting('music', v);
    if (this.current) this.current.setVolume(v);
  }

  setSfxVolume(v) { this.save.setting('sfx', v); }

  sfx(key, opts = {}) {
    const full = `sfx_${key}`;
    if (!this.game.cache.audio.exists(full)) return;
    try { this.sound.play(full, { volume: (opts.volume ?? 1) * this.sfxVol, rate: opts.rate ?? 1, detune: opts.detune ?? 0 }); } catch { /* audio non débloqué */ }
  }

  loop(key, on) {
    const full = `sfx_${key}`;
    if (on) {
      if (this.loops[key] || !this.game.cache.audio.exists(full)) return;
      const s = this.sound.add(full, { loop: true, volume: 0 });
      s.play();
      this.fadeTo(s, 0.6 * this.sfxVol, 800);
      this.loops[key] = s;
    } else if (this.loops[key]) {
      const s = this.loops[key];
      delete this.loops[key];
      this.fadeTo(s, 0, 600, () => s.destroy());
    }
  }

  stopLoops() { Object.keys(this.loops).forEach((k) => this.loop(k, false)); }
}
