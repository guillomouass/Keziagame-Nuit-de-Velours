import Phaser from 'phaser';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
import '@fontsource/playfair-display/400-italic.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import '@fontsource/nunito/800.css';
import './styles/main.css';

import { VIEW } from './data/layout.js';
import { createSave } from './game/systems/Save.js';
import { AudioSystem } from './game/systems/Audio.js';
import { Director } from './game/systems/Director.js';
import { controls } from './game/systems/Controls.js';
import { initLayout } from './game/systems/Layout.js';
import { UI } from './interface/UI.js';
import { necklaceCinematic } from './game/mechanics/finale.js';
import { NECKLACE_LINES, PROLOGUE } from './game/dialogues/common.js';
import { BootScene } from './game/scenes/BootScene.js';
import { WorldScene } from './game/scenes/WorldScene.js';
import { BackdropScene } from './game/scenes/BackdropScene.js';
import { TrainScene } from './game/scenes/TrainScene.js';
import { BowlingScene } from './game/scenes/BowlingScene.js';
import { ShellScene } from './game/scenes/ShellScene.js';
import { KissScene } from './game/scenes/KissScene.js';

const GAME_SCENES = ['World', 'Backdrop', 'Train', 'Bowling', 'Shell', 'Kiss'];

class App {
  constructor() {
    this.save = createSave();
    this.paused = false;
    this.inMenu = true;
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'game-root',
      width: VIEW.W,
      height: VIEW.H,
      backgroundColor: '#0d0614',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      physics: { default: 'arcade', arcade: { gravity: { y: 1900 }, debug: false } },
      input: { activePointers: 3 },
      render: { antialias: true, roundPixels: false },
      scene: [BootScene, WorldScene, BackdropScene, TrainScene, BowlingScene, ShellScene, KissScene],
    });
    this.game.app = this;
    this.applyLayout = initLayout(this.game); // portrait / paysage (voir systems/Layout.js)
    this.game.rigs = {};
    this.audio = new AudioSystem(this.game, this.save);
    this.ui = new UI(document.getElementById('ui'), { save: this.save, audio: this.audio });
    this.ui.onPause = (tab) => this.pause(tab);
    this.director = new Director(this);
    window.__kezia = this; // pratique pour le débogage depuis la console

    window.addEventListener('keydown', (e) => {
      if ((e.key === 'Escape' || e.key === 'p' || e.key === 'P') && !this.inMenu && !this.paused) { e.preventDefault(); this.pause(); }
    });
    window.addEventListener('blur', () => controls.reset());
  }

  onReady() {
    this.applyLayout();
    this.ui.hideLoader();
    this.ui.setComplicity(this.save.state.complicity);
    this.toMenu();
  }

  toMenu() {
    this.inMenu = true;
    this.paused = false;
    this.director.cancel();
    this.ui.clearAll();
    this.ui.closeModal();
    this.ui.showHud(false);
    this.audio.music('menu');
    const h = {
      continue: () => this.play(this.save.state.chapter, this.save.state.step),
      new: async () => {
        if (this.save.hasProgress() && !(await this.ui.confirm('Recommencer depuis le début ? Tes souvenirs débloqués restent dans la galerie.'))) return;
        this.save.resetStory();
        this.ui.setComplicity(0);
        this.play(0, 0, true);
      },
      chapters: () => this.ui.chapters(this.director.chapters, (i) => this.play(i, 0)),
      gallery: () => this.ui.gallery(() => this.ui.showMenu(h), () => this.replayNecklace(() => this.ui.showMenu(h))),
      options: () => this.ui.options(),
    };
    this.ui.onModalBack = null;
    this.ui.showMenu(h);
  }

  async play(ci, si, intro = false) {
    this.ui.hideMenu();
    this.ui.closeModal();
    this.inMenu = false;
    this.ui.setComplicity(this.save.state.complicity);
    if (intro) {
      for (const c of PROLOGUE) { await this.ui.card(c); if (this.inMenu) return; }
    }
    this.director.run(ci, si);
  }

  setScenesPaused(p) {
    const sm = this.game.scene;
    for (const k of GAME_SCENES) {
      if (p && sm.isActive(k)) sm.pause(k);
      else if (!p && sm.isPaused(k)) sm.resume(k);
    }
  }

  pause(tab) {
    if (this.inMenu) return;
    this.paused = true;
    controls.reset();
    this.setScenesPaused(true);
    this.audio.duck(true);
    const resume = () => { this.paused = false; this.setScenesPaused(false); this.audio.duck(false); };
    const reopen = () => this.pause();
    if (tab === 'gallery') { this.ui.gallery(resume, () => this.replayNecklace(resume)); return; }
    this.ui.pause({
      resume,
      gallery: () => this.ui.gallery(reopen, () => this.replayNecklace(reopen)),
      options: () => this.ui.options(reopen),
      menu: async () => {
        this.ui.onModalBack = reopen;
        if (await this.ui.confirm('Revenir au menu principal ? Ta progression est sauvegardée.')) { this.ui.onModalBack = null; this.toMenu(); }
      },
    });
  }

  replayNecklace(after) {
    this.ui.closeModal();
    necklaceCinematic({ ui: this.ui, sfx: (k, o) => this.audio.sfx(k, o), save: this.save }, NECKLACE_LINES).then(after);
  }
}

new App();
