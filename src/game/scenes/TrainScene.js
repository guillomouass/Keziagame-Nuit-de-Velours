import Phaser from 'phaser';
import { Rig } from '../characters/Rig.js';
import { fitCamera, softEdges } from '../systems/View.js';

// Le train du retour : paysage au coucher du soleil qui défile derrière les vitres,
// Guillo et Kezia assis face à face.
export class TrainScene extends Phaser.Scene {
  constructor() { super('Train'); }
  init(data) { this.ready = data.ready; }

  create() {
    const app = this.game.app;
    this.game.rigs = {};
    this.add.image(640, 360, 'train_sky');
    this.hills = this.add.tileSprite(640, 360, 1280, 720, 'train_hills');
    this.trees = this.add.tileSprite(640, 360, 1280, 720, 'train_trees');
    this.poles = this.add.tileSprite(640, 360, 1280, 720, 'train_poles');
    const sun = this.add.image(900, 420, 'halo').setScale(2.4).setTint(0xffc58a).setAlpha(0.35).setBlendMode(Phaser.BlendModes.ADD);
    this.tweens.add({ targets: sun, alpha: 0.2, duration: 3000, yoyo: true, repeat: -1 });
    this.interior = this.add.image(640, 360, 'train_interior');
    this.add.image(640, 300, 'halo').setScale(4).setTint(0xff9f6a).setAlpha(0.18).setBlendMode(Phaser.BlendModes.ADD);
    this.guillo = new Rig(this, 410, 650, 'guillo', { seated: true, scale: 0.95, face: 1 });
    this.kezia = new Rig(this, 870, 650, 'kezia', { seated: true, scale: 0.95, face: -1, pearl: app.save.flag('pearl') });
    this.game.rigs.guillo = this.guillo;
    this.game.rigs.kezia = this.kezia;
    this.add.image(640, 360, 'train_table');
    softEdges(this, { depth: 40, size: 56 });
    fitCamera(this, { needW: 760 }); // portrait : garde les deux personnages assis visibles
    this.cameras.main.fadeIn(900, 13, 6, 20);
    app.audio.music('tender');
    app.audio.loop('train', true);
    this.events.once('shutdown', () => app.audio.loop('train', false));
    app.ui.showHud(true);
    this.ready && this.ready(this);
  }

  update(t, dt) {
    const s = dt / 16.67;
    this.hills.tilePositionX += 0.6 * s;
    this.trees.tilePositionX += 3.2 * s;
    this.poles.tilePositionX += 11 * s;
    const sway = Math.sin(t / 420) * 1.2 + (Math.sin(t / 97) > 0.985 ? 2 : 0);
    this.guillo.y = 650 + sway;
    this.kezia.y = 650 + sway;
    this.interior.y = 360 + sway * 0.4;
    this.guillo.update(dt);
    this.kezia.update(dt);
  }
}
