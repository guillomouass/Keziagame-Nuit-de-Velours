// Le téléphone : conversations de groupe/privées (avec réponses à choisir) et appels.
import { el, sleep, portraitUrl } from '../../interface/UI.js';
import { SPEAKERS } from '../../data/speakers.js';
import { controls } from '../systems/Controls.js';

const COLORS = { kezia: '#c2416b', staecy: '#6a4c93', guillo: '#d4643f' };

/**
 * cfg = { title, members: ['kezia','staecy'], status, script: [...] }
 * script : { from, t } | { me } | { sys } | { choice: [{ t, c, then, set }] } | { wait } | { fn }
 */
export async function chat(G, cfg) {
  const { ui } = G;
  const wrap = ui.overlay('', '', 'phone');
  const avatars = cfg.members.map((m) => `<img src="${portraitUrl(m, 'smile')}" alt="">`).join('');
  wrap.innerHTML = `<div class="device"><div class="screen"><div class="notch"></div>
    <div class="chat-head"><div class="av">${avatars}</div><div><b>${cfg.title}</b><small>${cfg.status || cfg.members.map((m) => SPEAKERS[m].name).join(', ') + ', toi'}</small></div></div>
    <div class="msgs"></div><div class="reimag">Conversation réimaginée pour le jeu</div><div class="replies"><div class="ph">…</div></div></div></div>`;
  const msgs = wrap.querySelector('.msgs');
  const replies = wrap.querySelector('.replies');
  const scroll = () => { msgs.scrollTop = msgs.scrollHeight; };
  ui.audio.duck(true);

  const add = (cls, html) => { const m = el('div', `msg ${cls}`, html); msgs.appendChild(m); scroll(); return m; };
  const typing = async (who, len) => {
    const t = el('div', 'typing', '<i></i><i></i><i></i>');
    msgs.appendChild(t); scroll();
    await G.wait(Math.min(1700, 450 + len * 22));
    t.remove();
  };

  const run = async (nodes) => {
    for (const n of nodes) {
      if (n.fn) { await n.fn(G); continue; }
      if (n.wait) { await G.wait(n.wait); continue; }
      if (n.sys) { add('sys', n.sys); G.sfx('page'); await G.wait(n.pause ?? 700); continue; }
      if (n.me) { add('me', n.me); G.sfx('select', { volume: 0.5 }); await G.wait(500); continue; }
      if (n.from) {
        await typing(n.from, n.t.length);
        add('them', `${cfg.members.length > 1 ? `<span class="who" style="color:${COLORS[n.from] || '#555'}">${SPEAKERS[n.from].name}</span>` : ''}${n.t}`);
        G.sfx('notif', { volume: 0.45 });
        await G.wait(n.pause ?? 650);
        continue;
      }
      if (n.choice) {
        const idx = await new Promise((resolve) => {
          replies.innerHTML = '';
          n.choice.forEach((o, i) => {
            const b = el('button', '', o.t);
            b.onclick = () => resolve(i);
            replies.appendChild(b);
          });
          const off = ui.pushKeys((e) => { const k = parseInt(e.key, 10); if (k >= 1 && k <= n.choice.length) { off(); resolve(k - 1); return true; } });
          const iv = setInterval(() => controls.consumeAction(), 60);
          wrap._cleanup = () => { off(); clearInterval(iv); };
        });
        wrap._cleanup && wrap._cleanup();
        replies.innerHTML = '<div class="ph">…</div>';
        const o = n.choice[idx];
        add('me', o.send || o.t);
        G.sfx('select', { volume: 0.5 });
        if (o.c) G.complicity(o.c);
        if (o.set) G.flag(o.set);
        await G.wait(500);
        if (o.then) await run(o.then);
      }
    }
  };

  try {
    await run(cfg.script);
    await new Promise((resolve) => {
      replies.innerHTML = '';
      const b = el('button', '', cfg.closeLabel || 'Ranger le téléphone 📱');
      b.style.textAlign = 'center';
      b.onclick = resolve;
      replies.appendChild(b);
      const off = ui.pushKeys((e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') { off(); resolve(); return true; } });
    });
  } finally {
    wrap.remove();
    ui.audio.duck(false);
  }
}

/** Petite pastille d'appel en haut de l'écran pendant que le dialogue se joue. */
export function callPill(G, who, label = 'Appel en cours') {
  const pill = G.ui.overlay('', `<img src="${portraitUrl(who, 'smile')}" alt=""><div><b>${SPEAKERS[who].name}</b><small>${label} · <span class="ct">00:00</span></small></div><i class="wave"></i>`);
  pill.className = 'callpill';
  const t0 = Date.now();
  const iv = setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000) * 37; // le temps file vite au téléphone
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    pill.querySelector('.ct').textContent = `${h ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }, 1000);
  return { close: () => { clearInterval(iv); pill.remove(); } };
}

/** Écran d'appel entrant : « Décrocher ». */
export function incoming(G, who) {
  return new Promise((resolve) => {
    const wrap = G.ui.overlay('', '', 'phone');
    wrap.innerHTML = `<div class="device"><div class="screen call"><div class="notch"></div><img class="big" src="${portraitUrl(who, 'smile')}" alt=""><b>${SPEAKERS[who].name}</b><div class="t">Appel entrant…</div><div style="height:30px"></div><button class="btn primary" id="pick">📞 Décrocher</button></div></div>`;
    G.sfx('ring');
    const iv = setInterval(() => G.sfx('ring'), 1800);
    const go = () => { clearInterval(iv); off(); wrap.remove(); G.sfx('select'); resolve(); };
    wrap.querySelector('#pick').onclick = go;
    const off = G.ui.pushKeys((e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'e') { go(); return true; } });
  });
}

/** Notification de message (bandeau) — attend un clic ou Espace. */
export function notification(G, from, text) {
  return new Promise((resolve) => {
    const n = G.ui.overlay('', `<img src="${portraitUrl(from, 'smile')}" alt=""><div><b>${SPEAKERS[from].name}</b><span>${text}</span><small>Touche pour continuer</small></div>`);
    n.className = 'notifbar';
    G.sfx('notif');
    const go = () => { off(); n.classList.add('out'); setTimeout(() => n.remove(), 400); resolve(); };
    n.onclick = go;
    const off = G.ui.pushKeys((e) => { if (e.key === 'Enter' || e.key === ' ' || e.key === 'e') { go(); return true; } });
  });
}
