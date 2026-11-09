// Générateur SVG des décors. Chaque monde d'exploration a 4 couches de parallaxe :
// far (lointain), mid (intermédiaire), near (plan du sol, défile à 1:1) et fg (premier plan flou).

import { rng, svg, lin, rad, bokeh, stringLights, windowsGrid, esc } from './util.js';
import { WORLDS, GROUND_Y, VIEW } from '../../src/data/layout.js';

export const FACTORS = { far: 0.22, mid: 0.55, near: 1, fg: 1.3 };
const H = VIEW.H;
export const layerWidth = (W, f) => Math.ceil(VIEW.W + f * (W - VIEW.W)) + 4;

const blurDef = (id, d) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${d}"/></filter>`;

function crowd(rand, x0, x1, yBase, color, n, scale = 1, op = 0.5) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + rand() * (x1 - x0);
    const h = (70 + rand() * 40) * scale;
    const w = (34 + rand() * 14) * scale;
    const hr = (13 + rand() * 6) * scale;
    const big = rand() < 0.25 ? 1.5 : 1;
    s += `<g opacity="${op}" fill="${color}"><rect x="${(x - w / 2).toFixed(1)}" y="${(yBase - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(w / 2.4).toFixed(1)}"/><circle cx="${x.toFixed(1)}" cy="${(yBase - h - hr * 0.7).toFixed(1)}" r="${(hr * big).toFixed(1)}"/></g>`;
  }
  return s;
}

function floorPlanks(W, y0, c1, c2, line) {
  let s = `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="url(#floorG)"/>`;
  s = `<defs>${lin('floorG', [[0, c1], [1, c2]])}</defs>` + s;
  for (let y = y0 + 14, k = 0; y < H; y += 12 + k * 3, k++) s += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${line}" stroke-width="1.2" opacity="0.35"/>`;
  for (let x = -400; x < W + 400; x += 90) s += `<line x1="${x}" y1="${y0}" x2="${x - (x - W / 2) * 0.35}" y2="${H}" stroke="${line}" stroke-width="1" opacity="0.18"/>`;
  return s;
}

function plant(x, y, s = 1, c = '#2f6b4a', pot = '#c8553d') {
  let p = `<g transform="translate(${x} ${y}) scale(${s})">`;
  for (let i = 0; i < 7; i++) {
    const a = -80 + i * 27;
    p += `<path d="M0 -40 Q${Math.cos((a * Math.PI) / 180) * 50} ${-90 + Math.abs(a) * 0.3} ${Math.cos((a * Math.PI) / 180) * 70} ${-60 + Math.abs(a) * 0.6}" fill="none" stroke="${c}" stroke-width="10" stroke-linecap="round"/>`;
  }
  p += `<path d="M-26 -42 L26 -42 L20 0 L-20 0 Z" fill="${pot}"/><rect x="-28" y="-46" width="56" height="8" rx="3" fill="${pot}" opacity="0.8"/></g>`;
  return p;
}

function neonText(x, y, text, size, color, anchor = 'middle', font = 'Georgia, serif') {
  return `<text x="${x}" y="${y}" font-family="${font}" font-weight="700" font-size="${size}" text-anchor="${anchor}" fill="${color}" opacity="0.35" filter="url(#nb)">${esc(text)}</text>
  <text x="${x}" y="${y}" font-family="${font}" font-weight="700" font-size="${size}" text-anchor="${anchor}" fill="#fff" stroke="${color}" stroke-width="2.5" paint-order="stroke">${esc(text)}</text>`;
}
const neonDefs = `<filter id="nb" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>`;

function highTable(x, y = GROUND_Y, c = '#2b1d1a', top = '#5a3a2c') {
  return `<g><ellipse cx="${x}" cy="${y - 2}" rx="34" ry="6" fill="#000" opacity="0.25"/><rect x="${x - 4}" y="${y - 110}" width="8" height="108" fill="${c}"/><ellipse cx="${x}" cy="${y - 112}" rx="40" ry="9" fill="${top}"/><rect x="${x - 26}" y="${y - 4}" width="52" height="5" rx="2" fill="${c}"/>
  <rect x="${x - 12}" y="${y - 132}" width="8" height="20" rx="2" fill="#f4c25a" opacity="0.8"/><rect x="${x + 6}" y="${y - 128}" width="7" height="16" rx="2" fill="#e8705a" opacity="0.8"/></g>`;
}

