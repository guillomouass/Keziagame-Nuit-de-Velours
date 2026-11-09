// Générateur SVG des personnages (style illustré, vectoriel).
// Chaque personnage est découpé en parties (tête, buste, bras, jambe) pour être animé dans Phaser,
// et assemblé en portraits (dialogues) et silhouettes complètes (cinématiques).

import { rng } from './util.js';

export const CHARS = {
  guillo: {
    name: 'Guillo',
    skin: '#5c3622', skinLight: '#7a4a2f', skinShade: '#432616', lips: '#3f1f14',
    hair: 'court', hairColor: '#120d0b', hairLight: '#3b2c25',
    top: { type: 'overshirt', main: '#1f3157', shade: '#16233f', inner: '#f4eee4', accent: '#e8b54a' },
    bottom: '#2a2933', shoes: '#f3f1ec', shoeAccent: '#c8553d', beard: true,
  },
  kezia: {
    name: 'Kezia',
    skin: '#7b4a2d', skinLight: '#99603c', skinShade: '#5f3720', lips: '#7d3a2a',
    hair: 'afro', hairColor: '#24140d', hairLight: '#6a3d22',
    top: { type: 'wrap', main: '#d4643f', shade: '#b04e30', accent: '#f4c25a' },
    bottom: '#2f3d63', shoes: '#efe1cf', shoeAccent: '#d4643f', lashes: true, earrings: '#f4c25a',
  },
  staecy: {
    name: 'Staecy',
    skin: '#8c5b3b', skinLight: '#a8714b', skinShade: '#6e4329', lips: '#7b3b2e',
    hair: 'braids', hairColor: '#1a110e', hairLight: '#4a3328',
    top: { type: 'tee', main: '#7356a6', shade: '#5c4389', accent: '#ffd38a' },
    bottom: '#efe6da', shoes: '#2b2b33', shoeAccent: '#ffd38a', lashes: true, earrings: '#ffd38a',
  },
};

// Personnages secondaires (inventés pour le jeu)
export const NPCS = {
  invite1: { skin: '#a06a46', skinLight: '#b9805a', skinShade: '#7f5134', lips: '#7a4030', hair: 'short', hairColor: '#1b1411', top: { type: 'tee', main: '#2f8f83', shade: '#246f66', accent: '#fff' }, bottom: '#3a3a44', shoes: '#ddd' },
  invite2: { skin: '#4a2c1c', skinLight: '#63402b', skinShade: '#352013', lips: '#3d1f14', hair: 'bun', hairColor: '#0f0b09', top: { type: 'wrap', main: '#e0a43b', shade: '#c08a2a', accent: '#fff' }, bottom: '#1f1f28', shoes: '#c8553d', lashes: true },
  invite3: { skin: '#d9a77f', skinLight: '#e9bf9b', skinShade: '#b88863', lips: '#a85a4c', hair: 'straight', hairColor: '#4a2e1f', top: { type: 'tee', main: '#b84a6b', shade: '#963a56', accent: '#fff' }, bottom: '#2c3550', shoes: '#eee', lashes: true },
  invite4: { skin: '#6b4129', skinLight: '#86553a', skinShade: '#4f2e1c', lips: '#4a2418', hair: 'cap', hairColor: '#111', capColor: '#c8553d', top: { type: 'overshirt', main: '#3c5a3a', shade: '#2e472d', inner: '#eee', accent: '#e8b54a' }, bottom: '#26252c', shoes: '#fff' },
  garcon: { skin: '#8a5636', skinLight: '#a46a47', skinShade: '#6b4127', lips: '#5a2a1c', hair: 'short', hairColor: '#17110e', top: { type: 'tee', main: '#4b6fb3', shade: '#3a5791', accent: '#fff' }, bottom: '#2a2a30', shoes: '#fff' },
  vendeuse: { skin: '#e3b591', skinLight: '#f0c9a8', skinShade: '#c39270', lips: '#b4625a', hair: 'bun', hairColor: '#7a4b2a', top: { type: 'blazer', main: '#36506e', shade: '#2a3f57', inner: '#fff', accent: '#e8b54a' }, bottom: '#2a2f3a', shoes: '#222', lashes: true },
  agent: { skin: '#c48a62', skinLight: '#d8a07a', skinShade: '#a2704c', lips: '#8a4a3a', hair: 'short', hairColor: '#2a2420', top: { type: 'blazer', main: '#2b2b33', shade: '#1f1f26', inner: '#9fc3e6', accent: '#c8553d' }, bottom: '#2b2b33', shoes: '#3a2a20', beard: true },
  perliere: { skin: '#5e3824', skinLight: '#7a4c32', skinShade: '#462817', lips: '#6a2c22', hair: 'headwrap', hairColor: '#120c0a', wrapColor: '#2f8f83', top: { type: 'wrap', main: '#f2e6d0', shade: '#d9c9ad', accent: '#2f8f83' }, bottom: '#6a3d22', shoes: '#3a2a20', lashes: true, earrings: '#f4c25a' },
  serveur: { skin: '#3f2516', skinLight: '#573421', skinShade: '#2d190e', lips: '#3a1c12', hair: 'bald', hairColor: '#111', top: { type: 'blazer', main: '#f1ebe1', shade: '#d8cfc2', inner: '#222', accent: '#c8553d' }, bottom: '#1d1d22', shoes: '#111', beard: true },
};

