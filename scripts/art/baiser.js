// Illustrations de la cinématique finale (le baiser) : Guillo et Kezia de profil,
// découpés en buste + tête pour que la tête puisse s'incliner pendant l'animation.
// Tout est opaque (aucune transparence entre les deux visages) et chaque visage a un contour
// net, pour que les profils restent lisibles quand ils se rapprochent.
// Mêmes couleurs, tenues et coiffures que les personnages du jeu (scripts/art/characters.js).

import { CHARS } from './characters.js';
import { svg, rad, lin, rng } from './util.js';
import { RES, HEAD, BODY } from '../../src/data/baiser.js';

const DK = '#1a1110';

// mélange de deux couleurs hexadécimales (t = part de b)
function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('')}`;
}

const wrap = (box, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${box.W * RES}" height="${box.H * RES}" viewBox="0 0 ${box.W} ${box.H}"><g transform="translate(${box.OX} ${box.OY})">${inner}</g></svg>`;

// ---------------------------------------------------------------- tête (repère : centre du crâne)
// Profil tourné vers la droite : front, nez, lèvres (contact en 115,50), menton, mâchoire.
const SKULL = 'M-58 78 C-96 52 -108 -30 -70 -78 C-36 -118 50 -116 84 -66 C96 -48 99 -28 97 -14 C97 -7 100 -3 103 1 C110 9 119 17 123 22 C127 27 123 32 115 32 C112 33 111 37 113 40 C117 43 116 48 112 50 C115 53 115 58 110 60 C105 63 102 66 102 71 C103 81 98 89 87 92 C66 99 38 96 18 88 C-4 82 -32 82 -58 78 Z';

const UPPER_LIP = 'M104 39 C108 39 111 39 113 40 C117 43 116 48 112 50 C108 50.5 104 50.5 100 50 C101 46 102 42 104 39 Z';
const LOWER_LIP = 'M112 50 C115 53 115 58 110 60 C106 60.5 102 59 100 56 C102 53 106 51 112 50 Z';

// Cheveux courts de Guillo (sans motif) : calotte qui suit le crâne, pattes devant l'oreille.
const GUILLO_HAIR = 'M92 -56 C88 -86 50 -124 -10 -124 C-72 -122 -110 -72 -106 -10 C-104 22 -94 46 -78 62 C-68 52 -62 40 -58 24 C-50 0 -38 -14 -24 -18 C-12 -20 -2 -16 2 0 L4 24 C12 22 16 10 16 -8 C20 -30 38 -46 60 -52 C72 -56 84 -56 92 -56 Z';
// Barbe de Guillo, opaque, le long de la mâchoire jusqu'au menton, et moustache.
const BEARD = 'M2 22 C4 52 8 78 18 88 C38 96 66 99 87 92 C98 89 103 81 102 71 C102 67 103 65 104 63 C97 65 91 63 87 59 C75 63 58 61 44 53 C30 45 20 34 14 20 Z';
const MOUSTACHE = 'M98 36.5 C104 33.5 111 34 114.5 38 C110 39.5 103 40.5 97 40.5 Z';

// Calotte de Kezia (le volume de l'afro est dessiné derrière)
const KEZIA_CAP = 'M94 -58 C90 -92 50 -126 -10 -126 C-72 -124 -112 -72 -108 -10 C-106 30 -92 60 -72 74 C-52 52 -42 30 -36 10 C-32 -12 -16 -26 4 -28 C28 -32 50 -46 64 -56 C76 -62 86 -62 94 -58 Z';

function afroVolume(c) {
  const r = rng(41);
  let s = '';
  // nuage de boucles derrière et au-dessus du crâne (jamais devant le front)
  for (let i = 0; i < 34; i++) {
    const a = Math.PI * 0.62 + (i / 34) * Math.PI * 1.62;
    const x = -60 + Math.cos(a) * 128, y = -52 + Math.sin(a) * 118;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(30 + r() * 12).toFixed(1)}" fill="url(#hrk)"/>`;
  }
  s += `<ellipse cx="-58" cy="-52" rx="132" ry="122" fill="url(#hrk)"/>`;
  return s;
}