// ================================================================ NWAJA — soirée networking
function event() {
  const { width: W, stage, bar, exit } = WORLDS.event;
  const r = rng(13092025);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);

  let far = `<defs>${lin('wall', [[0, '#1b0f1f'], [0.6, '#3d1d2b'], [1, '#5b2b30']])}${lin('win', [[0, '#0d1433'], [1, '#2c2a5a']])}</defs>
  <rect width="${fw}" height="${H}" fill="url(#wall)"/>`;
  for (let y = 40; y < 600; y += 26) for (let x = (y / 26) % 2 ? 0 : 30; x < fw; x += 60) far += `<rect x="${x}" y="${y}" width="56" height="22" rx="2" fill="#000" opacity="0.07"/>`;
  for (let x = 120; x < fw - 200; x += 360) {
    far += `<g><path d="M${x} 520 L${x} 170 Q${x + 110} 70 ${x + 220} 170 L${x + 220} 520 Z" fill="url(#win)"/>`;
    for (let b = 0; b < 6; b++) {
      const bx = x + b * 38, bh = 80 + r() * 160;
      far += `<rect x="${bx}" y="${520 - bh}" width="34" height="${bh}" fill="#141634"/>` + windowsGrid(r, bx + 2, 528 - bh, 30, bh - 20, 3, Math.floor(bh / 18), '#ffcf7a', '#1b1d3d', 0.4);
    }
    far += bokeh(r, 8, x + 10, x + 210, 180, 480, ['#ffcf7a', '#ff8fa3', '#9ec9ff'], 3, 10, 0.4);
    far += `<path d="M${x} 520 L${x} 170 Q${x + 110} 70 ${x + 220} 170 L${x + 220} 520 Z M${x + 110} 120 L${x + 110} 520 M${x} 330 L${x + 220} 330" fill="none" stroke="#120a12" stroke-width="10"/></g>`;
  }
  far += `<rect y="520" width="${fw}" height="200" fill="#2a1418"/>`;

  let mid = `<defs>${neonDefs}${blurDef('bl2', 2)}</defs>`;
  for (let k = 0; k < 3; k++) mid += stringLights(-40 + k * 30, mw + 40, 70 + k * 46, 50, 70 + k * 6);
  mid += `<text x="${mw * 0.1}" y="250" font-family="Georgia, serif" font-style="italic" font-size="28" text-anchor="middle" fill="#ffd9a8" opacity="0.8">networking night · 13.09.2025</text>`;
  mid += `<g filter="url(#bl2)">${crowd(r, 0, mw, 600, '#1a0c12', 38, 1.15, 0.55)}</g>`;
  for (let x = 200; x < mw; x += 520) mid += plant(x, 600, 1.3, '#1f4a35', '#4a2a22');

  let near = floorPlanks(W, 560, '#5a3426', '#2e1a14', '#1a0e0a');
  near += `<rect x="0" y="548" width="${W}" height="14" fill="#1c0f0d"/>`;
  // scène
  const sx = stage.x, sw = stage.w, top = GROUND_Y - stage.h;
  near += `<defs>${lin('stg', [[0, '#3b2230'], [1, '#1d1018']])}${neonDefs}</defs>`;
  near += `<rect x="${sx + 40}" y="260" width="${sw - 80}" height="${top - 260}" rx="8" fill="#140b12" opacity="0.85"/>`;
  near += neonText(sx + sw / 2, 360, 'NWAJA', 76, '#f4c25a');
  near += `<text x="${sx + sw / 2}" y="410" font-family="Georgia, serif" font-size="22" text-anchor="middle" fill="#f6e3c9" letter-spacing="6">CONNECTER · INSPIRER · CRÉER</text>`;
  near += `<rect x="${sx}" y="${top}" width="${sw}" height="${stage.h}" fill="url(#stg)"/><rect x="${sx}" y="${top - 6}" width="${sw}" height="10" rx="3" fill="#6a3b4e"/>`;
  for (let x = sx + 30; x < sx + sw; x += 60) near += `<circle cx="${x}" cy="${top + 30}" r="5" fill="#ffd27a"/><circle cx="${x}" cy="${top + 30}" r="16" fill="#ffd27a" opacity="0.18"/>`;
  near += `<g><rect x="${sx + sw / 2 - 2}" y="${top - 120}" width="4" height="116" fill="#999"/><ellipse cx="${sx + sw / 2}" cy="${top - 124}" rx="7" ry="11" fill="#333"/><ellipse cx="${sx + sw / 2}" cy="${top - 4}" rx="22" ry="5" fill="#555"/></g>`;
  for (let x = 1300; x < bar - 200; x += 260) near += highTable(x);
  // bar à jus
  near += `<defs>${lin('barG', [[0, '#8a4b2e'], [1, '#4a2618']])}</defs>
  <rect x="${bar - 220}" y="300" width="440" height="160" rx="10" fill="#1c0f10"/>
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${bar - 200 + i * 60}" y="${330 + (i % 2) * 8}" width="26" height="${60 - (i % 3) * 10}" rx="6" fill="${['#f4c25a', '#e8705a', '#7bc96f', '#ff9fb2'][i % 4]}" opacity="0.85"/>`).join('')}
  ${neonText(bar, 290, 'Bar à jus', 40, '#7bc96f')}
  <rect x="${bar - 240}" y="480" width="480" height="${GROUND_Y - 480 - 30}" rx="6" fill="url(#barG)"/><rect x="${bar - 250}" y="470" width="500" height="16" rx="5" fill="#c58a5c"/>`;
  // porte de sortie
  near += `<rect x="${exit - 70}" y="380" width="140" height="${GROUND_Y - 380}" rx="6" fill="#120a0e"/><rect x="${exit - 60}" y="390" width="120" height="${GROUND_Y - 392}" rx="4" fill="#2a1a22"/><circle cx="${exit + 44}" cy="520" r="5" fill="#f4c25a"/>
  ${neonText(exit, 360, 'Afterparty →', 30, '#ff7ad9', 'middle', 'Arial, sans-serif')}`;
  near += plant(1180, GROUND_Y - 4, 1.1, '#2f6b4a', '#7a3a2c') + plant(2700, GROUND_Y - 4, 1.2);

  let fg = `<defs>${blurDef('bl', 7)}</defs><g filter="url(#bl)" opacity="0.85">`;
  for (let x = 300; x < fgw; x += 700) fg += plant(x, H + 30, 2.4, '#0e1f16', '#1a0d0c');
  for (let x = 650; x < fgw; x += 900) fg += `<ellipse cx="${x}" cy="${H + 10}" rx="160" ry="60" fill="#0c0608"/>`;
  fg += `</g>`;

  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Bowling
function bowling() {
  const { width: W, keziaLane, exit } = WORLDS.bowling;
  const r = rng(42);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('bw', [[0, '#0b0820'], [1, '#2a1250']])}${neonDefs}</defs><rect width="${fw}" height="${H}" fill="url(#bw)"/>`;
  for (let x = 0; x < fw; x += 160) far += `<path d="M${x} 120 l40 -30 l40 30 l40 -30" fill="none" stroke="${['#ff4fd8', '#3de0ff', '#ffe14f'][(x / 160) % 3]}" stroke-width="5" opacity="0.5"/>`;
  for (let x = 140; x < fw; x += 420) far += `<rect x="${x}" y="170" width="200" height="90" rx="8" fill="#0d0d1a" stroke="#3de0ff" stroke-width="3"/><text x="${x + 100}" y="228" font-family="Arial Black, Arial" font-size="34" text-anchor="middle" fill="#ffe14f">${['STRIKE!', 'SPARE', '7 · 10', 'X X X'][(x / 420) | 0 % 4] || 'STRIKE!'}</text>`;
  far += neonText(fw * 0.5, 110, 'BOWLING', 70, '#ff4fd8', 'middle', 'Arial Black, Arial');

  let mid = `<defs>${lin('lane', [[0, '#c99a61'], [1, '#f0c98e']])}${lin('pit', [[0, '#05030c'], [1, '#1a1033']])}</defs><rect y="290" width="${mw}" height="60" fill="url(#pit)"/>`;
  for (let x = 0, n = 1; x < mw; x += 250, n++) {
    mid += `<path d="M${x + 70} 330 L${x + 180} 330 L${x + 240} 600 L${x + 10} 600 Z" fill="url(#lane)"/><path d="M${x + 60} 330 L${x + 70} 330 L${x + 10} 600 L${x - 10} 600 Z M${x + 180} 330 L${x + 190} 330 L${x + 260} 600 L${x + 240} 600 Z" fill="#222"/>`;
    for (let i = 0; i < 6; i++) mid += `<line x1="${x + 90 + i * 14}" y1="330" x2="${x + 40 + i * 34}" y2="600" stroke="#b07e48" stroke-width="1" opacity="0.6"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j <= i; j++) mid += `<g transform="translate(${x + 125 - i * 7 + j * 14} ${318 - i * 4})"><ellipse cx="0" cy="0" rx="4" ry="11" fill="#fff"/><rect x="-4" y="-6" width="8" height="2" fill="#e33"/></g>`;
    mid += `<text x="${x + 125}" y="285" font-family="Arial Black, Arial" font-size="22" text-anchor="middle" fill="#3de0ff">${n}</text>`;
  }

  let near = `<defs>${lin('cp', [[0, '#1b1036'], [1, '#0c0720']])}</defs><rect y="590" width="${W}" height="${H - 590}" fill="url(#cp)"/>`;
  for (let i = 0; i < 160; i++) {
    const x = r() * W, y = 600 + r() * 120, c = ['#ff4fd8', '#3de0ff', '#ffe14f', '#7bff8a'][i % 4];
    near += i % 2 ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(3 + r() * 6).toFixed(1)}" fill="none" stroke="${c}" stroke-width="2" opacity="0.5"/>` : `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q8 -8 16 0 t16 0" fill="none" stroke="${c}" stroke-width="2" opacity="0.45"/>`;
  }
  for (let x = 300; x < W; x += 600) near += `<g><rect x="${x}" y="540" width="120" height="70" rx="20" fill="#2a2a44"/><circle cx="${x + 34}" cy="545" r="17" fill="#ff4fd8"/><circle cx="${x + 72}" cy="545" r="17" fill="#3de0ff"/><circle cx="${x + 100}" cy="548" r="14" fill="#ffe14f"/></g>`;
  near += `<g><rect x="${keziaLane - 120}" y="560" width="240" height="40" rx="10" fill="#3b2a6a"/><text x="${keziaLane}" y="587" font-family="Arial Black, Arial" font-size="20" text-anchor="middle" fill="#ffe14f">PISTE 7</text></g>`;
  near += `<rect x="${exit - 60}" y="400" width="120" height="${GROUND_Y - 400}" rx="6" fill="#05030c" stroke="#3de0ff" stroke-width="3"/><text x="${exit}" y="390" font-family="Arial Black, Arial" font-size="22" text-anchor="middle" fill="#3de0ff">SORTIE</text>`;

  let fg = `<defs>${blurDef('bl', 8)}</defs><g filter="url(#bl)">`;
  for (let x = 200; x < fgw; x += 640) fg += `<circle cx="${x}" cy="${H + 20}" r="90" fill="#140a2a"/><circle cx="${x + 120}" cy="${H + 40}" r="70" fill="#2a0f3a"/>`;
  fg += `</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Foire de Paris
function fair() {
  const { width: W, immo, literie, perles, exit } = WORLDS.fair;
  const r = rng(2026);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('hall', [[0, '#d9e4ef'], [0.5, '#f6efe4'], [1, '#e9d6bf']])}</defs><rect width="${fw}" height="${H}" fill="url(#hall)"/>`;
  for (let x = -100; x < fw; x += 140) far += `<path d="M${x} 0 L${x + 140} 160 M${x + 140} 0 L${x} 160" stroke="#9aa7b6" stroke-width="3" opacity="0.5"/>`;
  far += `<rect y="0" width="${fw}" height="10" fill="#8f9bab"/><rect y="156" width="${fw}" height="8" fill="#8f9bab"/>`;
  for (let x = 60; x < fw; x += 300) far += `<rect x="${x}" y="20" width="180" height="120" fill="#fff" opacity="0.6"/><rect x="${x}" y="180" width="200" height="300" fill="#fff" opacity="0.13"/>`;
  for (let x = 200; x < fw; x += 600) far += `<g><rect x="${x}" y="164" width="4" height="40" fill="#777"/><rect x="${x - 150}" y="200" width="304" height="70" rx="6" fill="#c8553d"/><text x="${x + 2}" y="246" font-family="Georgia, serif" font-weight="700" font-size="30" text-anchor="middle" fill="#fff">FOIRE DE PARIS</text></g>`;

  let mid = `<defs>${blurDef('b1', 1.5)}</defs>`;
  const names = ['Saveurs du monde', 'Déco &amp; Maison', 'Jardin', 'Cuisines', 'Artisanat', 'Bien-être', 'Voyages'];
  const cols = ['#2f8f83', '#e0a43b', '#7356a6', '#c8553d', '#3a6fb0', '#d46a8c', '#4f9a4a'];
  for (let x = 40, i = 0; x < mw; x += 330, i++) {
    const c = cols[i % cols.length];
    mid += `<g><rect x="${x}" y="330" width="280" height="250" fill="#f7f1e8"/><rect x="${x}" y="300" width="280" height="44" fill="${c}"/><text x="${x + 140}" y="330" font-family="Arial, sans-serif" font-weight="700" font-size="20" text-anchor="middle" fill="#fff">${names[i % names.length]}</text>
    <rect x="${x + 20}" y="370" width="100" height="70" fill="${c}" opacity="0.25"/><rect x="${x + 150}" y="380" width="110" height="60" fill="${c}" opacity="0.18"/><rect x="${x + 10}" y="500" width="260" height="80" fill="${c}" opacity="0.4"/></g>`;
  }
  mid += `<g filter="url(#b1)">${crowd(r, 0, mw, 620, '#6b5a68', 46, 1.1, 0.45)}</g>`;

  let near = `<defs>${lin('cpt', [[0, '#b2443a'], [1, '#7d2a26']])}${lin('grey', [[0, '#cbbfb0'], [1, '#a89a8a']])}</defs>
  <rect y="560" width="${W}" height="${H - 560}" fill="url(#grey)"/><path d="M0 600 L${W} 600 L${W} ${H} L0 ${H} Z" fill="url(#cpt)"/><rect y="596" width="${W}" height="6" fill="#e8d3a2"/>`;
  const stand = (x, title, sub, color) => `<g><rect x="${x - 260}" y="250" width="520" height="${GROUND_Y - 250}" fill="#fffaf2"/><rect x="${x - 270}" y="200" width="540" height="64" rx="6" fill="${color}"/>
    <text x="${x}" y="244" font-family="Georgia, serif" font-weight="700" font-size="32" text-anchor="middle" fill="#fff">${esc(title)}</text>
    <text x="${x}" y="300" font-family="Georgia, serif" font-style="italic" font-size="20" text-anchor="middle" fill="${color}">${esc(sub)}</text>
    <rect x="${x - 270}" y="200" width="10" height="${GROUND_Y - 200}" fill="${color}" opacity="0.8"/><rect x="${x + 260}" y="200" width="10" height="${GROUND_Y - 200}" fill="${color}" opacity="0.8"/></g>`;
  near += stand(immo, 'Appartements neufs', 'Visitez votre futur chez-vous', '#3a6fb0');
  near += `<g><rect x="${immo - 220}" y="330" width="170" height="120" fill="#e3edf7"/>${windowsGrid(r, immo - 210, 340, 150, 100, 5, 4, '#ffd27a', '#9fb6cf', 0.5)}<rect x="${immo + 20}" y="320" width="200" height="140" rx="6" fill="#d7e3ef"/><path d="M${immo + 40} 440 L${immo + 40} 380 L${immo + 120} 340 L${immo + 200} 380 L${immo + 200} 440 Z" fill="#fff" stroke="#3a6fb0" stroke-width="4"/><rect x="${immo + 105}" y="400" width="30" height="40" fill="#3a6fb0"/>
  <rect x="${immo - 230}" y="500" width="460" height="${GROUND_Y - 500}" rx="6" fill="#3a6fb0"/><text x="${immo}" y="560" font-family="Arial, sans-serif" font-weight="700" font-size="22" text-anchor="middle" fill="#fff">T2 · T3 · T4 — Prix découverte</text></g>`;
  near += stand(literie, 'Literie & Rêves', 'Essayez avant de rêver', '#7356a6');
  near += `<g><rect x="${literie - 200}" y="330" width="400" height="120" rx="14" fill="#5c4389"/><rect x="${literie - 210}" y="450" width="420" height="80" rx="16" fill="#f7f1ff"/><rect x="${literie - 210}" y="500" width="420" height="40" rx="12" fill="#b9a7e0"/>
  <rect x="${literie - 180}" y="420" width="120" height="44" rx="20" fill="#fff"/><rect x="${literie + 60}" y="420" width="120" height="44" rx="20" fill="#fff"/><rect x="${literie - 200}" y="530" width="20" height="${GROUND_Y - 530}" fill="#3d2c5c"/><rect x="${literie + 180}" y="530" width="20" height="${GROUND_Y - 530}" fill="#3d2c5c"/></g>`;
  near += stand(perles, 'Perles & Coquillages', 'Ouvrez une huître, trouvez votre perle !', '#2f8f83');
  near += `<g><rect x="${perles - 230}" y="470" width="460" height="${GROUND_Y - 470}" rx="8" fill="#2f8f83"/><ellipse cx="${perles}" cy="470" rx="200" ry="26" fill="#9fe0d7"/><ellipse cx="${perles}" cy="466" rx="180" ry="18" fill="#c9f2ec"/>
  ${[...Array(9)].map((_, i) => `<ellipse cx="${perles - 150 + i * 38}" cy="${462 + (i % 2) * 6}" rx="16" ry="9" fill="#8b7d70" stroke="#5d5249" stroke-width="2"/>`).join('')}
  <rect x="${perles - 220}" y="330" width="440" height="110" rx="10" fill="#e8f6f3"/>${[...Array(7)].map((_, i) => `<path d="M${perles - 180 + i * 60} 350 Q${perles - 160 + i * 60} 400 ${perles - 140 + i * 60} 350" fill="none" stroke="#e9c46a" stroke-width="2"/><circle cx="${perles - 160 + i * 60}" cy="376" r="6" fill="#fff" stroke="#ddd"/>`).join('')}</g>`;
  near += `<g><rect x="${exit - 90}" y="300" width="180" height="70" rx="8" fill="#2a7d3a"/><text x="${exit}" y="345" font-family="Arial, sans-serif" font-weight="700" font-size="28" text-anchor="middle" fill="#fff">SORTIE →</text><rect x="${exit - 4}" y="370" width="8" height="${GROUND_Y - 370}" fill="#777"/></g>`;
  for (let x = 1320; x < W; x += 1000) near += plant(x, GROUND_Y - 2, 1.1, '#3d7a50', '#e8d3a2');

  let fg = `<defs>${blurDef('bl', 8)}</defs><g filter="url(#bl)">${crowd(r, 0, fgw, H + 120, '#3b2e36', 9, 2.2, 0.75)}</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Studio NWAJA (podcast & contenu)
function studio() {
  const { width: W, ringlight, desk, exit } = WORLDS.studio;
  const r = rng(77);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('sky', [[0, '#ffb877'], [1, '#ffd9a8']])}${lin('brk', [[0, '#7a3b2c'], [1, '#4f241b']])}</defs><rect width="${fw}" height="${H}" fill="url(#brk)"/>`;
  for (let y = 0; y < H; y += 24) for (let x = (y / 24) % 2 ? -30 : 0; x < fw; x += 60) far += `<rect x="${x}" y="${y}" width="56" height="20" rx="2" fill="#000" opacity="${(0.05 + r() * 0.1).toFixed(2)}"/>`;
  for (let x = 150; x < fw; x += 420) far += `<rect x="${x}" y="90" width="240" height="300" fill="url(#sky)"/><path d="M${x} 90 h240 v300 h-240 Z M${x + 120} 90 v300 M${x} 240 h240" fill="none" stroke="#2a1a14" stroke-width="10"/><rect x="${x + 20}" y="300" width="200" height="90" fill="#e58c55" opacity="0.5"/>`;
  let mid = `<defs>${neonDefs}</defs>`;
  mid += neonText(mw * 0.3, 200, 'NWAJA', 90, '#f4c25a');
  mid += `<g><rect x="${mw * 0.55}" y="120" width="360" height="230" rx="8" fill="#f8f6f2" stroke="#ccc" stroke-width="6"/><text x="${mw * 0.55 + 180}" y="165" font-family="Georgia, serif" font-weight="700" font-size="26" text-anchor="middle" fill="#c8553d">ÉQUIPE PODCAST</text>
  ${['Animation', 'Son', 'Montage', 'Réseaux'].map((t, i) => `<text x="${mw * 0.55 + 40}" y="${210 + i * 34}" font-family="Arial, sans-serif" font-size="22" fill="#334">☐ ${t}</text>`).join('')}</g>`;
  mid += `<g><rect x="${mw * 0.12}" y="280" width="150" height="200" fill="#c8553d"/><text x="${mw * 0.12 + 75}" y="380" font-family="Arial Black, Arial" font-size="30" text-anchor="middle" fill="#fff">ON AIR</text></g>`;
  for (let x = 80; x < mw; x += 560) mid += plant(x, 600, 1.2, '#2f6b4a', '#e8d3a2');
  let near = floorPlanks(W, 570, '#9a6a45', '#5a3a26', '#3a2416');
  near += `<g><circle cx="${ringlight}" cy="400" r="70" fill="none" stroke="#fff" stroke-width="16"/><circle cx="${ringlight}" cy="400" r="110" fill="#fff" opacity="0.12"/><rect x="${ringlight - 3}" y="470" width="6" height="${GROUND_Y - 470}" fill="#444"/><path d="M${ringlight - 40} ${GROUND_Y} L${ringlight} ${GROUND_Y - 40} L${ringlight + 40} ${GROUND_Y}" stroke="#444" stroke-width="5" fill="none"/><rect x="${ringlight - 22}" y="388" width="44" height="26" rx="4" fill="#222"/></g>`;
  near += `<g><rect x="${desk - 200}" y="500" width="400" height="16" rx="4" fill="#3a2416"/><rect x="${desk - 190}" y="516" width="12" height="${GROUND_Y - 516}" fill="#3a2416"/><rect x="${desk + 178}" y="516" width="12" height="${GROUND_Y - 516}" fill="#3a2416"/>
  <rect x="${desk - 80}" y="420" width="140" height="80" rx="6" fill="#222"/><rect x="${desk - 74}" y="426" width="128" height="68" fill="#3d5a8a"/><text x="${desk - 10}" y="468" font-family="Arial, sans-serif" font-weight="700" font-size="16" text-anchor="middle" fill="#fff">NWAJA app</text></g>`;
  near += `<rect x="${exit - 60}" y="380" width="120" height="${GROUND_Y - 380}" rx="6" fill="#2a1a14"/><circle cx="${exit + 40}" cy="520" r="5" fill="#f4c25a"/>`;
  let fg = `<defs>${blurDef('bl', 7)}</defs><g filter="url(#bl)">${plant(400, H + 60, 2.6, '#0f2418', '#2a1a14')}${plant(1500, H + 60, 2.4, '#0f2418', '#2a1a14')}${plant(2700, H + 60, 2.6, '#0f2418', '#2a1a14')}</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Paris de nuit
function eiffel(x, y, h, col = '#1a1530', lights = true) {
  const w = h * 0.36;
  let s = `<g><path d="M${x - w / 2} ${y} Q${x - w * 0.16} ${y - h * 0.45} ${x - 4} ${y - h} L${x + 4} ${y - h} Q${x + w * 0.16} ${y - h * 0.45} ${x + w / 2} ${y} L${x + w * 0.28} ${y} Q${x} ${y - h * 0.22} ${x - w * 0.28} ${y} Z" fill="${col}"/>
  <rect x="${x - w * 0.3}" y="${y - h * 0.3}" width="${w * 0.6}" height="${h * 0.03}" fill="${col}"/><rect x="${x - w * 0.18}" y="${y - h * 0.58}" width="${w * 0.36}" height="${h * 0.025}" fill="${col}"/>`;
  if (lights) for (let i = 0; i < 40; i++) {
    const t = i / 40, yy = y - t * h * 0.98, ww = (w / 2) * Math.pow(1 - t, 1.6);
    s += `<circle cx="${x + (i % 2 ? ww : -ww) * 0.8}" cy="${yy}" r="2" fill="#ffd27a" opacity="0.9"/>`;
  }
  return s + '</g>';
}

function paris() {
  const { width: W, restaurant } = WORLDS.paris;
  const r = rng(75);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('ns', [[0, '#0a1030'], [0.6, '#2a2160'], [1, '#6a3a6e']])}</defs><rect width="${fw}" height="${H}" fill="url(#ns)"/>`;
  for (let i = 0; i < 120; i++) far += `<circle cx="${(r() * fw).toFixed(0)}" cy="${(r() * 300).toFixed(0)}" r="${(0.6 + r() * 1.6).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.7).toFixed(2)}"/>`;
  far += `<circle cx="${fw * 0.8}" cy="110" r="44" fill="#fff4d6"/><circle cx="${fw * 0.8}" cy="110" r="90" fill="#fff4d6" opacity="0.1"/>`;
  far += eiffel(fw * 0.45, 470, 420);
  for (let x = 0; x < fw; x += 90) { const h = 60 + r() * 70; far += `<rect x="${x}" y="${470 - h}" width="92" height="${h + 250}" fill="#1c1838"/>`; }
  let mid = '';
  for (let x = 0; x < mw; x += 300) {
    const h = 300 + r() * 60;
    mid += `<g><rect x="${x}" y="${600 - h}" width="296" height="${h}" fill="#d9c7a8"/><path d="M${x - 6} ${600 - h} L${x + 302} ${600 - h} L${x + 280} ${560 - h} L${x + 16} ${560 - h} Z" fill="#59606e"/>`;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const on = r() < 0.55, wx = x + 22 + i * 70, wy = 620 - h + j * 70;
      if (wy > 560) continue;
      mid += `<rect x="${wx}" y="${wy}" width="40" height="52" fill="${on ? '#ffcf7a' : '#2a2a40'}" opacity="${on ? 0.95 : 0.9}"/>`;
      if (j === 1) mid += `<rect x="${wx - 8}" y="${wy + 50}" width="56" height="12" fill="none" stroke="#222" stroke-width="2"/>`;
    }
    mid += `<rect x="${x}" y="${600 - h}" width="296" height="${h}" fill="#1a1530" opacity="0.38"/></g>`;
  }
  let near = `<defs>${lin('sw', [[0, '#3a3548'], [1, '#1e1b28']])}${rad('lampG', [[0, '#ffd27a', 0.55], [1, '#ffd27a', 0]])}${neonDefs}</defs><rect y="590" width="${W}" height="${H - 590}" fill="url(#sw)"/><rect y="586" width="${W}" height="8" fill="#6a6478"/>`;
  for (let x = 120; x < W; x += 420) near += `<g><circle cx="${x}" cy="360" r="130" fill="url(#lampG)"/><rect x="${x - 4}" y="370" width="8" height="${GROUND_Y - 370}" fill="#1a1820"/><path d="M${x - 18} 372 L${x + 18} 372 L${x + 12} 340 L${x - 12} 340 Z" fill="#ffd27a"/><rect x="${x - 14}" y="${GROUND_Y - 10}" width="28" height="10" fill="#1a1820"/></g>`;
  near += `<g><rect x="${restaurant - 230}" y="240" width="460" height="${GROUND_Y - 240}" fill="#5a2a22"/><rect x="${restaurant - 200}" y="360" width="250" height="200" fill="#ffb86b" opacity="0.85"/><rect x="${restaurant + 80}" y="360" width="100" height="${GROUND_Y - 360}" fill="#2a120e"/>
  <path d="M${restaurant - 240} 300 L${restaurant + 240} 300 L${restaurant + 220} 350 L${restaurant - 220} 350 Z" fill="#c8553d"/>${[...Array(12)].map((_, i) => `<rect x="${restaurant - 240 + i * 40}" y="300" width="20" height="50" fill="#f4e6d0" opacity="0.6"/>`).join('')}
  ${neonText(restaurant, 285, 'Restaurant', 34, '#ffb86b')}</g>`;
  let fg = `<defs>${blurDef('bl', 8)}</defs><g filter="url(#bl)">`;
  for (let x = 500; x < fgw; x += 820) fg += `<rect x="${x}" y="200" width="22" height="${H}" fill="#0a0812"/><circle cx="${x + 11}" cy="200" r="40" fill="#ffd27a" opacity="0.25"/>`;
  fg += `</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Malaisie (toits de Kuala Lumpur, la nuit)
function twinTowers(x, y, h, col) {
  const tw = (cx) => `<path d="M${cx - 28} ${y} L${cx - 28} ${y - h * 0.6} L${cx - 22} ${y - h * 0.7} L${cx - 22} ${y - h * 0.8} L${cx - 14} ${y - h * 0.88} L${cx - 2} ${y - h} L${cx + 2} ${y - h} L${cx + 14} ${y - h * 0.88} L${cx + 22} ${y - h * 0.8} L${cx + 22} ${y - h * 0.7} L${cx + 28} ${y - h * 0.6} L${cx + 28} ${y} Z" fill="${col}"/>
    ${[...Array(26)].map((_, i) => `<rect x="${cx - 20}" y="${y - 12 - i * h * 0.024}" width="40" height="2" fill="#bfe8ff" opacity="${0.25 + (i % 3) * 0.2}"/>`).join('')}`;
  return `<g>${tw(x - 60)}${tw(x + 60)}<rect x="${x - 34}" y="${y - h * 0.45}" width="68" height="8" fill="${col}"/></g>`;
}

function malaysia() {
  const { width: W } = WORLDS.malaysia;
  const r = rng(60);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('ms', [[0, '#05142a'], [0.55, '#163a5e'], [1, '#7a3f6e']])}</defs><rect width="${fw}" height="${H}" fill="url(#ms)"/>`;
  for (let i = 0; i < 100; i++) far += `<circle cx="${(r() * fw).toFixed(0)}" cy="${(r() * 280).toFixed(0)}" r="${(0.5 + r() * 1.5).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`;
  far += `<circle cx="${fw * 0.2}" cy="120" r="56" fill="#fff8e0"/><circle cx="${fw * 0.2}" cy="120" r="120" fill="#fff8e0" opacity="0.08"/>`;
  far += twinTowers(fw * 0.55, 560, 470, '#0c1a33');
  for (let x = 0; x < fw; x += 70) { const h = 80 + r() * 160; far += `<rect x="${x}" y="${560 - h}" width="66" height="${h + 200}" fill="#0f2038"/>` + windowsGrid(r, x + 4, 570 - h, 58, h - 10, 4, Math.max(2, Math.floor(h / 22)), '#9fe0ff', '#0f2038', 0.3); }
  let mid = `<defs>${neonDefs}</defs>`;
  for (let x = 0; x < mw; x += 240) { const h = 200 + r() * 140; mid += `<rect x="${x}" y="${640 - h}" width="230" height="${h}" fill="#1a2440"/>` + windowsGrid(r, x + 10, 660 - h, 210, h - 40, 6, Math.floor(h / 30), '#ffcf7a', '#141c33', 0.35); }
  for (let x = 160; x < mw; x += 700) mid += neonText(x, 360, ['Selamat malam', 'Kopi', 'Jalan Alor', 'Teh tarik'][(x / 700) | 0 % 4] || 'Kopi', 30, '#ff5f8f', 'middle', 'Arial, sans-serif');
  for (let x = 0; x < mw; x += 500) mid += stringLights(x, x + 480, 420, 40, 40, '#ff6b5a', '#2a1a22');
  let near = `<defs>${lin('rf', [[0, '#3a3f55'], [1, '#1f2233']])}</defs><rect y="${GROUND_Y}" width="${W}" height="${H - GROUND_Y}" fill="url(#rf)"/><rect y="${GROUND_Y - 6}" width="${W}" height="10" fill="#5a6078"/>`;
  for (let x = 160; x < W; x += 520) near += `<g><rect x="${x}" y="${GROUND_Y - 80}" width="90" height="74" rx="6" fill="#59607a"/><circle cx="${x + 45}" cy="${GROUND_Y - 44}" r="26" fill="#3a3f55"/><path d="M${x + 25} ${GROUND_Y - 44} L${x + 65} ${GROUND_Y - 44} M${x + 45} ${GROUND_Y - 64} L${x + 45} ${GROUND_Y - 24}" stroke="#7a819c" stroke-width="4"/></g>`;
  near += `<g><rect x="${W - 200}" y="${GROUND_Y - 220}" width="12" height="220" fill="#777"/><path d="M${W - 194} ${GROUND_Y - 220} l-40 -60 M${W - 194} ${GROUND_Y - 220} l40 -60" stroke="#999" stroke-width="5"/><circle cx="${W - 194}" cy="${GROUND_Y - 226}" r="9" fill="#ff5f8f"/></g>`;
  let fg = `<defs>${blurDef('bl', 6)}</defs><g filter="url(#bl)">`;
  for (let x = 300; x < fgw; x += 760) fg += `<rect x="${x}" y="${H - 80}" width="200" height="120" fill="#0b0e18"/><circle cx="${x + 100}" cy="${H - 120}" r="18" fill="#ff6b5a" opacity="0.6"/>`;
  fg += `</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Le chemin des souvenirs (final)
function memories() {
  const { width: W, tree } = WORLDS.memories;
  const r = rng(1);
  const fw = layerWidth(W, FACTORS.far), mw = layerWidth(W, FACTORS.mid), fgw = layerWidth(W, FACTORS.fg);
  let far = `<defs>${lin('dm', [[0, '#120a2e'], [0.5, '#4a2466'], [0.85, '#d76b8a'], [1, '#ffb38a']])}${blurDef('au', 30)}</defs><rect width="${fw}" height="${H}" fill="url(#dm)"/>`;
  far += `<g filter="url(#au)" opacity="0.45"><path d="M0 200 Q${fw * 0.25} 80 ${fw * 0.5} 190 T${fw} 160 L${fw} 260 Q${fw * 0.5} 300 0 280 Z" fill="#6affd2"/><path d="M0 120 Q${fw * 0.3} 220 ${fw * 0.6} 110 T${fw} 140 L${fw} 180 Q${fw * 0.5} 220 0 170 Z" fill="#b48cff"/></g>`;
  for (let i = 0; i < 260; i++) far += `<circle cx="${(r() * fw).toFixed(0)}" cy="${(r() * 460).toFixed(0)}" r="${(0.5 + r() * 1.8).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.7).toFixed(2)}"/>`;
  let mid = `<defs>${blurDef('mb', 1)}</defs><g opacity="0.55" filter="url(#mb)">`;
  const isl = (x, y, inner) => `<g><path d="M${x - 130} ${y} Q${x} ${y - 30} ${x + 130} ${y} Q${x + 60} ${y + 90} ${x} ${y + 120} Q${x - 70} ${y + 90} ${x - 130} ${y} Z" fill="#2a1a4a"/>${inner}</g>`;
  mid += isl(mw * 0.08, 430, eiffel(mw * 0.08, 432, 220, '#2a1a4a', false));
  mid += isl(mw * 0.26, 380, `<ellipse cx="${mw * 0.26}" cy="320" rx="22" ry="58" fill="#f6e3ff"/><rect x="${mw * 0.26 - 22}" y="300" width="44" height="8" fill="#e33"/>`);
  mid += isl(mw * 0.44, 420, `<rect x="${mw * 0.44 - 110}" y="370" width="220" height="50" rx="20" fill="#3a2a6a"/><rect x="${mw * 0.44 - 90}" y="380" width="180" height="20" fill="#ffd27a" opacity="0.7"/>`);
  mid += isl(mw * 0.62, 400, `<path d="M${mw * 0.62 - 120} 400 L${mw * 0.62 - 60} 330 L${mw * 0.62 + 20} 360 L${mw * 0.62 + 120} 400 Z" fill="#3d6a55"/>`);
  mid += isl(mw * 0.8, 420, twinTowers(mw * 0.8, 424, 260, '#2a1a4a'));
  mid += `</g>`;
  mid += bokeh(r, 50, 0, mw, 100, 600, ['#ffd27a', '#ff9fb2', '#b48cff'], 2, 7, 0.6);
  let near = `<defs>${lin('gr', [[0, '#3a1f5a'], [1, '#150a24']])}${rad('pathG', [[0, '#ffe6b0', 0.7], [1, '#ffe6b0', 0]])}</defs><rect y="${GROUND_Y - 30}" width="${W}" height="${H}" fill="url(#gr)"/>`;
  near += `<ellipse cx="${W / 2}" cy="${GROUND_Y + 10}" rx="${W / 2}" ry="20" fill="url(#pathG)"/>`;
  for (let i = 0; i < 160; i++) { const x = r() * W, y = GROUND_Y - 20 + r() * 60; near += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + r() * 3).toFixed(1)}" fill="${['#ff9fb2', '#ffd27a', '#b48cff', '#fff'][i % 4]}" opacity="0.8"/>`; }
  // le grand arbre aux lanternes
  near += `<g><path d="M${tree - 30} ${GROUND_Y} Q${tree - 20} ${GROUND_Y - 160} ${tree - 60} ${GROUND_Y - 280} M${tree + 30} ${GROUND_Y} Q${tree + 20} ${GROUND_Y - 160} ${tree + 70} ${GROUND_Y - 270} M${tree} ${GROUND_Y} L${tree} ${GROUND_Y - 300}" stroke="#2a1630" stroke-width="34" stroke-linecap="round" fill="none"/>
  ${[...Array(18)].map((_, i) => { const a = (i / 18) * Math.PI, d = 140 + (i % 3) * 40; return `<circle cx="${(tree + Math.cos(a) * d * 1.3 - 0).toFixed(0)}" cy="${(GROUND_Y - 330 - Math.sin(a) * d * 0.7).toFixed(0)}" r="${80 + (i % 4) * 14}" fill="${['#7a3a8a', '#a2477a', '#5a2a7a'][i % 3]}" opacity="0.85"/>`; }).join('')}
  ${[...Array(24)].map((_, i) => { const x = tree - 220 + (i * 61) % 440, y = GROUND_Y - 420 + ((i * 37) % 220); return `<g><line x1="${x}" y1="${y - 26}" x2="${x}" y2="${y - 10}" stroke="#ffe6b0" stroke-width="1"/><circle cx="${x}" cy="${y}" r="16" fill="#ffd27a" opacity="0.25"/><rect x="${x - 6}" y="${y - 9}" width="12" height="18" rx="5" fill="#ffd27a"/></g>`; }).join('')}</g>`;
  let fg = `<defs>${blurDef('bl', 5)}</defs><g filter="url(#bl)">${bokeh(r, 40, 0, fgw, 400, 720, ['#ffd27a', '#ff9fb2'], 6, 20, 0.5)}</g>`;
  return { far: svg(fw, H, far), mid: svg(mw, H, mid), near: svg(W, H, near), fg: svg(fgw, H, fg) };
}

