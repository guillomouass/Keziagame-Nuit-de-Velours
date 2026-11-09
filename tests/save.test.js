import { describe, it, expect } from 'vitest';
import { createSave, SAVE_KEY } from '../src/game/systems/Save.js';

function memoryStorage() {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), _m: m };
}

describe('Sauvegarde automatique', () => {
  it('démarre sur un état neuf', () => {
    const s = createSave(memoryStorage());
    expect(s.state.chapter).toBe(0);
    expect(s.hasProgress()).toBe(false);
  });

  it('enregistre la progression et la relit', () => {
    const st = memoryStorage();
    const a = createSave(st);
    a.progress(3, 2);
    a.unlockMemory('collier');
    a.setFlag('pearl');
    const b = createSave(st);
    expect(b.state.chapter).toBe(3);
    expect(b.state.step).toBe(2);
    expect(b.hasMemory('collier')).toBe(true);
    expect(b.flag('pearl')).toBe(true);
    expect(b.hasProgress()).toBe(true);
    expect(JSON.parse(st.getItem(SAVE_KEY)).reached).toBe(3);
  });

  it('ne débloque un souvenir qu’une seule fois', () => {
    const s = createSave(memoryStorage());
    expect(s.unlockMemory('badge')).toBe(true);
    expect(s.unlockMemory('badge')).toBe(false);
  });

  it('plafonne la complicité à 99 % (le dernier pourcent se donne)', () => {
    const s = createSave(memoryStorage());
    s.addComplicity(250);
    expect(s.state.complicity).toBe(99);
    s.addComplicity(-500);
    expect(s.state.complicity).toBe(0);
  });

  it('recommencer l’histoire garde la galerie et les réglages', () => {
    const s = createSave(memoryStorage());
    s.progress(5, 1);
    s.unlockMemory('micro');
    s.setting('music', 0.2);
    s.addComplicity(40);
    s.resetStory();
    expect(s.state.chapter).toBe(0);
    expect(s.state.complicity).toBe(0);
    expect(s.hasMemory('micro')).toBe(true);
    expect(s.state.settings.music).toBe(0.2);
  });

  it('fin du jeu : plus de « Continuer », mais la fin est mémorisée', () => {
    const s = createSave(memoryStorage());
    s.progress(8, 2);
    s.finish();
    expect(s.state.finished).toBe(true);
    expect(s.hasProgress()).toBe(false);
  });

  it('survit à un stockage cassé ou bloqué', () => {
    const broken = { getItem: () => { throw new Error('bloqué'); }, setItem: () => { throw new Error('bloqué'); } };
    const s = createSave(broken);
    expect(s.progress(1, 0)).toBe(false);
    expect(s.state.chapter).toBe(1);
    const corrupt = memoryStorage();
    corrupt.setItem(SAVE_KEY, '{pas du json');
    expect(createSave(corrupt).state.chapter).toBe(0);
  });
});
