// Synthétiseur maison : compose les musiques (boucles) et bruitages du jeu en fichiers WAV.
// Aucune ressource externe : tout est calculé ici. Usage : npm run assets
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SR = 22050;
const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
const NOTE = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
const n = (s) => { const m = s.match(/^([A-G][#b]?)(-?\d)$/); return 12 * (+m[2] + 1) + NOTE[m[1]]; };

function rand(seed) { let a = seed; return () => { a = (a * 1664525 + 1013904223) >>> 0; return a / 4294967296; }; }
const noiseR = rand(7);

// ---------------------------------------------------------- instruments
function epiano(buf, t0, midi, dur, vel = 0.25) {
  const f = mtof(midi), i0 = Math.floor(t0 * SR), len = Math.floor((dur + 1.2) * SR);
  for (let i = 0; i < len && i0 + i < buf.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.006) * Math.exp(-t * 2.2) * (t > dur ? Math.exp(-(t - dur) * 6) : 1);
    const trem = 1 + 0.06 * Math.sin(2 * Math.PI * 4.5 * t);
    buf[i0 + i] += vel * env * trem * (Math.sin(2 * Math.PI * f * t) + 0.28 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t * 6) + 0.08 * Math.sin(6 * Math.PI * f * t) * Math.exp(-t * 9));
  }
}
function pad(buf, t0, midi, dur, vel = 0.08) {
  const f = mtof(midi), i0 = Math.floor(t0 * SR), len = Math.floor((dur + 0.8) * SR);
  for (let i = 0; i < len && i0 + i < buf.length; i++) {
    const t = i / SR;
    const env = Math.min(1, t / 0.5) * (t > dur ? Math.max(0, 1 - (t - dur) / 0.8) : 1);
    let s = 0;
    for (const d of [-0.004, 0, 0.005]) s += Math.sin(2 * Math.PI * f * (1 + d) * t) + 0.2 * Math.sin(4 * Math.PI * f * (1 + d) * t);
    buf[i0 + i] += vel * env * s / 3;
  }
}
function pluck(buf, t0, midi, vel = 0.22, decay = 0.996) {
  const f = mtof(midi), N = Math.max(2, Math.round(SR / f)), i0 = Math.floor(t0 * SR);
  const ring = new Float32Array(N); for (let i = 0; i < N; i++) ring[i] = noiseR() * 2 - 1;
  const len = Math.floor(1.6 * SR); let p = 0, prev = 0;
  for (let i = 0; i < len && i0 + i < buf.length; i++) {
    const cur = ring[p]; const nx = decay * 0.5 * (cur + ring[(p + 1) % N]);
    ring[p] = nx; p = (p + 1) % N;
    const s = 0.6 * cur + 0.4 * prev; prev = cur;
    buf[i0 + i] += vel * s * Math.min(1, i / 40);
  }
}
function bass(buf, t0, midi, dur, vel = 0.3) {
  const f = mtof(midi), i0 = Math.floor(t0 * SR), len = Math.floor((dur + 0.15) * SR);
  for (let i = 0; i < len && i0 + i < buf.length; i++) {
    const t = i / SR, env = Math.min(1, t / 0.01) * Math.exp(-t * 1.4) * (t > dur ? Math.exp(-(t - dur) * 30) : 1);
    buf[i0 + i] += vel * env * (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(4 * Math.PI * f * t));
  }
}
function kick(buf, t0, vel = 0.5) {
  const i0 = Math.floor(t0 * SR); let ph = 0;
  for (let i = 0; i < 0.35 * SR && i0 + i < buf.length; i++) {
    const t = i / SR, f = 45 + 90 * Math.exp(-t * 30); ph += (2 * Math.PI * f) / SR;
    buf[i0 + i] += vel * Math.sin(ph) * Math.exp(-t * 9);
  }
}
function hat(buf, t0, vel = 0.06, len = 0.05) {
  const i0 = Math.floor(t0 * SR); let prev = 0;
  for (let i = 0; i < len * SR && i0 + i < buf.length; i++) {
    const w = noiseR() * 2 - 1, hp = w - prev; prev = w;
    buf[i0 + i] += vel * hp * Math.exp(-(i / SR) * 60);
  }
}
function clap(buf, t0, vel = 0.12) { for (const d of [0, 0.012, 0.024]) hat(buf, t0 + d, vel, 0.12); }
function tone(buf, t0, freq, dur, vel = 0.3, type = 'sine', decay = 8) {
  const i0 = Math.floor(t0 * SR); let ph = 0;
  for (let i = 0; i < dur * SR && i0 + i < buf.length; i++) {
    const t = i / SR, f = typeof freq === 'function' ? freq(t) : freq;
    ph += (2 * Math.PI * f) / SR;
    let s = Math.sin(ph);
    if (type === 'tri') s = (2 / Math.PI) * Math.asin(Math.sin(ph));
    if (type === 'bell') s = Math.sin(ph) + 0.4 * Math.sin(ph * 2.76) * Math.exp(-t * 6);
    buf[i0 + i] += vel * s * Math.min(1, t / 0.004) * Math.exp(-t * decay);
  }
}
function noise(buf, t0, dur, vel, lp = 0.2, sweep) {
  const i0 = Math.floor(t0 * SR); let y = 0;
  for (let i = 0; i < dur * SR && i0 + i < buf.length; i++) {
    const t = i / SR, a = sweep ? sweep(t / dur) : lp;
    y += a * ((noiseR() * 2 - 1) - y);
    const env = Math.sin(Math.PI * Math.min(1, t / dur));
    buf[i0 + i] += vel * y * env;
  }
}

// ---------------------------------------------------------- effets
function reverb(buf, mix = 0.22) {
  const out = Float32Array.from(buf);
  const combs = [1116, 1188, 1277, 1356].map((d) => Math.floor((d * SR) / 44100));
  for (const d of combs) {
    const line = new Float32Array(d); let p = 0, f = 0;
    for (let i = 0; i < buf.length; i++) {
      const y = line[p]; f = y * 0.7 + f * 0.3; line[p] = buf[i] + f * 0.78; p = (p + 1) % d;
      out[i] += (mix / combs.length) * y;
    }
  }
  return out;
}

function toWav(buf, gain = 1) {
  let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v));
  const g = peak > 0 ? Math.min(gain, 0.89 / peak) : 1;
  const data = Buffer.alloc(44 + buf.length * 2);
  data.write('RIFF', 0); data.writeUInt32LE(36 + buf.length * 2, 4); data.write('WAVE', 8); data.write('fmt ', 12);
  data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(1, 22); data.writeUInt32LE(SR, 24);
  data.writeUInt32LE(SR * 2, 28); data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34); data.write('data', 36); data.writeUInt32LE(buf.length * 2, 40);
  for (let i = 0; i < buf.length; i++) data.writeInt16LE(Math.round(Math.max(-1, Math.min(1, buf[i] * g)) * 32767), 44 + i * 2);
  return data;
}