// ================================================================ Décors fixes (1280x720)
const W0 = VIEW.W;

function roomNight() {
  const r = rng(9);
  let s = `<defs>${lin('rw', [[0, '#2a1d3a'], [1, '#3e2a44']])}${lin('nv', [[0, '#0b1030'], [1, '#33285e']])}${rad('lamp', [[0, '#ffcf7a', 0.65], [1, '#ffcf7a', 0]])}</defs>
  <rect width="${W0}" height="${H}" fill="url(#rw)"/>
  <rect x="140" y="90" width="460" height="360" rx="8" fill="url(#nv)"/>`;
  for (let i = 0; i < 9; i++) { const bx = 150 + i * 50, bh = 80 + r() * 160; s += `<rect x="${bx}" y="${450 - bh}" width="46" height="${bh}" fill="#151638"/>` + windowsGrid(r, bx + 3, 458 - bh, 40, bh - 20, 3, Math.floor(bh / 20), '#ffcf7a', '#1b1d3d', 0.4); }
  s += `<circle cx="520" cy="160" r="26" fill="#fff4d6"/><path d="M140 90 h460 v360 h-460 Z M370 90 v360 M140 270 h460" fill="none" stroke="#1a1020" stroke-width="12"/>`;
  s += stringLights(120, 640, 70, 30, 40, '#ffd27a', '#2a1a22');
  s += `<rect x="0" y="520" width="${W0}" height="200" fill="#2a1a2a"/><rect x="0" y="510" width="${W0}" height="14" fill="#3a2436"/>`;
  s += `<circle cx="1000" cy="330" r="260" fill="url(#lamp)"/><rect x="900" y="430" width="300" height="20" rx="4" fill="#5a3a2a"/><rect x="915" y="450" width="14" height="70" fill="#5a3a2a"/><rect x="1170" y="450" width="14" height="70" fill="#5a3a2a"/>
  <path d="M1000 300 L1060 300 L1050 270 L1010 270 Z" fill="#ffcf7a"/><rect x="1027" y="300" width="6" height="130" fill="#222"/><rect x="930" y="410" width="80" height="20" rx="3" fill="#c8553d"/><rect x="1080" y="380" width="60" height="50" rx="4" fill="#f4e6d0"/>`;
  s += plant(760, 520, 1.3, '#2f6b4a', '#c8553d');
  s += `<rect x="0" y="560" width="520" height="160" rx="30" fill="#4a2a4a"/><rect x="20" y="540" width="200" height="60" rx="26" fill="#f4e6d0"/><rect x="0" y="600" width="540" height="120" rx="10" fill="#6a3a5a"/>`;
  return svg(W0, H, s);
}

