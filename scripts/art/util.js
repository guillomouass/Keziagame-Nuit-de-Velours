// Petits outils partagés par les générateurs d'illustrations.

export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const svg = (w, h, inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg>`;

export const lin = (id, stops, x2 = 0, y2 = 1) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops
    .map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`)
    .join('')}</linearGradient>`;

export const rad = (id, stops, cx = 0.5, cy = 0.5, r = 0.5) =>
  `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops
    .map(([o, c, op = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${op}"/>`)
    .join('')}</radialGradient>`;

// Halo lumineux (bokeh / lampes)
export function glow(x, y, r, color, op = 0.5, id = 'glw') {
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${id})" opacity="${op}" style="color:${color}"/>`;
}

export function bokeh(rand, n, x0, x1, y0, y1, colors, rMin = 6, rMax = 26, opMax = 0.5) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = x0 + rand() * (x1 - x0), y = y0 + rand() * (y1 - y0);
    const r = rMin + rand() * (rMax - rMin);
    const c = colors[Math.floor(rand() * colors.length)];
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(0.12 + rand() * opMax).toFixed(2)}"/>`;
  }
  return s;
}

// Guirlande lumineuse en chaînette
export function stringLights(x0, x1, y, sag, step, bulb = '#ffd27a', wire = '#3a2a22') {
  let s = '';
  const span = x1 - x0;
  const pts = [];
  for (let x = x0; x <= x1; x += step) {
    const t = (x - x0) / span;
    pts.push([x, y + Math.sin(Math.PI * t) * sag]);
  }
  s += `<path d="M${pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L')}" fill="none" stroke="${wire}" stroke-width="2" opacity="0.8"/>`;
  for (const [x, yy] of pts) {
    s += `<circle cx="${x.toFixed(1)}" cy="${(yy + 8).toFixed(1)}" r="18" fill="${bulb}" opacity="0.16"/>`;
    s += `<circle cx="${x.toFixed(1)}" cy="${(yy + 8).toFixed(1)}" r="5" fill="${bulb}"/>`;
    s += `<circle cx="${(x - 1.5).toFixed(1)}" cy="${(yy + 6.5).toFixed(1)}" r="1.8" fill="#fff" opacity="0.8"/>`;
  }
  return s;
}

export function windowsGrid(rand, x, y, w, h, cols, rows, lit = '#ffcf7a', dark = '#1d1830', pLit = 0.55) {
  let s = '';
  const cw = w / cols, ch = h / rows;
  for (let i = 0; i < cols; i++)
    for (let j = 0; j < rows; j++) {
      const on = rand() < pLit;
      s += `<rect x="${(x + i * cw + cw * 0.2).toFixed(1)}" y="${(y + j * ch + ch * 0.2).toFixed(1)}" width="${(cw * 0.6).toFixed(1)}" height="${(ch * 0.6).toFixed(1)}" rx="1.5" fill="${on ? lit : dark}" opacity="${on ? (0.6 + rand() * 0.4).toFixed(2) : 0.9}"/>`;
    }
  return s;
}

export const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
