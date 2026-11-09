import { describe, it, expect } from 'vitest';
import { guilloStatus, keziaStatus, parisFromKL, OFFSET } from '../src/game/mechanics/minigames.js';

describe('Mini-jeu « Le bon créneau »', () => {
  it('7 heures d’écart entre Kuala Lumpur et Paris', () => {
    expect(OFFSET).toBe(7);
    expect(parisFromKL(1)).toBe(18);
    expect(parisFromKL(20)).toBe(13);
    expect(parisFromKL(3)).toBe(20);
  });

  it('il existe au moins un créneau gagnant, et pas trop', () => {
    const ok = [...Array(24).keys()].filter((h) => guilloStatus(h).ok && keziaStatus(parisFromKL(h)).ok);
    expect(ok.length).toBeGreaterThan(0);
    expect(ok.length).toBeLessThan(5);
    expect(ok).toContain(1);
  });

  it('pendant les cours de Guillo ou le travail de Kezia, impossible d’appeler', () => {
    expect(guilloStatus(10).ok).toBe(false);
    expect(keziaStatus(14).ok).toBe(false);
  });
});