function restaurantBg() {
  let s = `<defs>${lin('rr', [[0, '#3a1a12'], [1, '#6a2e1e']])}${rad('cnd', [[0, '#ffcf7a', 0.6], [1, '#ffcf7a', 0]])}</defs><rect width="${W0}" height="${H}" fill="url(#rr)"/>`;
  for (let x = 0; x < W0; x += 80) s += `<path d="M${x} 0 l40 40 l-40 40 l40 40 l-40 40 l40 40" fill="none" stroke="#e8b54a" stroke-width="2" opacity="0.18"/>`;
  s += `<rect x="0" y="0" width="${W0}" height="60" fill="#2a120c"/>`;
  for (let x = 160; x < W0; x += 320) s += `<g><line x1="${x}" y1="60" x2="${x}" y2="150" stroke="#222" stroke-width="2"/><path d="M${x - 50} 190 Q${x} 120 ${x + 50} 190 Z" fill="#c8553d"/><circle cx="${x}" cy="200" r="120" fill="url(#cnd)"/></g>`;
  s += `<rect x="90" y="250" width="220" height="160" rx="6" fill="#e9d2a8"/><path d="M110 390 Q150 280 200 380 Q240 300 290 390" fill="#2f8f83" opacity="0.8"/><rect x="90" y="250" width="220" height="160" rx="6" fill="none" stroke="#2a120c" stroke-width="10"/>`;
  s += `<rect x="970" y="250" width="220" height="160" rx="6" fill="#e9d2a8"/><circle cx="1080" cy="330" r="56" fill="#d4643f" opacity="0.8"/><circle cx="1080" cy="330" r="30" fill="#f4c25a"/><rect x="970" y="250" width="220" height="160" rx="6" fill="none" stroke="#2a120c" stroke-width="10"/>`;
  s += plant(60, 600, 1.5, '#2f6b4a', '#7a3a2c') + plant(1230, 600, 1.5, '#2f6b4a', '#7a3a2c');
  s += `<rect x="0" y="600" width="${W0}" height="120" fill="#2a120c"/>`;
  return svg(W0, H, s);
}

