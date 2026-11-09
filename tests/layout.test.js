import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { computeLayout } from '../src/game/systems/Layout.js';
import { baseZoom } from '../src/game/systems/View.js';

const root = join(import.meta.dirname, '..');

describe('Mise en page responsive', () => {
  it('ordinateur et paysage : composition d’origine (1280 x 720, pas de panneau)', () => {
    for (const [w, h] of [[1280, 720], [1920, 1080], [1440, 900], [844, 390], [932, 430], [1024, 768]]) {
      expect(computeLayout(w, h), `${w}x${h}`).toEqual({ portrait: false, panelH: 0, gameW: 1280 });
    }
  });

  it('téléphone en portrait : écran coupé en deux, la scène épouse la zone du haut', () => {
    const phones = { 'iPhone (barres Safari)': [390, 664], 'iPhone plein': [390, 844], 'iPhone SE': [375, 553], Android: [360, 640], 'Android grand': [412, 780] };
    for (const [name, [w, h]] of Object.entries(phones)) {
      const l = computeLayout(w, h);
      expect(l.portrait, name).toBe(true);
      expect(l.panelH, name).toBeGreaterThanOrEqual(244);
      expect(l.panelH, name).toBeLessThanOrEqual(360);
      expect(l.gameW, name).toBeGreaterThanOrEqual(420);
      expect(l.gameW, name).toBeLessThanOrEqual(1280);
      // la zone de la scène (largeur écran x hauteur restante) a le même rapport que le jeu : aucune déformation
      expect(l.gameW / 720).toBeCloseTo(w / (h - l.panelH), 1);
    }
  });

  it('tablette en portrait : la scène occupe toute la largeur', () => {
    const l = computeLayout(768, 1024);
    expect(l.portrait).toBe(true);
    expect(l.gameW).toBeLessThan(1280);
  });

  it('la caméra ne recule que si la largeur est insuffisante', () => {
    expect(baseZoom(1280, 760)).toBe(1);
    expect(baseZoom(641, 640)).toBe(1);
    expect(baseZoom(641, 900)).toBeCloseTo(0.712, 2);
  });

  it('les règles de mise en page portrait ciblent uniquement body.portrait (ordinateur inchangé)', () => {
    const css = readFileSync(join(root, 'src/styles/main.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    // Vérifier tous les groupes de sélecteurs qui contiennent body.portrait, y compris sous @media.
    const groups = [...css.matchAll(/([^{}]+)\{/g)].map((m) => m[1].trim());
    const portraitGroups = groups.filter((group) => group.includes('body.portrait'));
    const selectors = portraitGroups.flatMap((group) => group.split(',').map((sel) => sel.trim()));
    expect(selectors.length).toBeGreaterThan(30);
    for (const sel of selectors) expect(sel.startsWith('body.portrait'), sel).toBe(true);
  });

  it('les scènes se recadrent via fitCamera (sinon elles resteraient au format 1280)', () => {
    for (const f of ['BackdropScene', 'TrainScene', 'BowlingScene', 'ShellScene', 'KissScene']) {
      expect(readFileSync(join(root, `src/game/scenes/${f}.js`), 'utf8'), f).toContain('fitCamera(');
    }
  });
});

describe('Ergonomie mobile (commandes et dialogues)', () => {
  const css = readFileSync(join(root, 'src/styles/main.css'), 'utf8');
  const ui = readFileSync(join(root, 'src/interface/UI.js'), 'utf8');

  it('les quatre commandes gardent leurs fonctions (data-k) et reçoivent des icônes SVG', () => {
    for (const k of ['left', 'right', 'jump', 'action']) expect(ui).toContain(`'${k}'`);
    expect(ui).toMatch(/btn\('l', 'left'.*btn\('r', 'right'.*btn\('j', 'jump'.*btn\('a', 'action'/s);
    expect(ui).toContain('<svg viewBox="0 0 24 24"');
    expect(ui).not.toContain('>♥</button>'); // la bulle remplace le cœur sur le bouton de discussion
  });

  it('commandes : cercles identiques d’au moins 60 px, sauter à côté de ◀ ▶', () => {
    expect(css).toMatch(/#touch \{ --tb: 64px;/);
    expect(css).toMatch(/#touch \{ --tb: 60px;/); // paysage bas
    expect(css).toMatch(/body\.portrait #touch \{ --tb: 68px;/);
    expect(css).toMatch(/#touch \.j \{ left: calc\(14px \+ 2 \* \(var\(--tb\) \+ var\(--gap\)\)\); \}/);
    expect(css).toMatch(/#touch button\.on \{ transform: scale\(\.9\)/); // retour visuel à l'appui
  });

  it('dialogues en portrait : police de 17 à 19 px, choix de 17 px et plus', () => {
    expect(css).toContain('font-size: clamp(17px, 4.9vw, 19px)');
    expect(css).toContain('font-size: clamp(17px, 4.7vw, 18.5px)');
    expect(css).toContain('min-height: 56px');
  });
});