function curls(c, area) {
  const r = rng(73);
  let s = '';
  for (let i = 0; i < 130; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * area.r;
    const x = area.x + Math.cos(a) * d * 1.05, y = area.y + Math.sin(a) * d * 0.95;
    if (x > 70 && y > -70) continue; // pas de boucle sur le visage
    if (x > -40 && y > -20) continue;
    const rr = 3 + r() * 3.5;
    s += `<path d="M${(x - rr).toFixed(1)} ${y.toFixed(1)} a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 1 ${(rr * 1.5).toFixed(1)} ${(rr * 0.9).toFixed(1)}" fill="none" stroke="${c.hairLight}" stroke-width="1.8" stroke-linecap="round" opacity="${(0.22 + r() * 0.3).toFixed(2)}"/>`;
  }
  return s;
}

function frontCurls(c) {
  // petites boucles qui dessinent la naissance des cheveux, sur le haut du front
  const r = rng(19);
  let s = '';
  // petits ronds de même couleur le long de la naissance des cheveux : un bord frisé, sans contour
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const x = -30 + t * 118 - Math.pow(t, 3) * 8, y = -126 + Math.pow(t, 1.6) * 66;
    const rr = 8 + r() * 4;
    s += `<circle cx="${(x - 3).toFixed(1)}" cy="${(y - 2).toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#hrk)"/>`;
  }
  return s;
}

function eye(state, female) {
  let s = '';
  if (state === 'closed') {
    s += `<path d="M72 -1 Q82 7 92 0" fill="none" stroke="${DK}" stroke-width="3.8" stroke-linecap="round"/>`;
    if (female) s += `<path d="M90 2 l7 5 M85 5 l4 7" stroke="${DK}" stroke-width="2.4" stroke-linecap="round"/>`;
    s += `<path d="M67 -20 Q80 -26 94 -20" fill="none" stroke="${DK}" stroke-width="4.6" stroke-linecap="round"/>`;
  } else if (state === 'happy') {
    s += `<path d="M72 2 Q82 -7 92 2" fill="none" stroke="${DK}" stroke-width="3.8" stroke-linecap="round"/>`;
    if (female) s += `<path d="M90 -2 l8 -4 M87 -5 l6 -6" stroke="${DK}" stroke-width="2.4" stroke-linecap="round"/>`;
    s += `<path d="M67 -24 Q80 -31 94 -24" fill="none" stroke="${DK}" stroke-width="4.6" stroke-linecap="round"/>`;
  } else {
    s += `<ellipse cx="84" cy="-2" rx="6.6" ry="9.6" fill="${DK}"/><circle cx="86.4" cy="-6" r="2.5" fill="#fff"/><circle cx="82.6" cy="2" r="1.1" fill="#fff" opacity="0.7"/>`;
    if (female) s += `<path d="M89 -9 l8 -5 M90.5 -5 l8.5 -2" stroke="${DK}" stroke-width="2.4" stroke-linecap="round"/>`;
    s += `<path d="M67 -23 Q80 -31 94 -24" fill="none" stroke="${DK}" stroke-width="4.6" stroke-linecap="round"/>`;
  }
  return s;
}

function mouthLine(c, state) {
  const d = state === 'happy' ? 'M112 50 Q104 53.5 97 46.5' : state === 'closed' ? 'M112 50 Q106 51.5 100.5 50.5' : 'M112 50 Q105.5 51.5 99.5 47.5';
  return `<path d="${d}" fill="none" stroke="${mix(c.lips, DK, 0.45)}" stroke-width="2.4" stroke-linecap="round"/>`;
}

