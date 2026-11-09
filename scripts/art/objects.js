// Objets, souvenirs et illustrations de cinématiques.
import { svg, lin, rad, rng, bokeh } from './util.js';
import { bodyGroup } from './characters.js';

const I = (inner, defs = '') => svg(128, 128, `<defs>${defs}</defs>${inner}`);
const pearlDef = rad('pg', [[0, '#ffffff'], [0.55, '#f3ecf2'], [1, '#bdaec4']], 0.35, 0.3, 0.75);

export const objects = {
  badge_nwaja: I(`<rect x="24" y="30" width="80" height="84" rx="12" fill="#1f3157"/><rect x="52" y="10" width="24" height="26" rx="5" fill="#c8553d"/><rect x="32" y="42" width="64" height="30" rx="6" fill="#f4c25a"/><text x="64" y="64" font-family="Georgia, serif" font-weight="700" font-size="18" text-anchor="middle" fill="#1f3157">NWAJA</text><rect x="34" y="82" width="60" height="6" rx="3" fill="#fff" opacity="0.7"/><rect x="34" y="94" width="40" height="6" rx="3" fill="#fff" opacity="0.5"/>`),
  etoile: I(`<path d="M64 10 L78 46 L116 48 L86 72 L96 110 L64 88 L32 110 L42 72 L12 48 L50 46 Z" fill="#f4c25a" stroke="#fff3c4" stroke-width="4" stroke-linejoin="round"/><circle cx="54" cy="44" r="6" fill="#fff" opacity="0.7"/>`),
  quille: I(`<path d="M64 8 C78 8 80 30 74 42 C86 60 90 90 82 118 L46 118 C38 90 42 60 54 42 C48 30 50 8 64 8 Z" fill="#fff" stroke="#ddd" stroke-width="3"/><rect x="50" y="40" width="28" height="6" fill="#e33"/><rect x="50" y="50" width="28" height="4" fill="#e33"/>`),
  boule: I(`<circle cx="64" cy="64" r="52" fill="url(#bb)"/><circle cx="52" cy="44" r="7" fill="#111"/><circle cx="72" cy="40" r="7" fill="#111"/><circle cx="64" cy="60" r="7" fill="#111"/>`, rad('bb', [[0, '#ff7ad9'], [1, '#5a1a7a']], 0.35, 0.3, 0.8)),
  telephone: I(`<rect x="36" y="8" width="56" height="112" rx="12" fill="#222"/><rect x="41" y="18" width="46" height="88" rx="4" fill="#3d5ca0"/><rect x="46" y="28" width="30" height="12" rx="6" fill="#fff"/><rect x="52" y="48" width="30" height="12" rx="6" fill="#f4c25a"/><rect x="46" y="68" width="24" height="12" rx="6" fill="#fff"/><circle cx="64" cy="112" r="4" fill="#555"/>`),
  ticket_foire: I(`<path d="M10 36 H118 V54 A10 10 0 0 0 118 74 V92 H10 V74 A10 10 0 0 0 10 54 Z" fill="#c8553d"/><path d="M84 36 V92" stroke="#fff" stroke-dasharray="4 4" stroke-width="2"/><text x="46" y="62" font-family="Georgia, serif" font-weight="700" font-size="13" text-anchor="middle" fill="#fff">FOIRE DE</text><text x="46" y="80" font-family="Georgia, serif" font-weight="700" font-size="13" text-anchor="middle" fill="#fff">PARIS</text><text x="101" y="70" font-family="Arial" font-size="12" text-anchor="middle" fill="#fff">×2</text>`),
  cle: I(`<circle cx="40" cy="64" r="24" fill="none" stroke="#e8b54a" stroke-width="10"/><rect x="60" y="59" width="56" height="10" rx="4" fill="#e8b54a"/><rect x="96" y="66" width="8" height="18" fill="#e8b54a"/><rect x="108" y="66" width="8" height="12" fill="#e8b54a"/><rect x="78" y="40" width="40" height="18" rx="4" fill="#3a6fb0"/><text x="98" y="53" font-family="Arial" font-size="11" text-anchor="middle" fill="#fff">T3</text>`),
  coussin: I(`<path d="M14 40 Q64 20 114 40 Q124 64 114 88 Q64 108 14 88 Q4 64 14 40 Z" fill="#f7f1ff" stroke="#b9a7e0" stroke-width="4"/><path d="M40 64 Q64 54 88 64" stroke="#b9a7e0" stroke-width="3" fill="none"/><text x="64" y="84" font-family="Georgia, serif" font-size="14" text-anchor="middle" fill="#7356a6">zzz</text>`),
  collier: I(`<path d="M18 20 Q64 120 110 20" fill="none" stroke="#e9c46a" stroke-width="4"/><circle cx="64" cy="84" r="16" fill="url(#pg)"/><circle cx="58" cy="78" r="5" fill="#fff"/><circle cx="64" cy="84" r="26" fill="#fff" opacity="0.15"/>`, pearlDef),
  perle: I(`<circle cx="64" cy="64" r="34" fill="url(#pg)"/><circle cx="52" cy="50" r="10" fill="#fff"/>`, pearlDef),
  coquillage: I(`<path d="M14 80 Q64 20 114 80 Q64 104 14 80 Z" fill="#9b8b7c" stroke="#6a5c50" stroke-width="4"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M64 96 L${24 + i * 20} ${60 - Math.abs(i - 2) * 6}" stroke="#6a5c50" stroke-width="2.5"/>`).join('')}`),
  coquillage_ouvert: I(`<path d="M14 70 Q64 4 114 70 Z" fill="#b3a393" stroke="#6a5c50" stroke-width="4"/><path d="M14 74 Q64 120 114 74 Z" fill="#e8dcd2" stroke="#6a5c50" stroke-width="4"/><circle cx="64" cy="84" r="14" fill="url(#pg)"/><circle cx="59" cy="79" r="4" fill="#fff"/>`, pearlDef),
  billet_train: I(`<rect x="10" y="34" width="108" height="60" rx="8" fill="#f4e6d0" stroke="#c8553d" stroke-width="4"/><rect x="10" y="34" width="108" height="16" rx="6" fill="#c8553d"/><text x="64" y="76" font-family="Georgia, serif" font-size="14" text-anchor="middle" fill="#5a2a22">Aller · Retour</text>`),
  micro: I(`<rect x="46" y="10" width="36" height="62" rx="18" fill="#444"/>${[0, 1, 2, 3].map((i) => `<line x1="48" y1="${22 + i * 10}" x2="80" y2="${22 + i * 10}" stroke="#777" stroke-width="2"/>`).join('')}<path d="M34 54 Q34 88 64 88 Q94 88 94 54" fill="none" stroke="#888" stroke-width="6"/><rect x="61" y="88" width="6" height="22" fill="#888"/><rect x="42" y="108" width="44" height="8" rx="4" fill="#666"/>`),
  casque: I(`<path d="M22 76 Q22 22 64 22 Q106 22 106 76" fill="none" stroke="#2a2a33" stroke-width="10"/><rect x="12" y="66" width="26" height="40" rx="10" fill="#c8553d"/><rect x="90" y="66" width="26" height="40" rx="10" fill="#c8553d"/>`),
  ringlight: I(`<circle cx="64" cy="50" r="34" fill="none" stroke="#fff6dc" stroke-width="12"/><circle cx="64" cy="50" r="46" fill="#fff6dc" opacity="0.2"/><rect x="61" y="84" width="6" height="34" fill="#555"/><rect x="52" y="40" width="24" height="18" rx="3" fill="#222"/>`),
  lampe: I(`<path d="M34 50 L94 50 L84 18 L44 18 Z" fill="#f4c25a"/><circle cx="64" cy="54" r="40" fill="#f4c25a" opacity="0.2"/><rect x="61" y="50" width="6" height="56" fill="#555"/><rect x="40" y="104" width="48" height="10" rx="4" fill="#555"/>`),
  assiette: I(`<ellipse cx="64" cy="70" rx="54" ry="30" fill="#fff" stroke="#ddd" stroke-width="3"/><ellipse cx="64" cy="66" rx="36" ry="17" fill="#e8b54a"/><circle cx="52" cy="62" r="8" fill="#7a3a1e"/><circle cx="72" cy="64" r="7" fill="#4f9a4a"/><circle cx="64" cy="72" r="6" fill="#d4643f"/>`),
  message: I(`<path d="M16 24 H112 Q120 24 120 32 V84 Q120 92 112 92 H50 L28 112 L32 92 H16 Q8 92 8 84 V32 Q8 24 16 24 Z" fill="#4fc38a"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${30 + i * 10}" y="${58 - (i % 3) * 8 - 6}" width="5" height="${12 + (i % 3) * 16}" rx="2.5" fill="#fff"/>`).join('')}`),
  avion: I(`<path d="M10 70 L60 58 L86 18 L98 22 L84 58 L114 54 Q122 64 114 72 L84 70 L98 106 L86 110 L60 76 L10 74 Z" fill="#fff" stroke="#9fb6cf" stroke-width="3" stroke-linejoin="round"/><circle cx="96" cy="62" r="3" fill="#3a6fb0"/>`),
  tasse: I(`<path d="M24 46 H92 V90 Q92 112 58 112 Q24 112 24 90 Z" fill="#2f8f83"/><path d="M92 56 Q116 56 112 76 Q108 92 92 88" fill="none" stroke="#2f8f83" stroke-width="8"/><path d="M44 36 Q38 24 46 14 M62 36 Q56 24 64 14" stroke="#ccc" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M40 70 l6 -8 l6 8 l6 -8 l6 8" stroke="#fff" stroke-width="3" fill="none"/>`),
  coeur: I(`<path d="M64 112 C20 80 8 56 20 36 C32 16 56 20 64 38 C72 20 96 16 108 36 C120 56 108 80 64 112 Z" fill="#ff5f7e" stroke="#ffd0d9" stroke-width="4"/><ellipse cx="42" cy="44" rx="8" ry="12" fill="#fff" opacity="0.5" transform="rotate(-30 42 44)"/>`),
  lettre: I(`<rect x="12" y="30" width="104" height="70" rx="6" fill="#f7efe2" stroke="#d6c3a6" stroke-width="3"/><path d="M12 32 L64 74 L116 32" fill="none" stroke="#d6c3a6" stroke-width="3"/><path d="M64 84 C54 76 50 70 54 64 C58 58 63 60 64 64 C65 60 70 58 74 64 C78 70 74 76 64 84 Z" fill="#c8553d"/>`),
  brochure: I(`<rect x="22" y="12" width="84" height="104" rx="6" fill="#fff" stroke="#3a6fb0" stroke-width="4"/><rect x="30" y="22" width="68" height="40" fill="#d7e3ef"/><path d="M40 58 L40 40 L64 28 L88 40 L88 58 Z" fill="#fff" stroke="#3a6fb0" stroke-width="3"/><text x="64" y="80" font-family="Georgia, serif" font-size="11" text-anchor="middle" fill="#3a6fb0">« Notre futur</text><text x="64" y="96" font-family="Georgia, serif" font-size="11" text-anchor="middle" fill="#3a6fb0">appart » 😉</text>`),
  appel: I(`<circle cx="64" cy="64" r="52" fill="#4fc38a"/><path d="M44 36 Q40 40 42 50 Q50 78 78 86 Q88 88 92 84 L92 74 L78 68 L72 74 Q58 68 54 56 L60 50 L54 36 Z" fill="#fff"/>`),
  bulle: I(`<circle cx="64" cy="64" r="44" fill="#fff" opacity="0.95"/><text x="64" y="80" font-family="Georgia, serif" font-weight="700" font-size="46" text-anchor="middle" fill="#c8553d">!</text>`),
  sparkle: svg(32, 32, `<path d="M16 0 L19 13 L32 16 L19 19 L16 32 L13 19 L0 16 L13 13 Z" fill="#fff"/>`),
  dot: svg(16, 16, `<circle cx="8" cy="8" r="7" fill="#fff"/>`),
  halo: svg(256, 256, `<defs>${rad('h', [[0, '#fff', 0.9], [0.4, '#fff', 0.3], [1, '#fff', 0]])}</defs><circle cx="128" cy="128" r="128" fill="url(#h)"/>`),
  shadow: svg(160, 40, `<defs>${rad('s', [[0, '#000', 0.45], [1, '#000', 0]])}</defs><ellipse cx="80" cy="20" rx="80" ry="20" fill="url(#s)"/>`),
};

