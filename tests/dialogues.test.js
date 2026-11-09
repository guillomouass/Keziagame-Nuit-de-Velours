import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { TRAIN_DIALOGUE } from '../src/game/dialogues/ch5.js';
import * as ch4 from '../src/game/dialogues/ch4.js';
import { SPEAKERS, MAIN_EXPR } from '../src/data/speakers.js';
import { MEMORIES } from '../src/data/memories.js';
import { CHAPTERS } from '../src/game/chapters/index.js';

const root = join(import.meta.dirname, '..');

// Le dialogue réel du train, tel que validé : il doit rester identique mot pour mot.
const VALIDATED_TRAIN = [
  ['kezia', 'Tu sais, en ce moment, je préfère vraiment me concentrer sur moi-même et sur mes projets.'],
  ['guillo', 'Ah oui, je comprends.'],
  ['kezia', "J'aime bien passer du temps avec toi, mais je ne me vois pas forcément me remettre en couple maintenant. Je sors d'une relation qui a duré un certain temps et j'ai besoin de penser à moi."],
  ['guillo', "Je comprends totalement. Je ne vais pas te mettre la pression. De mon côté, je ne suis pas encore dans une situation totalement stable non plus. Mais je veux que tu saches une chose : tu m'intéresses vraiment. Je ne suis pas pressé, je ne veux pas te mettre la pression. Ça prendra le temps que ça prendra."],
];

function collectNodes(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => collectNodes(v, out));
  else if (value && typeof value === 'object') {
    if (typeof value.s === 'string' && typeof value.t === 'string') out.push(value);
    if (value.choice) value.choice.forEach((c) => { out.push({ choiceText: c.t }); collectNodes(c.then || [], out); });
  }
  return out;
}

function allDialogueNodes() {
  const dir = join(root, 'src/game/dialogues');
  return readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => f);
}

describe('Dialogues validés', () => {
  it('le dialogue du train est conservé exactement', () => {
    expect(TRAIN_DIALOGUE.map((n) => [n.s, n.t])).toEqual(VALIDATED_TRAIN);
    expect(TRAIN_DIALOGUE.every((n) => n.real === true)).toBe(true);
  });

  it('la phrase de Kezia à la vendeuse est exacte et marquée authentique', () => {
    const line = ch4.bed.find((n) => n.real);
    expect(line.s).toBe('kezia');
    expect(line.t).toBe("Ce garçon dit qu'il veut me marier alors qu'il n'a même pas de bague !");
  });

  it('seules les répliques réellement prononcées sont marquées « authentiques »', async () => {
    const files = allDialogueNodes();
    let realCount = 0;
    for (const f of files) {
      const mod = await import(join(root, 'src/game/dialogues', f));
      realCount += collectNodes(Object.values(mod)).filter((n) => n.real).length;
    }
    expect(realCount).toBe(5); // 4 répliques du train + la phrase de la Foire
  });
});

