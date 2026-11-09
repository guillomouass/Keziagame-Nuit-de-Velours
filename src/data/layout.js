// Positions partagées entre le générateur d'illustrations (scripts/) et le jeu (src/).
// Modifier une valeur ici puis relancer `npm run assets` garde les décors et le gameplay alignés.

export const VIEW = { W: 1280, H: 720 };
export const GROUND_Y = 640; // ligne du sol dans toutes les scènes d'exploration

export const WORLDS = {
  event: { width: 3000, stage: { x: 520, w: 520, h: 70 }, bar: 2350, exit: 2860 },
  bowling: { width: 2600, keziaLane: 1500, staecy: 2050, exit: 2480 },
  fair: { width: 3600, immo: 820, literie: 1820, perles: 2820, exit: 3480 },
  studio: { width: 2400, ringlight: 520, desk: 1900, exit: 2290 },
  paris: { width: 2600, restaurant: 2350 },
  malaysia: { width: 3200, exit: 3080 },
  memories: { width: 3800, tree: 3420 },
};