function restaurantTable() {
  return svg(W0, H, `<defs>${lin('tb', [[0, '#f4ead8'], [1, '#d9c7a8']])}${rad('cnd2', [[0, '#ffcf7a', 0.7], [1, '#ffcf7a', 0]])}</defs>
  <ellipse cx="640" cy="560" rx="470" ry="70" fill="url(#tb)"/><path d="M170 560 Q640 700 1110 560 L1110 720 L170 720 Z" fill="#f4ead8"/><path d="M170 560 Q640 700 1110 560" fill="none" stroke="#c8553d" stroke-width="6"/>
  <circle cx="640" cy="480" r="120" fill="url(#cnd2)"/><rect x="630" y="470" width="20" height="60" rx="4" fill="#fff6e6"/><ellipse cx="640" cy="462" rx="6" ry="12" fill="#ffcf7a"/>
  <ellipse cx="420" cy="560" rx="90" ry="22" fill="#fff"/><ellipse cx="420" cy="556" rx="60" ry="13" fill="#e8b54a"/><circle cx="400" cy="552" r="10" fill="#7a3a1e"/><circle cx="436" cy="555" r="9" fill="#4f9a4a"/>
  <ellipse cx="860" cy="560" rx="90" ry="22" fill="#fff"/><ellipse cx="860" cy="556" rx="60" ry="13" fill="#d4643f"/><circle cx="846" cy="552" r="10" fill="#f4c25a"/>
  <rect x="520" y="500" width="14" height="60" rx="5" fill="#f2d8f0" opacity="0.6"/><rect x="740" y="500" width="14" height="60" rx="5" fill="#f2d8f0" opacity="0.6"/>`);
}