describe('Cohérence des dialogues', () => {
  it('chaque réplique a un locuteur connu, une expression valide et un texte non vide', async () => {
    for (const f of allDialogueNodes()) {
      const mod = await import(join(root, 'src/game/dialogues', f));
      for (const n of collectNodes(Object.values(mod))) {
        if (n.choiceText !== undefined) { expect(n.choiceText.length).toBeGreaterThan(0); continue; }
        expect(SPEAKERS[n.s], `locuteur inconnu « ${n.s} » dans ${f}`).toBeDefined();
        if (n.e) expect(MAIN_EXPR, `expression « ${n.e} » dans ${f}`).toContain(n.e);
        expect(n.t.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it('les dialogues sont en français, sans nouchi courant', () => {
    const src = readdirSync(join(root, 'src/game/dialogues')).map((f) => readFileSync(join(root, 'src/game/dialogues', f), 'utf8')).join('\n');
    for (const w of ['gbê', 'môgô', 'dja ', 'dêh', 'gnan', 'yako', 'enjaillement']) expect(src.toLowerCase()).not.toContain(w);
  });

  it('le restaurant africain n’est pas nommé', () => {
    const src = readFileSync(join(root, 'src/game/dialogues/ch7.js'), 'utf8');
    expect(src).toMatch(/restaurant africain/);
    expect(src).not.toMatch(/restaurant africain\s+[«"“][^»"”]+/);
  });
});

describe('Chapitres, souvenirs et ressources', () => {
  it('9 chapitres, chacun avec au moins une étape', () => {
    expect(CHAPTERS).toHaveLength(9);
    for (const c of CHAPTERS) {
      expect(c.title).toBeTruthy();
      expect(c.steps.length).toBeGreaterThan(0);
    }
  });

  it('tous les souvenirs référencés dans les chapitres existent, et chaque souvenir est atteignable', () => {
    const ids = new Set(MEMORIES.map((m) => m.id));
    const srcs = readdirSync(join(root, 'src/game/chapters')).map((f) => readFileSync(join(root, 'src/game/chapters', f), 'utf8')).join('\n');
    const used = new Set([...srcs.matchAll(/memory\(\s*'([a-z_]+)'\s*\)|memory:\s*'([a-z_]+)'/g)].map((m) => m[1] || m[2]));
    for (const u of used) expect(ids.has(u), `souvenir inconnu : ${u}`).toBe(true);
    for (const id of ids) expect(used.has(id), `souvenir jamais débloqué : ${id}`).toBe(true);
    expect(MEMORIES.filter((m) => m.unique).map((m) => m.id)).toEqual(['collier']);
  });

  it('toutes les images utilisées par les chapitres existent dans le manifest', () => {
    const manifest = JSON.parse(readFileSync(join(root, 'public/assets/manifest.json'), 'utf8'));
    const keys = new Set(manifest.images.map((i) => i.key));
    const srcs = ['src/game/chapters', 'src/game/dialogues'].flatMap((d) => readdirSync(join(root, d)).map((f) => readFileSync(join(root, d, f), 'utf8'))).join('\n');
    for (const [, k] of srcs.matchAll(/tex:\s*'([a-z_]+)'/g)) expect(keys.has(k), `texture manquante : ${k}`).toBe(true);
    for (const [, k] of srcs.matchAll(/bg:\s*'([a-z_]+)'/g)) expect(keys.has(k) || keys.has(`bg_${k}_near`), `décor manquant : ${k}`).toBe(true);
    for (const m of MEMORIES) expect(existsSync(join(root, 'public/assets/objects', `${m.icon}.svg`))).toBe(true);
    for (const a of manifest.audio) expect(existsSync(join(root, 'public', a.url)), a.url).toBe(true);
  });
});

describe('Cinématique finale (le baiser)', () => {
  it('est jouée à la fin du chapitre final, avant l’écran « À suivre… »', () => {
    const src = readFileSync(join(root, 'src/game/chapters/final.js'), 'utf8');
    const kiss = src.indexOf('G.kiss()');
    expect(kiss).toBeGreaterThan(src.indexOf('G.say(D.finalChoice)'));
    expect(kiss).toBeLessThan(src.indexOf("title: 'À suivre…'"));
  });

  it('toutes ses illustrations existent dans le manifest', () => {
    const manifest = JSON.parse(readFileSync(join(root, 'public/assets/manifest.json'), 'utf8'));
    const keys = new Set(manifest.images.map((i) => i.key));
    const src = readFileSync(join(root, 'src/game/scenes/KissScene.js'), 'utf8');
    const used = [...src.matchAll(/'((?:cine|bg)_[a-z_]+)'/g)].map((m) => m[1]);
    expect(used.length).toBeGreaterThan(2);
    for (const k of used) expect(keys.has(k), `illustration manquante : ${k}`).toBe(true);
    for (const id of ['guillo', 'kezia']) {
      expect(keys.has(`cine_baiser_${id}_body`)).toBe(true);
      for (const st of ['look', 'closed', 'happy']) expect(keys.has(`cine_baiser_${id}_head_${st}`)).toBe(true);
    }
    expect(keys.has('cine_baiser_kezia_pearl')).toBe(true);
  });
});

describe('Apparence de Guillo', () => {
  it('cheveux courts, sans waves, dans toutes ses illustrations', () => {
    const dir = join(root, 'public/assets/characters');
    const files = [...readdirSync(dir).filter((f) => f.startsWith('guillo_')).map((f) => join(dir, f)),
      ...readdirSync(join(dir, 'portraits')).filter((f) => f.startsWith('guillo_')).map((f) => join(dir, 'portraits', f))];
    expect(files.length).toBeGreaterThan(10);
    // l'ancien motif des waves était tracé par des courbes « Q » de couleur claire (#3b2c25) sur les cheveux
    for (const f of files) expect(readFileSync(f, 'utf8'), f).not.toContain('stroke="#3b2c25"');
  });
});