export const ALL = { ...CHARS, ...NPCS };

export const EXPRESSIONS = ['neutral', 'smile', 'laugh', 'surprised', 'tease', 'shy', 'thinking', 'blink', 'tender'];

// ---------------------------------------------------------------- tête
// Boîte 200x200, pivot du cou en (100,190), centre du visage (100,112).

function defs(c, uid) {
  return `
  <radialGradient id="sk${uid}" cx="0.42" cy="0.36" r="0.75">
    <stop offset="0" stop-color="${c.skinLight}"/><stop offset="0.7" stop-color="${c.skin}"/><stop offset="1" stop-color="${c.skinShade}"/>
  </radialGradient>
  <radialGradient id="hr${uid}" cx="0.4" cy="0.3" r="0.8">
    <stop offset="0" stop-color="${c.hairLight}"/><stop offset="0.55" stop-color="${c.hairColor}"/><stop offset="1" stop-color="${c.hairColor}"/>
  </radialGradient>`;
}

function hairBack(c, uid) {
  const r = rng(c.hair.length * 97 + c.skin.length);
  if (c.hair === 'afro') {
    let s = '';
    const n = 26;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rad = 26 + r() * 10;
      const x = 100 + Math.cos(a) * 66;
      const y = 92 + Math.sin(a) * 58 * (Math.sin(a) > 0 ? 0.92 : 1);
      s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rad.toFixed(1)}" fill="url(#hr${uid})"/>`;
    }
    s += `<ellipse cx="100" cy="92" rx="70" ry="62" fill="url(#hr${uid})"/>`;
    // reflets de boucles
    for (let i = 0; i < 46; i++) {
      const a = r() * Math.PI * 2, d = 20 + r() * 70;
      const x = 100 + Math.cos(a) * d * 1.05, y = 90 + Math.sin(a) * d * 0.85;
      if (y > 120 && Math.abs(x - 100) < 50) continue;
      const rr = 3 + r() * 4;
      s += `<path d="M${(x - rr).toFixed(1)} ${y.toFixed(1)} a${rr.toFixed(1)} ${rr.toFixed(1)} 0 1 1 ${(rr * 1.4).toFixed(1)} ${(rr * 0.8).toFixed(1)}" fill="none" stroke="${c.hairLight}" stroke-width="1.6" stroke-linecap="round" opacity="${(0.35 + r() * 0.4).toFixed(2)}"/>`;
    }
    return s;
  }
  if (c.hair === 'braids') {
    let s = `<path d="M56 100 Q52 60 100 48 Q148 60 144 100 L146 170 Q100 182 54 170 Z" fill="${c.hairColor}"/>`;
    for (let i = 0; i < 9; i++) {
      const xl = 50 + i * 3.2, xr = 150 - i * 3.2;
      for (const x of [xl, xr]) {
        s += `<path d="M${x} 96 Q${x - 3} 140 ${x + 1} 188" fill="none" stroke="${c.hairLight}" stroke-width="2.4" stroke-dasharray="5 3" opacity="0.7"/>`;
      }
    }
    return s;
  }
  if (c.hair === 'straight') {
    return `<path d="M52 110 Q48 52 100 46 Q152 52 148 110 L150 160 Q140 168 126 160 L74 160 Q60 168 50 160 Z" fill="url(#hr${uid})"/>`;
  }
  if (c.hair === 'headwrap') {
    return `<path d="M54 104 Q46 30 100 26 Q156 30 146 104 Z" fill="${c.wrapColor}"/>`;
  }
  return '';
}