export function headSVG(id, state) {
  const c = CHARS[id];
  const female = id === 'kezia';
  const outline = mix(c.skinShade, DK, 0.45);
  const hairDef = female
    ? `<radialGradient id="hrk" gradientUnits="userSpaceOnUse" cx="20" cy="-130" r="240"><stop offset="0" stop-color="${c.hairLight}"/><stop offset="0.6" stop-color="${c.hairColor}"/><stop offset="1" stop-color="${c.hairColor}"/></radialGradient>`
    : lin('hrg', [[0, mix(c.hairColor, c.hairLight, 0.45)], [0.25, c.hairColor], [0.62, c.hairColor], [1, mix(c.hairColor, c.skinShade, 0.55)]]);
  let s = `<defs>${rad(`sk${id}`, [[0, c.skinLight], [0.7, c.skin], [1, c.skinShade]], 0.72, 0.36, 0.8)}${hairDef}</defs>`;

  if (female) { s += afroVolume(c); s += curls(c, { x: -58, y: -52, r: 125 }); }

  // crâne et visage, avec un contour net
  s += `<path d="${SKULL}" fill="url(#sk${id})" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/>`;

  // oreille
  s += `<ellipse cx="-12" cy="14" rx="15" ry="21" fill="${c.skinShade}"/><path d="M-17 2 Q-4 12 -15 28" stroke="${c.skin}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;

  // cheveux
  if (female) {
    s += `<path d="${KEZIA_CAP}" fill="url(#hrk)"/>`;
    s += frontCurls(c);
    s += curls(c, { x: -40, y: -70, r: 60 });
    // l'oreille reste visible devant la chevelure
    s += `<ellipse cx="-12" cy="14" rx="15" ry="21" fill="${c.skinShade}"/><path d="M-17 2 Q-4 12 -15 28" stroke="${c.skin}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="-11" cy="40" r="6.5" fill="${c.earrings}"/><circle cx="-13" cy="38" r="2.2" fill="#fff" opacity="0.6"/>`;
  } else {
    s += `<path d="${GUILLO_HAIR}" fill="url(#hrg)"/>`;
    const beard = mix(c.skin, c.hairColor, 0.62);
    s += `<path d="${BEARD}" fill="${beard}"/><path d="${MOUSTACHE}" fill="${beard}"/>`;
  }

  // joue
  const blush = state === 'look' ? 0.32 : 0.58;
  s += `<ellipse cx="60" cy="26" rx="20" ry="11" fill="#ff6f6f" opacity="${blush}"/>`;
  // œil et sourcil
  s += eye(state, female);
  // aile du nez
  s += `<path d="M106 22 Q109 30 116 31" stroke="${c.skinShade}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  // lèvres
  s += `<path d="${UPPER_LIP}" fill="${c.lips}"/><path d="${LOWER_LIP}" fill="${mix(c.lips, '#ffffff', 0.08)}"/>`;
  s += mouthLine(c, state);
  // contour du profil repassé par-dessus la barbe et les lèvres (bord net)
  s += `<path d="M97 -14 C97 -7 100 -3 103 1 C110 9 119 17 123 22 C127 27 123 32 115 32 C112 33 111 37 113 40 C117 43 116 48 112 50 C115 53 115 58 110 60 C105 63 102 66 102 71 C103 81 98 89 87 92" fill="none" stroke="${outline}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  return wrap(HEAD, s);
}