// ------------------------------------------------------------ cinématiques
export function cover() {
  const r = rng(888);
  let s = `<defs>${lin('cv', [[0, '#1a1240'], [0.45, '#7a3a7e'], [0.75, '#ef7a6a'], [1, '#ffc58a']])}${rad('sun', [[0, '#fff1c9', 1], [1, '#fff1c9', 0]])}</defs>
  <rect width="1280" height="720" fill="url(#cv)"/><circle cx="900" cy="520" r="300" fill="url(#sun)" opacity="0.55"/>`;
  for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 1280).toFixed(0)}" cy="${(r() * 300).toFixed(0)}" r="${(0.5 + r() * 1.5).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`;
  for (let x = 0; x < 1280; x += 80) { const h = 80 + r() * 120; s += `<rect x="${x}" y="${600 - h}" width="82" height="${h + 120}" fill="#2a1638" opacity="0.85"/>`; }
  s += `<g transform="translate(1040 600)"><path d="M-70 0 Q-20 -160 -4 -380 L4 -380 Q20 -160 70 0 L44 0 Q0 -80 -44 0 Z" fill="#2a1638"/><rect x="-50" y="-120" width="100" height="8" fill="#2a1638"/></g>`;
  s += bokeh(r, 40, 0, 1280, 300, 700, ['#ffd27a', '#ff9fb2'], 3, 14, 0.5);
  s += `<rect y="600" width="1280" height="120" fill="#1a0d22"/>`;
  s += `<g transform="translate(640 150) scale(1.33)">${bodyGroup('guillo', { e: 'smile', armR: 40, uid: 'cg' })}</g>`;
  s += `<g transform="translate(880 132) scale(1.33)">${bodyGroup('kezia', { e: 'tease', armL: 16, armR: 2, uid: 'ck' })}</g>`;
  s += `<path d="M960 170 C944 158 938 148 944 139 C950 130 958 133 960 139 C962 133 970 130 976 139 C982 148 976 158 960 170 Z" fill="#ff5f7e" opacity="0.9"/>`;
  return svg(1280, 720, s);
}

export function necklaceCinematic() {
  const r = rng(3);
  let s = `<defs>${rad('vel', [[0, '#3a1a4a'], [1, '#0d0614']], 0.5, 0.55, 0.7)}${rad('pg2', [[0, '#ffffff'], [0.55, '#f6eef4'], [1, '#b9a8c4']], 0.35, 0.3, 0.75)}${rad('beam', [[0, '#fff3d0', 0.6], [1, '#fff3d0', 0]])}</defs>
  <rect width="1280" height="720" fill="url(#vel)"/><circle cx="640" cy="380" r="320" fill="url(#beam)"/>`;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += `<path d="M640 380 L${640 + Math.cos(a) * 900} ${380 + Math.sin(a) * 900} L${640 + Math.cos(a + 0.08) * 900} ${380 + Math.sin(a + 0.08) * 900} Z" fill="#fff3d0" opacity="0.05"/>`; }
  s += `<g transform="translate(640 470)"><path d="M-260 0 Q0 -330 260 0 Z" fill="#b3a393" stroke="#6a5c50" stroke-width="8"/>${[...Array(9)].map((_, i) => `<path d="M0 0 L${-230 + i * 57} ${-60 - Math.sin((i / 8) * Math.PI) * 170}" stroke="#8a7a6c" stroke-width="5"/>`).join('')}
  <path d="M-260 8 Q0 200 260 8 Z" fill="#efe4da" stroke="#6a5c50" stroke-width="8"/><ellipse cx="0" cy="40" rx="190" ry="60" fill="#f8f0ea"/></g>`;
  s += `<path d="M380 140 Q640 700 900 140" fill="none" stroke="#e9c46a" stroke-width="5"/>`;
  s += `<circle cx="640" cy="500" r="64" fill="url(#pg2)"/><circle cx="618" cy="478" r="18" fill="#fff"/><circle cx="640" cy="500" r="110" fill="#fff" opacity="0.08"/>`;
  s += bokeh(r, 30, 200, 1080, 80, 680, ['#fff3d0', '#ffd0e6'], 2, 6, 0.8);
  return svg(1280, 720, s);
}