function ireland() {
  const r = rng(353);
  let s = `<defs>${lin('ie', [[0, '#8fa7bf'], [0.6, '#d9e1e8'], [1, '#f0e6d2']])}${lin('sea', [[0, '#3d6f8a'], [1, '#1f4258']])}</defs><rect width="${W0}" height="${H}" fill="url(#ie)"/>`;
  for (let i = 0; i < 8; i++) s += `<ellipse cx="${(r() * W0).toFixed(0)}" cy="${(60 + r() * 160).toFixed(0)}" rx="${(120 + r() * 160).toFixed(0)}" ry="${(26 + r() * 30).toFixed(0)}" fill="#fff" opacity="0.6"/>`;
  s += `<rect y="380" width="${W0}" height="340" fill="url(#sea)"/>`;
  for (let i = 0; i < 30; i++) s += `<path d="M${(r() * W0).toFixed(0)} ${(400 + r() * 300).toFixed(0)} q12 -6 24 0" stroke="#fff" stroke-width="2" fill="none" opacity="0.4"/>`;
  s += `<path d="M0 330 Q200 300 420 340 L560 420 L600 720 L0 720 Z" fill="#4f8a4a"/><path d="M420 340 L560 420 L600 720 L520 720 L470 430 Z" fill="#6a6058"/>`;
  s += `<path d="M760 720 L820 460 Q980 400 1280 430 L1280 720 Z" fill="#3f7a3c"/><path d="M820 460 L760 720 L800 720 L850 480 Z" fill="#6a6058"/>`;
  s += `<g><rect x="1060" y="360" width="120" height="70" fill="#f4efe6"/><path d="M1050 362 L1120 320 L1190 362 Z" fill="#5a4a44"/><rect x="1110" y="390" width="22" height="40" fill="#c8553d"/></g>`;
  return svg(W0, H, s);
}