// ---------------------------------------------------------------- buste (repère : pivot du cou)
export function bodySVG(id) {
  const c = CHARS[id];
  const t = c.top;
  const female = id === 'kezia';
  const outline = mix(t.shade, DK, 0.35);
  let s = '';
  // cou
  s += female
    ? `<path d="M-36 -30 L28 -30 C30 10 30 40 32 64 L-42 64 C-40 30 -38 0 -36 -30 Z" fill="${c.skinShade}"/><path d="M28 -30 C30 10 30 40 32 64" stroke="${mix(c.skinShade, DK, 0.3)}" stroke-width="3" fill="none"/>`
    : `<path d="M-44 -30 L34 -30 C36 10 38 40 42 70 L-52 70 C-50 30 -48 0 -44 -30 Z" fill="${c.skinShade}"/><path d="M34 -30 C36 10 38 40 42 70" stroke="${mix(c.skinShade, DK, 0.3)}" stroke-width="3" fill="none"/>`;

  // torse
  const torso = female
    ? 'M-46 50 C-92 56 -128 82 -138 140 C-148 200 -150 300 -152 460 L140 460 C138 330 132 236 122 178 C112 120 86 76 34 56 C6 48 -20 46 -46 50 Z'
    : 'M-54 46 C-100 52 -138 80 -150 140 C-160 200 -164 300 -166 460 L150 460 C146 330 140 230 128 170 C118 112 94 72 40 52 C10 44 -24 42 -54 46 Z';
  s += `<g transform="translate(0 -10)">`;
  s += `<path d="${torso}" fill="${t.main}" stroke="${outline}" stroke-width="3"/>`;

  if (female) {
    // décolleté du haut cache-cœur, liseré doré, pli croisé
    s += `<path d="M30 58 C48 64 64 74 78 88 C66 106 56 120 46 134 C42 108 38 82 30 58 Z" fill="${c.skin}"/>`;
    s += `<path d="M78 88 C66 106 56 120 46 134" stroke="${t.accent}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += `<path d="M46 134 C20 200 -10 300 -40 460" stroke="${t.shade}" stroke-width="10" fill="none"/>`;
  } else {
    // surchemise ouverte sur le t-shirt crème, col, patte de boutonnage, poche, bouton doré
    s += `<path d="M44 54 C60 62 76 74 88 86 C74 110 66 140 62 170 C54 130 46 90 40 60 Z" fill="${t.inner}"/>`;
    s += `<path d="M-48 48 C-10 40 26 44 44 54 L48 64 C20 57 -14 56 -50 62 Z" fill="${t.inner}"/>`;
    s += `<path d="M40 52 C54 60 70 70 88 84 L76 98 C64 84 52 72 36 62 Z" fill="${t.shade}"/>`;
    s += `<path d="M62 170 C68 250 72 350 74 460" stroke="${t.shade}" stroke-width="8" fill="none"/>`;
    s += `<rect x="78" y="196" width="30" height="24" rx="4" fill="${t.shade}"/><circle cx="66" cy="214" r="5.5" fill="${t.accent}"/>`;
  }

  // bras le plus proche (épaule arrondie), par-dessus le torse
  // le bras tombe le long du corps : épaule arrondie, manche qui s'affine
  const arm = female
    ? 'M-74 70 C-46 58 -8 64 4 100 C10 160 8 300 2 470 L-80 470 C-88 300 -96 170 -96 120 C-96 96 -88 78 -74 70 Z'
    : 'M-84 66 C-52 52 -6 60 8 100 C16 160 14 300 8 470 L-92 470 C-100 300 -110 170 -110 120 C-110 94 -100 74 -84 66 Z';
  s += `<defs>${lin(`arm${id}`, [[0, t.shade], [0.45, t.main], [1, t.main]], 1, 0)}</defs>`;
  s += `<path d="${arm}" fill="url(#arm${id})" stroke="${outline}" stroke-width="3" stroke-linejoin="round"/>`;
  s += `</g>`;
  return wrap(BODY, s);
}

// Collier à la perle de Kezia, à superposer à son buste
export function pearlSVG() {
  const s = `<defs>${rad('prl', [[0, '#ffffff'], [0.55, '#f3ecf2'], [1, '#bdaec4']], 0.35, 0.3, 0.75)}</defs>
  <path d="M-38 22 C-24 50 4 66 30 68" fill="none" stroke="#e9c46a" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="33" cy="76" r="7.5" fill="url(#prl)"/><circle cx="31" cy="73.5" r="2.4" fill="#fff"/>`;
  return wrap(BODY, s);
}

// Décor : la lune et les lanternes qui s'élèvent
export function moonSVG() {
  return svg(600, 600, `<defs>${rad('mn', [[0, '#fff8ec'], [0.7, '#ffe3e6'], [1, '#f6c1d0']], 0.42, 0.4, 0.62)}${rad('mh', [[0, '#ffe6f0', 0.55], [1, '#ffe6f0', 0]])}</defs>
  <circle cx="300" cy="300" r="300" fill="url(#mh)"/><circle cx="300" cy="300" r="190" fill="url(#mn)"/>
  <circle cx="240" cy="250" r="26" fill="#f2c6d2" opacity="0.35"/><circle cx="350" cy="340" r="38" fill="#f2c6d2" opacity="0.3"/><circle cx="330" cy="220" r="14" fill="#f2c6d2" opacity="0.35"/>`);
}

export function lanternSVG() {
  return svg(40, 56, `<defs>${rad('lg', [[0, '#fff3c4'], [0.6, '#ffc76b'], [1, '#ff8a5c']], 0.5, 0.45, 0.6)}</defs>
  <path d="M8 10 Q20 2 32 10 L35 42 Q20 50 5 42 Z" fill="url(#lg)"/><rect x="12" y="44" width="16" height="5" rx="2" fill="#c8553d"/>
  <path d="M14 14 L13 40 M26 14 L27 40" stroke="#ff9f6a" stroke-width="1.5" opacity="0.6"/>`);
}
