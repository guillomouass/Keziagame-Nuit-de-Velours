import Phaser from 'phaser';

// Charge le manifest généré par `npm run assets`, puis toutes les illustrations et tous les sons.
export class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  preload() {
    this.load.json('manifest', 'assets/manifest.json');
  }

  create() {
    const app = this.game.app;
    const m = this.cache.json.get('manifest');
    for (const { key, url } of m.images) this.load.svg(key, url);
    for (const { key, url } of m.audio || []) this.load.audio(key, url);
    this.load.on('progress', (p) => app.ui.setProgress(p));
    this.load.on('loaderror', (f) => console.warn('Ressource introuvable :', f.key, f.src));
    this.load.once('complete', () => {
      this.makeTextures();
      app.onReady();
    });
    this.load.start();
  }

  makeTextures() {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(0xffffff, 1).fillCircle(4, 4, 4);
    g.generateTexture('px', 8, 8);
    g.destroy();
  }
}