// ---------------------------------------------------------- musiques en boucle
const CH = {
  Fmaj7: ['F3', 'A3', 'C4', 'E4'], Em7: ['E3', 'G3', 'B3', 'D4'], Dm7: ['D3', 'F3', 'A3', 'C4'], Cmaj7: ['C3', 'E3', 'G3', 'B3'],
  C: ['C3', 'E3', 'G3', 'C4'], Am: ['A2', 'E3', 'A3', 'C4'], F: ['F2', 'C3', 'F3', 'A3'], G: ['G2', 'D3', 'G3', 'B3'],
  Bb: ['Bb2', 'F3', 'Bb3', 'D4'], Dm: ['D3', 'F3', 'A3', 'D4'], Dm9: ['D3', 'F3', 'C4', 'E4'], G13: ['G2', 'F3', 'B3', 'E4'],
  Cmaj9: ['C3', 'E3', 'B3', 'D4'], A7: ['A2', 'G3', 'C#4', 'E4'], Gb: ['G2', 'B2', 'D3', 'G3'], Em: ['E3', 'G3', 'B3', 'E4'],
  Abmaj7: ['Ab2', 'C3', 'Eb3', 'G3'], Bbadd9: ['Bb2', 'D3', 'F3', 'C4'],
};

function song({ bpm, chords, style, seed = 1 }) {
  const beat = 60 / bpm, bar = beat * 4, L = Math.round(chords.length * bar * SR);
  const buf = new Float32Array(L + 3 * SR);
  const r = rand(seed);
  chords.forEach((name, b) => {
    const t = b * bar, notes = CH[name].map(n);
    const root = notes[0] - 12;
    if (style.pad) notes.forEach((m) => pad(buf, t, m + 12, bar, style.pad));
    if (style.keys) {
      const hits = style.keysRhythm || [0, 1.5, 2.5];
      for (const h of hits) notes.slice(1).forEach((m) => epiano(buf, t + h * beat, m + 12, beat * 0.9, style.keys));
    }
    if (style.bass) { bass(buf, t, root, beat * 1.8, style.bass); bass(buf, t + 2.5 * beat, root + (r() < 0.5 ? 7 : 12), beat * 1.2, style.bass * 0.8); }
    if (style.arp) {
      const pat = style.arpPattern || [0, 1, 2, 3, 2, 1, 2, 3];
      const step = bar / pat.length;
      pat.forEach((k, i) => pluck(buf, t + i * step, notes[k % notes.length] + 24 + (k > 3 ? 12 : 0), style.arp));
    }
    if (style.melody) {
      const scale = notes.map((m) => m + 24);
      const steps = style.melodyDensity || 4;
      for (let i = 0; i < steps; i++) if (r() < 0.75) epiano(buf, t + (i * bar) / steps, scale[Math.floor(r() * scale.length)] + (r() < 0.3 ? 12 : 0), bar / steps, style.melody);
    }
    if (style.drums) for (let i = 0; i < 4; i++) {
      if (i % 2 === 0) kick(buf, t + i * beat, style.drums);
      if (i % 2 === 1 && style.clap) clap(buf, t + i * beat, style.clap);
      hat(buf, t + i * beat + beat / 2, 0.05); if (style.hat16) hat(buf, t + i * beat + beat / 4, 0.025);
    }
  });
  let out = reverb(buf, style.verb ?? 0.25);
  for (let i = L; i < out.length; i++) out[i - L] += out[i]; // boucle sans couture
  return out.subarray(0, L);
}

