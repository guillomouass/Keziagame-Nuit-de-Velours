// Cinématiques et interactions de fin : scène du collier, constellation des souvenirs, lettre, générique.
import { A, el } from '../../interface/UI.js';
import { MEMORIES } from '../../data/memories.js';
import { controls } from '../systems/Controls.js';

function waitContinue(G, node, label = 'Continuer') {
  return new Promise((resolve) => {
    const b = el('button', 'btn primary', label);
    b.style.marginTop = '22px';
    node.appendChild(b);
    b.focus({ preventScroll: true });
    const go = () => { off(); clearInterval(iv); G.sfx('select'); resolve(); };
    b.onclick = go;
    const off = G.ui.pushKeys((e) => { if (e.key === 'Enter' || e.key === ' ') { go(); return true; } });
    const iv = setInterval(() => { if (controls.consumeAction()) go(); }, 60);
  });
}

export async function necklaceCinematic(G, lines) {
  const c = G.ui.overlay('', `<div class="bg" style="background-image:url(${A('cinematics/cine_necklace.svg')})"></div><div class="lines"></div>`, 'cine');
  for (let i = 0; i < 26; i++) {
    const s = el('i', 'sparkle');
    s.style.left = `${10 + Math.random() * 80}%`;
    s.style.top = `${10 + Math.random() * 70}%`;
    s.style.animationDelay = `${Math.random() * 2.4}s`;
    c.appendChild(s);
  }
  G.sfx('shell');
  const box = c.querySelector('.lines');
  for (const [i, l] of lines.entries()) {
    const p = el('p', '', l);
    p.style.animationDelay = `${0.6 + i * 1.6}s`;
    box.appendChild(p);
  }
  await new Promise((r) => setTimeout(r, 900 + lines.length * 1600));
  G.sfx('heart');
  await waitContinue(G, box);
  c.style.transition = 'opacity .8s';
  c.style.opacity = 0;
  await new Promise((r) => setTimeout(r, 800));
  c.remove();
}

/** Maintenir le bouton pour rallumer tous les souvenirs, un par un. */
export function constellation(G, text) {
  return new Promise((resolve) => {
    const unlocked = MEMORIES.filter((m) => m.id !== 'dernier' && G.save.hasMemory(m.id));
    const shown = unlocked.length ? unlocked : MEMORIES.filter((m) => !m.secret && m.id !== 'dernier');
    const c = G.ui.overlay('', '', 'cine');
    c.style.background = 'radial-gradient(circle at 50% 40%, #3a1f5a, #0d0614 75%)';
    const pos = shown.map((_, i) => {
      const a = (i / shown.length) * Math.PI * 2 - Math.PI / 2;
      return [50 + Math.cos(a) * 42, 50 + Math.sin(a) * 40];
    });
    c.innerHTML = `<div style="text-align:center;width:100%"><p style="font-family:var(--serif);font-style:italic;font-size:clamp(17px,2.6vw,26px);margin:0 20px 10px">${text}</p>
      <div class="constel">${shown.map((m, i) => `<img src="${A(`objects/${m.icon}.svg`)}" style="left:calc(${pos[i][0]}% - 28px);top:calc(${pos[i][1]}% - 28px)" title="${m.title}" alt="">`).join('')}
      <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" viewBox="0 0 100 100" preserveAspectRatio="none">${pos.map((p, i) => { const q = pos[(i + 1) % pos.length]; return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" stroke="#ffd27a" stroke-width="0.25" opacity="0" class="ln"/>`; }).join('')}</svg>
      <div class="hold" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="47" fill="none" stroke="#ffffff22" stroke-width="4"/><circle id="ring" cx="50" cy="50" r="47" fill="none" stroke="#f4c25a" stroke-width="4" stroke-dasharray="295.3" stroke-dashoffset="295.3" stroke-linecap="round"/></svg><img src="${A('objects/perle.svg')}" alt=""></div></div>
      <p style="color:var(--muted);font-size:14px;margin-top:14px">Maintiens la perle appuyée (ou la touche Espace)</p></div>`;
    const hold = c.querySelector('.hold');
    const ring = c.querySelector('#ring');
    const imgs = [...c.querySelectorAll('.constel > img')];
    const lns = [...c.querySelectorAll('.ln')];
    let p = 0, down = false, last = performance.now(), raf, lit = 0;
    const set = (v) => { down = v; hold.classList.toggle('active', v); };
    hold.addEventListener('pointerdown', (e) => { e.preventDefault(); set(true); });
    window.addEventListener('pointerup', () => set(false));
    const offK = G.ui.pushKeys((e) => { if (e.key === ' ' || e.key === 'Enter') { set(true); return true; } });
    const up = (e) => { if (e.key === ' ' || e.key === 'Enter') set(false); };
    window.addEventListener('keyup', up);
    const loop = (t) => {
      const dt = (t - last) / 1000; last = t;
      const d = down || controls.action;
      p = Math.max(0, Math.min(1, p + (d ? dt / 4 : -dt / 6)));
      ring.setAttribute('stroke-dashoffset', String(295.3 * (1 - p)));
      const n = Math.floor(p * imgs.length + 0.001);
      while (lit < n) { imgs[lit].classList.add('lit'); if (lns[lit]) lns[lit].setAttribute('opacity', '0.8'); G.sfx('collect', { volume: 0.4, rate: 0.8 + lit * 0.04 }); lit++; }
      if (p >= 1) {
        offK(); window.removeEventListener('keyup', up);
        G.sfx('heart');
        hold.style.transition = 'transform 1s, opacity 1s';
        hold.style.transform = 'translate(-50%,-50%) scale(1.6)';
        hold.style.opacity = '0';
        setTimeout(() => { c.remove(); resolve(); }, 1300);
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  });
}

export async function letter(G, paragraphs, signature) {
  const c = G.ui.overlay('mg', `<div class="letter">${paragraphs.map((p) => `<p>${p}</p>`).join('')}<p class="sig">${signature}</p></div>`);
  G.sfx('page');
  await waitContinue(G, c.querySelector('.letter'), 'Refermer la lettre');
  c.remove();
}

export async function credits(G, lines) {
  const c = G.ui.overlay('', '', 'cine');
  c.style.background = 'radial-gradient(circle at 50% 40%, #3a1d4a, #0d0614 75%)';
  c.innerHTML = `<div class="credits">${lines.map(([role, name], i) => (role === 'title' ? `<h2 style="animation:fin 1.2s ${i * 0.6}s forwards;opacity:0">${name}</h2>` : `<div style="animation:fin 1.2s ${i * 0.6}s forwards;opacity:0"><div class="role">${role}</div><div>${name}</div></div>`)).join('')}</div>`;
  await new Promise((r) => setTimeout(r, 1500 + lines.length * 600));
  await waitContinue(G, c.querySelector('.credits'), 'Retour au menu');
  c.remove();
}
