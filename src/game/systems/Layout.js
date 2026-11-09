// Mise en page adaptative : choisit entre la composition « paysage » (ordinateur, téléphone couché)
// et la composition « portrait » (téléphone debout).
//
//  - Paysage : le canvas garde exactement sa taille logique d'origine (1280 x 720), le dialogue et
//    les commandes se superposent à la scène, comme avant.
//  - Portrait : l'écran est coupé en deux. En haut, la scène (le canvas s'agrandit pour remplir la
//    zone) ; en bas, un panneau réservé au dialogue, aux choix et aux commandes du pouce. Rien ne
//    masque donc la scène. La hauteur logique reste 720 ; seule la largeur logique se resserre pour
//    épouser la zone (les scènes se recadrent grâce à View.js).
//
// Les gabarits sont exposés au CSS (classe `portrait` sur <body>, variable --panel-h) et au jeu (`layout`).

import { VIEW } from '../../data/layout.js';

export const layout = {
  portrait: false,
  panelH: 0, // hauteur du panneau du bas (px écran), 0 en paysage
  gameW: VIEW.W, // largeur logique du canvas
};

const MIN_W = 420; // largeur logique minimale en portrait
const handlers = new Set();
export const onLayout = (fn) => { handlers.add(fn); return () => handlers.delete(fn); };

function viewportSize() {
  const vv = window.visualViewport;
  return { w: Math.round(vv ? vv.width : window.innerWidth), h: Math.round(vv ? vv.height : window.innerHeight) };
}

/** Gabarit pour une fenêtre de w x h pixels (fonction pure, testée dans tests/layout.test.js). */
export function computeLayout(w, h) {
  const portrait = w / h < 0.9;
  const panelH = portrait ? Math.round(Math.min(360, Math.max(244, h * 0.39))) : 0;
  const stageH = Math.max(1, h - panelH);
  const gameW = portrait ? Math.round(Math.min(VIEW.W, Math.max(MIN_W, (VIEW.H * w) / stageH))) : VIEW.W;
  return { portrait, panelH, gameW };
}

/** Mesure l'écran, publie le gabarit (classe CSS, variables) et dit s'il a changé. */
export function measure() {
  const { w, h } = viewportSize();
  const next = computeLayout(w, h);
  const root = document.documentElement;
  document.body.classList.toggle('portrait', next.portrait);
  root.style.setProperty('--panel-h', `${next.panelH}px`);
  root.style.setProperty('--vh-px', `${h}px`);
  const changed = next.portrait !== layout.portrait || next.panelH !== layout.panelH || next.gameW !== layout.gameW;
  Object.assign(layout, next);
  return changed;
}

/** À appeler une fois le jeu Phaser créé : applique le gabarit et le met à jour à chaque changement d'écran. */
export function initLayout(game) {
  let timer = 0;
  const apply = () => {
    measure();
    if (game.scale.gameSize.width !== layout.gameW || game.scale.gameSize.height !== VIEW.H) game.scale.setGameSize(layout.gameW, VIEW.H);
    game.scale.refresh();
    handlers.forEach((fn) => fn(layout));
  };
  const soon = () => { clearTimeout(timer); timer = setTimeout(apply, 60); };
  window.addEventListener('resize', soon);
  window.addEventListener('orientationchange', soon);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', soon);
  measure(); // classe CSS tout de suite, sans attendre Phaser
  return apply;
}