const MUSIC = {
  menu: song({ bpm: 76, chords: ['Fmaj7', 'Em7', 'Dm7', 'Cmaj7', 'Fmaj7', 'Em7', 'Dm7', 'Cmaj7'], seed: 3, style: { pad: 0.05, keys: 0.09, keysRhythm: [0, 2.5], bass: 0.22, arp: 0.12, arpPattern: [0, 2, 1, 3, 2, 4, 3, 2], verb: 0.35 } }),
  explore: song({ bpm: 96, chords: ['C', 'Am', 'F', 'G', 'C', 'Am', 'F', 'G'], seed: 5, style: { pad: 0.035, keys: 0.07, keysRhythm: [0, 1.5, 2.5, 3.5], bass: 0.25, arp: 0.1, drums: 0.35, clap: 0.07, verb: 0.2 } }),
  fair: song({ bpm: 112, chords: ['F', 'Dm', 'Bb', 'C', 'F', 'Dm', 'Bb', 'C'], seed: 8, style: { keys: 0.08, keysRhythm: [0.5, 1.5, 2.5, 3.5], bass: 0.28, arp: 0.12, arpPattern: [0, 1, 2, 3, 4, 3, 2, 1], drums: 0.38, clap: 0.1, hat16: true, melody: 0.05, verb: 0.18 } }),
  tender: song({ bpm: 64, chords: ['Am', 'F', 'C', 'G', 'Am', 'F', 'C', 'Em'], seed: 11, style: { pad: 0.07, keys: 0.08, keysRhythm: [0, 2], bass: 0.18, melody: 0.06, melodyDensity: 2, verb: 0.4 } }),
  night: song({ bpm: 86, chords: ['Dm9', 'G13', 'Cmaj9', 'A7', 'Dm9', 'G13', 'Cmaj9', 'Cmaj9'], seed: 13, style: { pad: 0.04, keys: 0.09, keysRhythm: [0, 1.5, 3], bass: 0.26, drums: 0.25, hat16: false, melody: 0.045, verb: 0.3 } }),
  final: song({ bpm: 70, chords: ['C', 'Gb', 'Am', 'F', 'Abmaj7', 'Bbadd9', 'C', 'C'], seed: 21, style: { pad: 0.07, keys: 0.09, keysRhythm: [0, 1, 2, 3], bass: 0.22, arp: 0.08, melody: 0.06, melodyDensity: 2, verb: 0.45 } }),
};