function hairFront(c, uid) {
  const r = rng(c.hairColor.length * 13 + 7);
  switch (c.hair) {
    case 'court':
      // cheveux courts, sans motif
      return `<path d="M55 112 C50 66 72 50 100 49 C128 50 150 66 145 112 C142 98 138 88 132 82 C120 76 110 75 100 75 C90 75 80 76 68 82 C62 88 58 98 55 112 Z" fill="url(#hr${uid})"/>`;
    case 'afro': {
      let s = '';
      for (let i = 0; i < 9; i++) {
        const x = 64 + i * 9, y = 66 + Math.abs(i - 4) * 2.8 + r() * 3;
        s += `<circle cx="${x}" cy="${y.toFixed(1)}" r="${(11 + r() * 4).toFixed(1)}" fill="url(#hr${uid})"/>`;
        s += `<path d="M${x - 4} ${y} a4 4 0 1 1 5 3" fill="none" stroke="${c.hairLight}" stroke-width="1.5" opacity="0.6"/>`;
      }
      return s;
    }
    case 'braids':
      return `<path d="M56 108 Q56 62 100 56 Q144 62 144 108 Q132 80 100 78 Q68 80 56 108 Z" fill="${c.hairColor}"/>
        <path d="M100 56 L100 78" stroke="${c.hairLight}" stroke-width="1.5" opacity="0.6"/>
        <circle cx="100" cy="40" r="22" fill="${c.hairColor}"/>
        <path d="M84 36 Q100 26 116 36 M82 44 Q100 34 118 44" stroke="${c.hairLight}" stroke-width="2" fill="none" stroke-dasharray="4 3" opacity="0.7"/>
        <rect x="84" y="54" width="32" height="7" rx="3" fill="${c.top.accent}"/>`;
    case 'short':
      return `<path d="M56 108 C52 66 74 52 100 52 C126 52 148 66 144 108 C138 90 128 80 100 79 C72 80 62 90 56 108 Z" fill="url(#hr${uid})"/>`;
    case 'bun':
      return `<circle cx="100" cy="44" r="20" fill="url(#hr${uid})"/><path d="M56 108 C52 64 74 54 100 54 C126 54 148 64 144 108 C136 86 120 78 100 78 C80 78 64 86 56 108 Z" fill="url(#hr${uid})"/>`;
    case 'straight':
      return `<path d="M56 112 C54 64 76 52 100 52 C128 52 148 66 146 112 C130 90 112 80 98 82 C86 92 70 100 56 112 Z" fill="url(#hr${uid})"/>`;
    case 'cap':
      return `<path d="M54 98 C54 58 74 46 100 46 C126 46 146 58 146 98 Z" fill="${c.capColor}"/><path d="M100 96 Q150 92 168 104 Q140 108 100 104 Z" fill="${c.capColor}" opacity="0.85"/><circle cx="100" cy="47" r="4" fill="#fff" opacity="0.6"/>`;
    case 'headwrap':
      return `<path d="M56 96 Q60 58 100 54 Q140 58 144 96 Q120 84 100 86 Q80 84 56 96 Z" fill="${c.wrapColor}"/><path d="M70 60 Q100 46 130 60 M64 76 Q100 62 136 76" stroke="#fff" stroke-width="2" opacity="0.35" fill="none"/><path d="M118 30 Q140 16 150 34 Q136 40 120 40 Z" fill="${c.wrapColor}"/>`;
    default:
      return '';
  }
}

