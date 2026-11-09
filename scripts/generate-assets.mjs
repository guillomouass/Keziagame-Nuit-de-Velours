// Génère toutes les illustrations SVG du jeu dans public/assets/ et un manifest.json.
// Usage : npm run assets
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CHARS, NPCS, EXPRESSIONS, partSVG, portraitSVG, pearlOverlaySVG, fullBodySVG } from './art/characters.js';
import { worlds, staticScenes } from './art/backgrounds.js';
import { objects, cover, necklaceCinematic } from './art/objects.js';
import { headSVG, bodySVG, pearlSVG, moonSVG, lanternSVG } from './art/baiser.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'assets');
const manifest = { images: [], portraits: [] };
let count = 0;

function out(folder, name, content, { load = true, portrait = false } = {}) {
  const file = join(root, folder, `${name}.svg`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  const url = `assets/${folder}/${name}.svg`;
  if (load) manifest.images.push({ key: name, url });
  if (portrait) manifest.portraits.push({ key: name, url });
  count++;
}

const WORLD_HEADS = ['neutral', 'smile', 'laugh', 'surprised', 'blink', 'tease', 'shy'];
for (const id of Object.keys(CHARS)) {
  for (const e of WORLD_HEADS) out('characters', `${id}_head_${e}`, partSVG.head(id, e));
  out('characters', `${id}_torso`, partSVG.torso(id));
  out('characters', `${id}_arm`, partSVG.arm(id));
  out('characters', `${id}_leg`, partSVG.leg(id));
  for (const e of EXPRESSIONS.filter((x) => x !== 'blink')) out('characters/portraits', `${id}_${e}`, portraitSVG(id, e), { load: false, portrait: true });
  out('characters/full', `${id}_full`, fullBodySVG(id, { e: 'smile' }), { load: false });
}
out('characters', 'kezia_torso_pearl', partSVG.torso('kezia', { pearl: true }));
out('characters/portraits', 'kezia_pearl_overlay', pearlOverlaySVG(), { load: false, portrait: true });

for (const id of Object.keys(NPCS)) {
  for (const e of ['neutral', 'smile', 'blink', 'laugh', 'surprised']) out('characters', `${id}_head_${e}`, partSVG.head(id, e));
  out('characters', `${id}_torso`, partSVG.torso(id));
  out('characters', `${id}_arm`, partSVG.arm(id));
  out('characters', `${id}_leg`, partSVG.leg(id));
  for (const e of ['neutral', 'smile', 'laugh', 'surprised']) out('characters/portraits', `${id}_${e}`, portraitSVG(id, e), { load: false, portrait: true });
}

for (const [name, fn] of Object.entries(worlds)) {
  const layers = fn();
  for (const [layer, content] of Object.entries(layers)) out('backgrounds', `bg_${name}_${layer}`, content);
}
for (const [name, content] of Object.entries(staticScenes())) out('backgrounds', name, content);

for (const [name, content] of Object.entries(objects)) out('objects', name, content);
out('cinematics', 'cover', cover());
out('cinematics', 'cine_necklace', necklaceCinematic());

// cinématique finale : le baiser (bustes + têtes de profil, lune, lanternes)
for (const id of ['guillo', 'kezia']) {
  out('cinematics', `cine_baiser_${id}_body`, bodySVG(id));
  for (const st of ['look', 'closed', 'happy']) out('cinematics', `cine_baiser_${id}_head_${st}`, headSVG(id, st));
}
out('cinematics', 'cine_baiser_kezia_pearl', pearlSVG());
out('cinematics', 'cine_moon', moonSVG());
out('cinematics', 'cine_lantern', lanternSVG());

// conserve la liste des sons déjà générés (scripts/generate-audio.mjs)
try { manifest.audio = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8')).audio || []; } catch { manifest.audio = []; }
writeFileSync(join(root, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`✔ ${count} illustrations générées dans public/assets/`);