function trainLayers() {
  const r = rng(5);
  const TW = 2560;
  const sky = svg(W0, H, `<defs>${lin('ts', [[0, '#3a2a6e'], [0.45, '#e0708a'], [0.75, '#ffb36b'], [1, '#ffd9a0']])}</defs><rect width="${W0}" height="${H}" fill="url(#ts)"/><circle cx="900" cy="420" r="70" fill="#fff1c9"/><circle cx="900" cy="420" r="150" fill="#fff1c9" opacity="0.15"/>`);
  let hills = `<path d="M0 470`;
  for (let x = 0; x <= TW; x += 160) hills += ` Q${x + 80} ${430 + r() * 50} ${x + 160} 470`;
  hills += ` L${TW} 720 L0 720 Z" fill="#8a4a6e" opacity="0.9"/>`;
  let trees = '';
  for (let x = 0; x < TW; x += 46) { const h = 50 + r() * 60; trees += `<ellipse cx="${x}" cy="${560 - h / 2}" rx="${22 + r() * 10}" ry="${h / 2}" fill="#4a2a4e"/>`; }
  trees += `<rect y="550" width="${TW}" height="170" fill="#3a2040"/>`;
  let poles = '';
  for (let x = 0; x < TW; x += 640) poles += `<rect x="${x}" y="200" width="10" height="520" fill="#1a1020"/><rect x="${x - 30}" y="220" width="70" height="6" fill="#1a1020"/>`;
  poles += `<path d="M0 230 Q320 260 640 230 T1280 230 T1920 230 T2560 230" fill="none" stroke="#1a1020" stroke-width="2"/>`;
  const interior = svg(W0, H, `<defs>${lin('ti', [[0, '#3a2e48'], [1, '#221a2c']])}</defs>
  <path fill-rule="evenodd" fill="url(#ti)" d="M0 0 H${W0} V${H} H0 Z M150 110 Q150 80 180 80 H600 Q630 80 630 110 V420 Q630 450 600 450 H180 Q150 450 150 420 Z M680 110 Q680 80 710 80 H1100 Q1130 80 1130 110 V420 Q1130 450 1100 450 H710 Q680 450 680 420 Z"/>
  <path d="M150 110 Q150 80 180 80 H600 Q630 80 630 110 V420 Q630 450 600 450 H180 Q150 450 150 420 Z M680 110 Q680 80 710 80 H1100 Q1130 80 1130 110 V420 Q1130 450 1100 450 H710 Q680 450 680 420 Z" fill="none" stroke="#8a7a9a" stroke-width="10"/>
  <rect x="0" y="0" width="${W0}" height="40" fill="#1a1422"/><rect x="0" y="34" width="${W0}" height="8" fill="#ffcf7a" opacity="0.5"/>
  <rect x="80" y="300" width="230" height="420" rx="40" fill="#2f4a8a"/><rect x="96" y="316" width="198" height="200" rx="30" fill="#3d5ca0"/>
  <rect x="970" y="300" width="230" height="420" rx="40" fill="#2f4a8a"/><rect x="986" y="316" width="198" height="200" rx="30" fill="#3d5ca0"/>`);
  const table = svg(W0, H, `<defs>${lin('tt', [[0, '#e8dccb'], [1, '#b9a68c']])}</defs><rect x="330" y="520" width="620" height="34" rx="10" fill="url(#tt)"/><rect x="330" y="552" width="620" height="10" rx="4" fill="#8a7a62"/><rect x="620" y="560" width="40" height="160" fill="#555"/>
  <rect x="440" y="500" width="70" height="26" rx="6" fill="#f4e6d0"/><rect x="770" y="494" width="34" height="30" rx="5" fill="#c8553d" opacity="0.85"/><rect x="0" y="600" width="${W0}" height="120" fill="#1a1422" opacity="0.6"/>`);
  return {
    train_sky: sky,
    train_hills: svg(TW, H, hills),
    train_trees: svg(TW, H, trees),
    train_poles: svg(TW, H, poles),
    train_interior: interior,
    train_table: table,
  };
}

