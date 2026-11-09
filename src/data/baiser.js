// Géométrie partagée entre le générateur d'illustrations (scripts/art/baiser.js)
// et la cinématique du baiser (src/game/scenes/KissScene.js).
// Les personnages sont dessinés de profil, tournés vers la DROITE ; Kezia est retournée dans le jeu.

export const RES = 2; // densité des SVG (2 pixels par unité) pour rester net une fois zoomé

// Tête : repère centré sur le crâne. Boîte 440x440, le centre du crâne est en (240, 240).
export const HEAD = { W: 440, H: 440, OX: 240, OY: 240 };
// Point d'attache de la tête sur le cou (pivot de l'inclinaison), dans le repère de la tête.
export const HEAD_PIVOT = { x: 0, y: 92 };
// Point de contact des lèvres, dans le repère de la tête.
export const LIPS = { x: 115, y: 50 };

// Buste : repère centré sur le pivot du cou. Boîte 360x520, le pivot est en (200, 60).
export const BODY = { W: 360, H: 520, OX: 200, OY: 60 };