function eyes(c, e) {
  const dk = '#1a1110';
  const L = 83, R = 117, Y = 113;
  const open = (x, y, rx = 5.6, ry = 7.2) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${dk}"/><circle cx="${x + 1.8}" cy="${y - 2.6}" r="2" fill="#fff"/><circle cx="${x - 1.6}" cy="${y + 2.4}" r="0.9" fill="#fff" opacity="0.7"/>`;
  const arc = (x, y, up = true) =>
    `<path d="M${x - 7} ${y + 1} Q${x} ${up ? y - 7 : y + 4} ${x + 7} ${y + 1}" fill="none" stroke="${dk}" stroke-width="3.4" stroke-linecap="round"/>`;
  let s = '';
  switch (e) {
    case 'smile': case 'laugh': case 'tender': s = arc(L, Y) + arc(R, Y); break;
    case 'blink': s = arc(L, Y + 1, false) + arc(R, Y + 1, false); break;
    case 'surprised': s = open(L, Y - 1, 6.6, 8.6) + open(R, Y - 1, 6.6, 8.6); break;
    case 'tease': s = open(L, Y) + arc(R, Y); break;
    case 'shy': s = open(L - 1, Y + 3, 5, 5.6) + open(R - 1, Y + 3, 5, 5.6); break;
    case 'thinking': s = open(L + 2, Y - 1.5) + open(R + 2, Y - 1.5); break;
    default: s = open(L, Y) + open(R, Y);
  }
  if (c.lashes && e !== 'blink') {
    s += `<path d="M${L - 7} ${Y - 5} l-4 -3 M${R + 7} ${Y - 5} l4 -3" stroke="${dk}" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  return s;
}

function brows(c, e) {
  const col = c.hair === 'bald' ? '#1a1110' : c.hairColor === '#4a2e1f' ? '#3a2416' : '#1a1110';
  const b = (x1, y1, x2, y2, cy) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${cy} ${x2} ${y2}" fill="none" stroke="${col}" stroke-width="3.6" stroke-linecap="round"/>`;
  switch (e) {
    case 'surprised': return b(73, 94, 91, 93, 87) + b(109, 93, 127, 94, 87);
    case 'tease': return b(73, 99, 91, 98, 95) + b(109, 94, 127, 96, 88);
    case 'thinking': return b(73, 97, 91, 100, 95) + b(109, 96, 127, 93, 90);
    case 'shy': case 'tender': return b(73, 99, 91, 97, 96) + b(109, 97, 127, 99, 96);
    default: return b(73, 99, 91, 98, 94) + b(109, 98, 127, 99, 94);
  }
}

function mouth(c, e) {
  const L = c.lips;
  switch (e) {
    case 'smile': case 'blink':
      return `<path d="M87 136 Q100 150 113 136" fill="none" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/>`;
    case 'laugh':
      return `<path d="M85 134 Q100 160 115 134 Q100 139 85 134 Z" fill="#3a1712"/><path d="M88 135.5 Q100 139.5 112 135.5 L111 139 Q100 142 89 139 Z" fill="#fff"/><ellipse cx="100" cy="149" rx="7" ry="3.5" fill="#d96b6b"/>`;
    case 'surprised':
      return `<ellipse cx="100" cy="142" rx="6" ry="7.5" fill="#3a1712"/>`;
    case 'tease':
      return `<path d="M90 140 Q103 146 112 134" fill="none" stroke="${L}" stroke-width="3.6" stroke-linecap="round"/>`;
    case 'shy':
      return `<path d="M93 140 Q100 145 107 140" fill="none" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/>`;
    case 'thinking':
      return `<path d="M92 142 Q100 140 108 138" fill="none" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/>`;
    case 'tender':
      return `<path d="M90 138 Q100 147 110 138" fill="none" stroke="${L}" stroke-width="3.4" stroke-linecap="round"/>`;
    default:
      return `<path d="M91 139 Q100 145 109 139" fill="none" stroke="${L}" stroke-width="3.2" stroke-linecap="round"/>`;
  }
}

export function headGroup(id, e = 'neutral', uid = '') {
  const c = ALL[id];
  uid = uid || `${id}${e}`;
  const blush = e === 'shy' || e === 'tender' ? 0.55 : e === 'laugh' ? 0.4 : 0.22;
  const beard = c.beard
    ? `<path d="M64 128 Q66 162 100 166 Q134 162 136 128 Q132 150 100 153 Q68 150 64 128 Z" fill="${c.hairColor}" opacity="0.55"/>
       <path d="M88 132 Q100 128 112 132" stroke="${c.hairColor}" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>`
    : '';
  const earrings = c.earrings
    ? `<circle cx="56" cy="130" r="4.5" fill="${c.earrings}"/><circle cx="144" cy="130" r="4.5" fill="${c.earrings}"/>`
    : '';
  return `<g>
  <defs>${defs(c, uid)}</defs>
  ${hairBack(c, uid)}
  <rect x="88" y="148" width="24" height="46" rx="8" fill="${c.skinShade}"/>
  <ellipse cx="57" cy="116" rx="8" ry="12" fill="${c.skinShade}"/><ellipse cx="143" cy="116" rx="8" ry="12" fill="${c.skinShade}"/>
  <path d="M56 106 Q56 60 100 60 Q144 60 144 106 Q144 150 120 160 Q100 168 80 160 Q56 150 56 106 Z" fill="url(#sk${uid})"/>
  ${beard}
  <ellipse cx="74" cy="131" rx="9" ry="5.5" fill="#ff6f6f" opacity="${blush}"/><ellipse cx="126" cy="131" rx="9" ry="5.5" fill="#ff6f6f" opacity="${blush}"/>
  ${eyes(c, e)}
  ${brows(c, e)}
  <path d="M97 119 Q99 128 105 127" fill="none" stroke="${c.skinShade}" stroke-width="2.6" stroke-linecap="round"/>
  ${mouth(c, e)}
  ${earrings}
  ${hairFront(c, uid)}
</g>`;
}

// ---------------------------------------------------------------- buste
// Boîte 140x124, pivot (70,0) = base du cou.
export function torsoGroup(id, opts = {}) {
  const c = ALL[id];
  const t = c.top;
  const base = `M18 34 Q20 8 50 3 L90 3 Q120 8 122 34 L117 116 Q70 126 23 116 Z`;
  let s = `<path d="${base}" fill="${t.main}"/>`;
  s += `<path d="M23 116 Q70 126 117 116 L118 100 Q70 110 22 100 Z" fill="${t.shade}" opacity="0.7"/>`;
  if (t.type === 'overshirt' || t.type === 'blazer') {
    s += `<path d="M54 3 L70 60 L86 3 Z" fill="${t.inner}"/>`;
    s += `<path d="M50 3 L64 70 L54 118 L44 118 L40 30 Z" fill="${t.shade}"/><path d="M90 3 L76 70 L86 118 L96 118 L100 30 Z" fill="${t.shade}"/>`;
    s += `<path d="M62 4 L70 18 L78 4" fill="none" stroke="${t.shade}" stroke-width="3"/>`;
    if (t.type === 'overshirt') s += `<rect x="94" y="40" width="14" height="10" rx="2" fill="${t.shade}" opacity="0.9"/><circle cx="48" cy="36" r="4.5" fill="${t.accent}"/>`;
    else s += `<path d="M104 40 l6 -4 l2 6 z" fill="${t.accent}"/>`;
  } else if (t.type === 'wrap') {
    s += `<path d="M44 4 Q70 54 100 4 Q86 36 70 46 Q54 36 44 4 Z" fill="${c.skin}"/>`;
    s += `<path d="M40 6 Q72 60 104 112" fill="none" stroke="${t.shade}" stroke-width="5" opacity="0.8"/>`;
    s += `<path d="M30 70 Q70 80 112 64" fill="none" stroke="${t.accent}" stroke-width="3" opacity="0.6"/>`;
  } else {
    s += `<path d="M52 3 Q70 22 88 3" fill="${c.skinShade}"/><path d="M50 3 Q70 26 90 3" fill="none" stroke="${t.shade}" stroke-width="4"/>`;
    s += `<path d="M48 60 l8 -10 l8 10 l8 -10 l8 10" fill="none" stroke="${t.accent}" stroke-width="3" opacity="0.65"/>`;
  }
  if (opts.pearl) s += pearlNecklace();
  return `<g>${s}</g>`;
}

export function pearlNecklace() {
  return `<path d="M50 3 Q70 34 90 3" fill="none" stroke="#e9c46a" stroke-width="1.6"/>
  <circle cx="70" cy="21" r="5.2" fill="url(#pearlG)"/><circle cx="68.5" cy="19.5" r="1.6" fill="#fff"/>
  <defs><radialGradient id="pearlG" cx="0.35" cy="0.35" r="0.8"><stop offset="0" stop-color="#ffffff"/><stop offset="0.6" stop-color="#f1e9ee"/><stop offset="1" stop-color="#c9bccb"/></radialGradient></defs>`;
}

// Bras : boîte 34x100, épaule (17,8)
export function armGroup(id) {
  const c = ALL[id];
  return `<g><rect x="5" y="0" width="24" height="62" rx="12" fill="${c.top.main}"/><rect x="5" y="44" width="24" height="18" rx="6" fill="${c.top.shade}" opacity="0.6"/>
  <rect x="8" y="56" width="18" height="30" rx="9" fill="${c.skin}"/><circle cx="17" cy="88" r="10" fill="${c.skin}"/><circle cx="14" cy="86" r="4" fill="${c.skinLight}" opacity="0.5"/></g>`;
}

// Jambe : boîte 44x104, hanche (18,0)
export function legGroup(id) {
  const c = ALL[id];
  return `<g><rect x="6" y="0" width="25" height="88" rx="10" fill="${c.bottom}"/><rect x="6" y="70" width="25" height="10" rx="4" fill="#000" opacity="0.12"/>
  <path d="M2 92 Q2 82 14 82 L30 82 Q42 84 42 94 Q42 100 34 100 L6 100 Q2 100 2 92 Z" fill="${c.shoes}"/>
  <path d="M4 96 L42 96" stroke="${c.shoeAccent || '#999'}" stroke-width="3"/></g>`;
}

// ---------------------------------------------------------------- assemblages
const svg = (w, h, inner, vb) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}">${inner}</svg>`;