function bedShowroom() {
  return svg(W0, H, `<defs>${lin('bs', [[0, '#efe6f7'], [1, '#d8c8ea']])}${rad('sp', [[0, '#fff', 0.8], [1, '#fff', 0]])}</defs>
  <rect width="${W0}" height="${H}" fill="url(#bs)"/><circle cx="640" cy="120" r="260" fill="url(#sp)"/>
  <rect x="0" y="560" width="${W0}" height="160" fill="#b2443a"/><rect y="556" width="${W0}" height="6" fill="#e8d3a2"/>
  <rect x="250" y="250" width="780" height="200" rx="24" fill="#5c4389"/><text x="640" y="320" font-family="Georgia, serif" font-size="40" font-weight="700" text-anchor="middle" fill="#f7f1ff">Literie &amp; Rêves</text>
  <rect x="230" y="440" width="820" height="110" rx="30" fill="#f7f1ff"/><rect x="230" y="500" width="820" height="70" rx="20" fill="#b9a7e0"/>
  <rect x="250" y="566" width="26" height="60" fill="#3d2c5c"/><rect x="1004" y="566" width="26" height="60" fill="#3d2c5c"/>
  <rect x="250" y="380" width="150" height="70" rx="30" fill="#ffffff" stroke="#d8c8ea" stroke-width="4"/><rect x="262" y="440" width="150" height="70" rx="30" fill="#ffffff" stroke="#d8c8ea" stroke-width="4"/>
  <path d="M420 470 Q700 430 1040 470 L1040 540 Q700 520 420 540 Z" fill="#c9b8ef" opacity="0.0"/>`);
}

export function staticScenes() {
  return {
    room_night: roomNight(),
    restaurant: restaurantBg(),
    restaurant_table: restaurantTable(),
    ireland: ireland(),
    bed_showroom: bedShowroom(),
    ...trainLayers(),
  };
}

export const worlds = { event, bowling, fair, studio, paris, malaysia, memories };