// ---------------------------------------------------------- bruitages
function sfx(dur, fn) { const b = new Float32Array(Math.floor(dur * SR)); fn(b); return reverb(b, 0.12); }
const SFX = {
  blip: sfx(0.06, (b) => tone(b, 0, 760, 0.05, 0.25, 'tri', 50)),
  select: sfx(0.25, (b) => { tone(b, 0, 660, 0.12, 0.3, 'tri', 20); tone(b, 0.06, 990, 0.15, 0.3, 'tri', 18); }),
  confirm: sfx(0.5, (b) => [523, 659, 784].forEach((f, i) => tone(b, i * 0.07, f, 0.3, 0.3, 'bell', 10))),
  collect: sfx(0.9, (b) => [1047, 1319, 1568, 2093].forEach((f, i) => tone(b, i * 0.06, f, 0.5, 0.25, 'bell', 7))),
  heart: sfx(1.2, (b) => { [784, 988, 1175, 1568].forEach((f, i) => tone(b, i * 0.09, f, 0.8, 0.22, 'bell', 4)); }),
  notif: sfx(0.6, (b) => { tone(b, 0, 1318, 0.25, 0.3, 'bell', 12); tone(b, 0.13, 1760, 0.35, 0.3, 'bell', 10); }),
  ring: sfx(1.6, (b) => { for (let k = 0; k < 2; k++) for (let i = 0; i < 6; i++) tone(b, k * 0.8 + i * 0.06, i % 2 ? 1320 : 1100, 0.06, 0.2, 'sine', 20); }),
  jump: sfx(0.2, (b) => tone(b, 0, (t) => 320 + t * 2400, 0.18, 0.22, 'tri', 12)),
  roll: sfx(1.3, (b) => noise(b, 0, 1.25, 0.6, 0.04)),
  strike: sfx(1.0, (b) => { noise(b, 0, 0.5, 0.9, 0.5); for (let i = 0; i < 8; i++) tone(b, 0.02 + i * 0.04, 500 + i * 140, 0.15, 0.12, 'tri', 25); }),
  shell: sfx(1.2, (b) => { noise(b, 0, 0.3, 0.3, 0.08, (x) => 0.02 + x * 0.2); [1568, 2093, 2637, 3136].forEach((f, i) => tone(b, 0.3 + i * 0.08, f, 0.6, 0.18, 'bell', 6)); }),
  whoosh: sfx(0.7, (b) => noise(b, 0, 0.65, 0.5, 0.1, (x) => 0.02 + Math.sin(Math.PI * x) * 0.4)),
  success: sfx(1.6, (b) => { [523, 659, 784, 1047].forEach((f) => epiano(b, 0, Math.round(69 + 12 * Math.log2(f / 440)), 1.0, 0.18)); [784, 1047, 1319].forEach((f, i) => tone(b, 0.2 + i * 0.1, f, 0.8, 0.15, 'bell', 5)); }),
  laugh: sfx(0.6, (b) => { for (let i = 0; i < 4; i++) tone(b, i * 0.11, 520 - i * 30, 0.09, 0.2, 'tri', 25); }),
  page: sfx(0.25, (b) => noise(b, 0, 0.2, 0.35, 0.3, (x) => 0.6 - x * 0.5)),
  miss: sfx(0.5, (b) => tone(b, 0, (t) => 400 - t * 400, 0.45, 0.25, 'tri', 5)),
  beat: sfx(0.2, (b) => { kick(b, 0, 0.6); tone(b, 0, 1200, 0.08, 0.1, 'bell', 30); }),
};
// ambiance du train : roulement + « tac-tac » réguliers
SFX.train = (() => {
  const L = 4 * SR, b = new Float32Array(L + SR);
  noise(b, 0, 4.4, 0.18, 0.015);
  for (const t of [0, 0.18, 2, 2.18]) { kick(b, t, 0.18); hat(b, t, 0.05, 0.08); }
  for (let i = L; i < b.length; i++) b[i - L] += b[i];
  return b.subarray(0, L);
})();

// ---------------------------------------------------------- écriture
const manifestPath = join(root, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : { images: [] };
manifest.audio = [];
mkdirSync(join(root, 'music'), { recursive: true });
mkdirSync(join(root, 'sounds'), { recursive: true });
for (const [k, buf] of Object.entries(MUSIC)) { writeFileSync(join(root, 'music', `${k}.wav`), toWav(buf, 1)); manifest.audio.push({ key: `music_${k}`, url: `assets/music/${k}.wav` }); }
for (const [k, buf] of Object.entries(SFX)) { writeFileSync(join(root, 'sounds', `${k}.wav`), toWav(buf, 1)); manifest.audio.push({ key: `sfx_${k}`, url: `assets/sounds/${k}.wav` }); }
writeFileSync(manifestPath, JSON.stringify(manifest, null, 1));
console.log(`✔ ${Object.keys(MUSIC).length} musiques et ${Object.keys(SFX).length} bruitages générés`);
