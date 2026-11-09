// Cadrage des scènes à largeur fixe (décors statiques, mini-jeux, cinématique).
// Ces scènes sont composées pour 1280 x 720. Quand la zone de jeu est plus étroite (téléphone en
// portrait), la caméra se recentre sur la partie utile et, si nécessaire, recule (zoom < 1) pour que
// tout le contenu important reste visible. Sur ordinateur (largeur 1280) rien ne change : zoom 1,
// caméra en (0, 0).

import { VIEW } from '../../data/layout.js';

/** Zoom de base : 1 tant que la largeur disponible suffit, sinon la caméra recule. */
export const baseZoom = (width, needW) => Math.min(1, width / needW);

/**
 * @param scene   la scène Phaser
 * @param needW   largeur (en unités de jeu) qui doit rester visible
 * @param cx, cy  point à placer au centre de l'écran quand la zone est étroite
 * @returns       fonction pour retirer l'écoute du redimensionnement
 */
export function fitCamera(scene, { needW = VIEW.W, cx = VIEW.W / 2, cy = VIEW.H / 2 } = {}) {
  const apply = () => {
    const cam = scene.cameras && scene.cameras.main;
    if (!cam) return;
    const sc = scene.scale;
    cam.setSize(sc.width, sc.height);
    const vz = baseZoom(sc.width, needW); // zoom de base de la scène
    const viewW = sc.width / vz;
    const x = Math.min(Math.max(cx, viewW / 2), VIEW.W - viewW / 2); // reste dans l'image du décor
    scene.viewZoom = vz;
    cam.setZoom(vz);
    cam.centerOn(viewW >= VIEW.W ? VIEW.W / 2 : x, cy);
    scene.viewScroll = { x: cam.scrollX, y: cam.scrollY };
    scene.events.emit('viewfit', vz);
  };
  apply();
  scene.scale.on('resize', apply);
  scene.events.once('shutdown', () => scene.scale && scene.scale.off('resize', apply));
  return apply;
}

/** Bords visibles de la scène (coordonnées du jeu), utile pour ancrer des textes ou des jauges. */
export function viewEdges(scene) {
  const vz = scene.viewZoom || 1;
  const w = scene.scale.width / vz;
  const h = scene.scale.height / vz;
  const cam = scene.cameras.main;
  const cx = cam.scrollX + scene.scale.width / 2;
  const cy = cam.scrollY + scene.scale.height / 2;
  return { left: cx - w / 2, right: cx + w / 2, top: cy - h / 2, bottom: cy + h / 2, w, h, cx, cy };
}

/**
 * Quand la caméra recule (portrait), le décor de 720 de haut laisse des bandes sombres au-dessus et
 * en dessous. On estompe les bords du décor pour qu'il se fonde dans ces bandes. Invisible quand
 * le zoom vaut 1 (ordinateur) : le rendu y reste strictement identique.
 */
export function softEdges(scene, { depth = -9, color = 0x0d0614, size = 90 } = {}) {
  const g = scene.add.graphics().setDepth(depth);
  g.fillGradientStyle(color, color, color, color, 1, 1, 0, 0).fillRect(-400, 0, VIEW.W + 800, size);
  g.fillGradientStyle(color, color, color, color, 0, 0, 1, 1).fillRect(-400, VIEW.H - size, VIEW.W + 800, size);
  const sync = () => g.setVisible((scene.viewZoom || 1) < 0.999);
  scene.events.on('viewfit', sync);
  sync();
  return g;
}