export const partSVG = {
  head: (id, e) => svg(200, 200, headGroup(id, e)),
  torso: (id, opts) => svg(140, 124, torsoGroup(id, opts)),
  arm: (id) => svg(34, 100, armGroup(id)),
  leg: (id) => svg(44, 104, legGroup(id)),
};

export function portraitSVG(id, e) {
  const c = ALL[id];
  const inner = `
  <g transform="translate(32 330) scale(2.4)">${torsoGroup(id)}</g>
  <g transform="translate(0 -32) scale(2)">${headGroup(id, e, `p${id}${e}`)}</g>`;
  return svg(400, 500, inner);
}

// Surcouche du collier pour les portraits de Kezia (même viewBox que le portrait)
export function pearlOverlaySVG() {
  return svg(400, 500, `<g transform="translate(32 330) scale(2.4)">${pearlNecklace()}</g>`);
}

// Silhouette complète. Origine pieds au centre (110, 396) dans une boîte 220x400.
// arms: angles en degrés (gauche, droite) ; positif = vers l'extérieur.
export function bodyGroup(id, { e = 'smile', armL = 6, armR = 6, pearl = false, uid = '' } = {}) {
  const ox = 110, oy = 396, sc = 0.98;
  const T = (x, y) => `translate(${ox + x} ${oy + y})`;
  return `<g transform="translate(${ox * (1 - sc)} ${oy * (1 - sc)}) scale(${sc})">
    <g transform="${T(-12 - 18, -100)}">${legGroup(id)}</g>
    <g transform="${T(12 - 18, -100)}">${legGroup(id)}</g>
    <g transform="${T(-44, -195)} rotate(${armL})"><g transform="translate(-17 -8)">${armGroup(id)}</g></g>
    <g transform="${T(44, -195)} rotate(${-armR})"><g transform="translate(-17 -8)">${armGroup(id)}</g></g>
    <g transform="${T(-70, -205)}">${torsoGroup(id, { pearl })}</g>
    <g transform="${T(-100, -388)}">${headGroup(id, e, uid || `b${id}${e}${armL}`)}</g>
  </g>`;
}

export function fullBodySVG(id, opts) {
  return svg(220, 400, bodyGroup(id, opts));
}
