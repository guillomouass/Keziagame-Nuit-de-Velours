// Interface DOM superposée au canvas : menus, HUD, dialogues, choix, cartes, toasts,
// commandes tactiles et fenêtres modales. Les mini-jeux DOM (téléphone, fuseaux, podcast)
// sont dans src/game/mechanics/ et utilisent les helpers exportés ici.

import { SPEAKERS, MAIN_EXPR, NPC_EXPR } from '../data/speakers.js';
import { MEMORIES, memoryById } from '../data/memories.js';
import { controls, isTouch } from '../game/systems/Controls.js';

export const A = (p) => `assets/${p}`;
export const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function portraitUrl(speakerOrId, e = 'neutral') {
  const sp = SPEAKERS[speakerOrId];
  const id = sp ? sp.portrait : speakerOrId;
  const npc = sp ? sp.npc : !['guillo', 'kezia', 'staecy'].includes(id);
  const list = npc ? NPC_EXPR : MAIN_EXPR;
  const expr = list.includes(e) ? e : e === 'tease' || e === 'tender' || e === 'shy' ? 'smile' : 'neutral';
  return A(`characters/portraits/${id}_${expr}.svg`);
}

const HEART_PATH = 'M15 27 C4 19 1 13 3.5 8 C6 3 12 3.5 15 8 C18 3.5 24 3 26.5 8 C29 13 26 19 15 27 Z';

export class UI {
  constructor(root, { save, audio }) {
    this.root = root;
    this.save = save;
    this.audio = audio;
    this.dialogActive = false;
    this.keyHandlers = [];
    this.build();
    window.addEventListener('keydown', (ev) => {
      for (let i = this.keyHandlers.length - 1; i >= 0; i--) if (this.keyHandlers[i](ev) === true) { ev.preventDefault(); return; }
    });
  }

  pushKeys(fn) { this.keyHandlers.push(fn); return () => { this.keyHandlers = this.keyHandlers.filter((f) => f !== fn); }; }
  sfx(k, o) { this.audio && this.audio.sfx(k, o); }

  build() {
    const r = this.root;
    r.innerHTML = '';
    this.loader = el('div', '', `<div><img class="heart" src="${A('objects/coeur.svg')}" alt=""><div class="bar"><i></i></div><p>Préparation de l'aventure…</p></div>`);
    this.loader.id = 'loader';
    this.hud = el('div', 'hidden');
    this.hud.id = 'hud';
    this.hud.innerHTML = `<div><div class="meter" title="Complicité avec Kezia"><div class="hrt"><svg viewBox="0 0 30 30"><defs><clipPath id="hc"><rect id="hcr" x="0" y="30" width="30" height="30"/></clipPath></defs><path d="${HEART_PATH}" fill="#ffffff22" stroke="#ff8fa3" stroke-width="1.5"/><path d="${HEART_PATH}" fill="#ff5f7e" clip-path="url(#hc)"/></svg></div><div class="lbl">Complicité<b id="hcv">0 %</b></div></div><div class="objective" id="obj"></div></div>
      <div class="hud-right"><button class="iconbtn" id="hgal" title="Souvenirs" aria-label="Galerie des souvenirs">✦</button><button class="iconbtn" id="hpause" title="Pause" aria-label="Pause">❚❚</button></div>`;
    this.fadeEl = el('div');
    this.fadeEl.id = 'fade';
    this.cardEl = el('div');
    this.cardEl.id = 'card';
    this.dialog = el('div', 'hidden');
    this.dialog.id = 'dialogue';
    this.dialog.innerHTML = `<div id="choices"></div><div class="box"><div class="portrait left hidden"><img alt=""><img class="ov hidden" alt=""></div><div class="portrait right hidden"><img alt=""><img class="ov hidden" alt=""></div><div class="name"></div><div class="text"></div><div class="next">▼</div></div>`;
    this.toasts = el('div');
    this.toasts.id = 'toasts';
    this.promptEl = el('div', 'hidden');
    this.promptEl.id = 'prompt';
    this.touch = el('div', 'hidden');
    this.touch.id = 'touch';
    // Icônes SVG (traits arrondis) : ◀ ▶, sauter (double chevron vers le haut), discuter (bulle).
    const ICO = {
      left: '<path d="M14.5 5.5 8 12l6.5 6.5"/>',
      right: '<path d="M9.5 5.5 16 12l-6.5 6.5"/>',
      jump: '<path d="M6 11.5 12 5.5l6 6"/><path d="M6 18.5 12 12.5l6 6"/>',
      action: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z"/><path d="M8.5 8.5h7M8.5 11.5h4.5"/>',
    };
    const btn = (cls, k, label) => `<button class="${cls}" data-k="${k}" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICO[k]}</svg></button>`;
    this.touch.innerHTML = btn('l', 'left', 'Gauche') + btn('r', 'right', 'Droite') + btn('j', 'jump', 'Sauter') + btn('a', 'action', 'Discuter');
    this.layer = el('div');
    this.layer.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:31';
    this.menuEl = el('div', 'hidden');
    this.menuEl.id = 'menu';
    this.modalEl = el('div', 'modal hidden');
    for (const n of [this.loader, this.hud, this.fadeEl, this.cardEl, this.dialog, this.toasts, this.promptEl, this.touch, this.layer, this.menuEl, this.modalEl]) r.appendChild(n);
    this.layer.style.pointerEvents = 'none';

    this.hud.querySelector('#hpause').onclick = () => this.onPause && this.onPause();
    this.hud.querySelector('#hgal').onclick = () => this.onPause && this.onPause('gallery');

    for (const b of this.touch.querySelectorAll('button')) {
      const k = b.dataset.k;
      const on = (e) => { e.preventDefault(); controls.press(k); b.classList.add('on'); };
      const off = (e) => { e.preventDefault(); controls.release(k); b.classList.remove('on'); };
      b.addEventListener('pointerdown', on);
      b.addEventListener('pointerup', off);
      b.addEventListener('pointerleave', off);
      b.addEventListener('pointercancel', off);
    }
  }

  // ------------------------------------------------------------ chargement
  setProgress(p) { const i = this.loader.querySelector('.bar i'); if (i) i.style.width = `${Math.round(p * 100)}%`; }
  hideLoader() { this.loader.style.opacity = 0; setTimeout(() => this.loader.classList.add('hidden'), 800); }

  // ------------------------------------------------------------ menu principal
  showMenu(h) {
    const s = this.save.state;
    const cont = this.save.hasProgress();
    this.menuEl.style.backgroundImage = `url(${A('cinematics/cover.svg')})`;
    this.menuEl.innerHTML = `<div class="panel"><div class="kicker">Une aventure romantique faite main</div>
      <h1>À la conquête<br>du cœur de <em>Kezia</em></h1>
      <p class="sub">Un jeu imaginé par Guillo. L'héroïne, c'est toi.</p>
      <div class="menu-buttons">
        ${cont ? `<button class="btn primary" data-a="continue">▶ Continuer · Chapitre ${s.chapter + 1 > 8 ? 'final' : s.chapter + 1}</button>` : ''}
        <button class="btn ${cont ? '' : 'primary'}" data-a="new">${cont ? '↺ Recommencer l’histoire' : s.finished ? '♥ Rejouer l’aventure' : '▶ Commencer l’aventure'}</button>
        <button class="btn" data-a="chapters">☰ Chapitres</button>
        <button class="btn" data-a="gallery">✦ Galerie des souvenirs (${Object.keys(s.memories).length}/${MEMORIES.length})</button>
        <button class="btn" data-a="options">⚙ Options</button>
      </div></div><div class="credit">Fait avec amour · ${new Date().getFullYear()}</div>`;
    this.menuEl.classList.remove('hidden');
    this.menuEl.querySelectorAll('[data-a]').forEach((b) => {
      b.onclick = () => { this.sfx('select'); h[b.dataset.a] && h[b.dataset.a](); };
    });
    const first = this.menuEl.querySelector('.btn');
    first && first.focus({ preventScroll: true });
  }
  hideMenu() { this.menuEl.classList.add('hidden'); }

  // ------------------------------------------------------------ HUD
  showHud(on = true) { this.hud.classList.toggle('hidden', !on); }
  setComplicity(n, delta = 0) {
    const v = this.hud.querySelector('#hcv');
    v.textContent = `${n} %`;
    this.hud.querySelector('#hcr').setAttribute('y', String(30 - (30 * n) / 100));
    if (delta > 0) {
      const p = el('div', 'plus', `+${delta}`);
      this.hud.querySelector('.meter').appendChild(p);
      setTimeout(() => p.remove(), 1500);
    }
  }
  objective(text) { this.hud.querySelector('#obj').textContent = text || ''; }

  // ------------------------------------------------------------ fondu / cartes
  async fade(on, ms = 500) { this.fadeEl.classList.toggle('on', on); await sleep(ms); }

  card({ num = '', title = '', date = '', text = '', hold = 2600, click = true } = {}) {
    return new Promise((resolve) => {
      this.cardEl.innerHTML = `${num ? `<div><div class="num">${num}</div>` : '<div>'}${title ? `<h2>${title}</h2>` : ''}${date ? `<div class="date">${date}</div>` : ''}${title && text ? '<div class="orn"></div>' : ''}${text ? `<div class="txt">${text}</div>` : ''}</div>${click ? '<div class="hint">Touche ou appuie sur Espace pour continuer</div>' : ''}`;
      requestAnimationFrame(() => this.cardEl.classList.add('on'));
      this.sfx('whoosh', { volume: 0.5 });
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        off();
        this.cardEl.onclick = null;
        this.cardEl.classList.remove('on');
        setTimeout(resolve, 700);
      };
      const off = this.pushKeys((e) => { if ([' ', 'Enter', 'e', 'E'].includes(e.key)) { finish(); return true; } });
      if (click) setTimeout(() => (this.cardEl.onclick = finish), 500);
      if (hold) setTimeout(finish, click ? hold * 2.5 : hold);
    });
  }

  // ------------------------------------------------------------ dialogues
  /**
   * Joue une liste de répliques. Formats acceptés :
   *  { s: 'kezia', e: 'laugh', t: 'Texte', real: true }   réplique (real = réplique authentique)
   *  { choice: [{ t, c, then, set }], prompt }              choix du joueur
   *  { fn: async (ctx) => {} }                              action scriptée
   */
  async play(nodes, ctx = {}) {
    if (!nodes) return;
    for (const node of nodes) {
      if (ctx.cancelled && ctx.cancelled()) return;
      if (node.fn) { await node.fn(ctx); continue; }
      if (node.choice) {
        const opts = node.choice.filter((o) => !o.if || o.if(ctx));
        const idx = await this.choose(opts.map((o) => o.t), node.prompt);
        const o = opts[idx];
        if (o.c && ctx.complicity) ctx.complicity(o.c);
        if (o.set && ctx.flag) ctx.flag(o.set);
        if (o.then) await this.play(o.then, ctx);
        continue;
      }
      if (node.wait) { await sleep(node.wait); continue; }
      await this.line(node, ctx);
    }
    this.closeDialog();
  }

  closeDialog() { this.dialog.classList.add('hidden'); this.dialogActive = false; document.body.classList.remove('talking'); }

  line(node, ctx = {}) {
    const sp = SPEAKERS[node.s] || SPEAKERS.narr;
    ctx.onLine && ctx.onLine(node);
    if (node.sfx) this.sfx(node.sfx);
    const d = this.dialog;
    d.classList.remove('hidden');
    this.dialogActive = true;
    document.body.classList.add('talking'); // portrait : masque les boutons du pouce pendant le dialogue
    const name = d.querySelector('.name');
    const text = d.querySelector('.text');
    const pl = d.querySelector('.portrait.left');
    const pr = d.querySelector('.portrait.right');
    d.classList.remove('has-left', 'has-right');
    pl.classList.add('hidden');
    pr.classList.add('hidden');
    this.promptEl.classList.add('hidden');
    if (!sp.narrator && sp.portrait) {
      const p = sp.side === 'left' ? pl : pr;
      const img = p.querySelector('img');
      const url = portraitUrl(node.s, node.e || (sp.think ? 'thinking' : 'neutral'));
      if (!img.src.endsWith(url)) { img.src = url; p.classList.remove('pop'); void p.offsetWidth; p.classList.add('pop'); }
      const ov = p.querySelector('.ov');
      const pearl = sp.portrait === 'kezia' && this.save.flag('pearl');
      ov.classList.toggle('hidden', !pearl);
      if (pearl) ov.src = A('characters/portraits/kezia_pearl_overlay.svg');
      p.classList.remove('hidden');
      d.classList.add(sp.side === 'left' ? 'has-left' : 'has-right');
    }
    name.style.display = sp.narrator ? 'none' : '';
    name.style.background = sp.color || '#fff';
    name.innerHTML = sp.name + (node.real ? '<span class="real" title="Cette réplique a vraiment été prononcée">❝ réplique authentique</span>' : '');
    const full = node.t;
    // très longue réplique : police un peu plus petite (portrait) pour garder de la place à la scène
    text.className = 'text' + (sp.narrator ? ' narr' : '') + (sp.think ? ' think' : '') + (full.length > 190 ? ' long' : '');
    const speed = Math.max(0.3, this.save.state.settings.textSpeed || 1);
    const next = d.querySelector('.next');
    next.style.visibility = 'hidden';
    return new Promise((resolve) => {
      let i = 0;
      let typing = true;
      const step = 1.6 * speed;
      let acc = 0;
      // la suite du texte est déjà en place mais invisible : le cadre garde sa taille définitive
      // pendant l'effet machine à écrire (pas de saut de hauteur, pas de texte qui bouge)
      const setTyped = (n) => {
        text.textContent = '';
        text.append(document.createTextNode(full.slice(0, n)));
        if (n < full.length) { const r = document.createElement('span'); r.className = 'rest'; r.textContent = full.slice(n); text.append(r); }
      };
      setTyped(0);
      const timer = setInterval(() => {
        acc += step;
        const n = Math.floor(acc);
        if (n > i) {
          i = Math.min(full.length, n);
          setTyped(i);
          if (i % 4 === 0 && !sp.narrator) this.sfx('blip', { volume: 0.35, rate: sp.pitch || 1, detune: (Math.random() - 0.5) * 120 });
        }
        if (i >= full.length) endTyping();
      }, 24);
      const endTyping = () => {
        clearInterval(timer);
        typing = false;
        text.textContent = full;
        next.style.visibility = 'visible';
      };
      const advance = () => {
        if (typing) { endTyping(); return; }
        cleanup();
        this.sfx('page', { volume: 0.4 });
        resolve();
      };
      const box = d.querySelector('.box');
      box.onclick = advance;
      const off = this.pushKeys((e) => {
        if ([' ', 'Enter', 'e', 'E'].includes(e.key)) { advance(); return true; }
      });
      const touchAdv = setInterval(() => { if (controls.consumeAction()) advance(); }, 50);
      const cleanup = () => { off(); clearInterval(touchAdv); clearInterval(timer); box.onclick = null; };
      if (node.auto) setTimeout(() => { if (!typing) advance(); else { endTyping(); setTimeout(advance, node.auto); } }, node.auto + full.length * 20);
    });
  }

  choose(options, prompt) {
    return new Promise((resolve) => {
      const c = this.dialog.querySelector('#choices');
      this.dialog.classList.remove('hidden');
      document.body.classList.add('talking');
      this.dialog.querySelector('.box').classList.add('hidden');
      c.innerHTML = prompt ? `<div class="prompt">${prompt}</div>` : '';
      let sel = 0;
      const btns = options.map((t, i) => {
        const b = el('button', '', `<span class="k">${i + 1}</span>${t}`);
        b.onclick = () => pick(i);
        b.onmouseenter = () => mark(i);
        c.appendChild(b);
        return b;
      });
      const mark = (i) => { sel = i; btns.forEach((b, k) => b.classList.toggle('sel', k === i)); };
      mark(0);
      const pick = (i) => {
        off();
        clearInterval(t);
        this.sfx('select');
        c.innerHTML = '';
        this.dialog.querySelector('.box').classList.remove('hidden');
        resolve(i);
      };
      const off = this.pushKeys((e) => {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= options.length) { pick(n - 1); return true; }
        if (e.key === 'ArrowDown' || e.key === 's') { mark((sel + 1) % options.length); return true; }
        if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'w') { mark((sel + options.length - 1) % options.length); return true; }
        if (e.key === 'Enter' || e.key === ' ') { pick(sel); return true; }
      });
      const t = setInterval(() => controls.consumeAction(), 50);
    });
  }

  // ------------------------------------------------------------ toasts & prompt
  toastMemory(m) {
    const t = el('div', 'toast', `<img src="${A(`objects/${m.icon}.svg`)}" alt=""><div><small>${m.unique ? 'Objet unique' : m.secret ? 'Souvenir secret' : 'Souvenir débloqué'}</small>${m.title}</div>`);
    this.toasts.appendChild(t);
    setTimeout(() => t.remove(), 4000);
  }
  toastSave() {
    const t = el('div', 'toast save', '💾 Sauvegarde automatique');
    this.toasts.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }
  toast(text) {
    const t = el('div', 'toast save', text);
    this.toasts.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  }
  prompt(text) {
    if (!text || this.dialogActive) { this.promptEl.classList.add('hidden'); this.touch.querySelector('.a').classList.remove('ready'); return; }
    this.promptEl.innerHTML = `${isTouch() ? '' : '<kbd>E</kbd>'}${text}`;
    this.promptEl.classList.remove('hidden');
    this.touch.querySelector('.a').classList.add('ready');
  }
  setTouch(on) { this.touch.classList.toggle('hidden', !(on && isTouch())); if (!on) controls.reset(); }

  // ------------------------------------------------------------ modales
  modal(html, { onClose, wide } = {}) {
    this.modalEl.innerHTML = `<div class="sheet" style="${wide ? 'width:min(900px,100%)' : ''}">${html}</div>`;
    this.modalEl.classList.remove('hidden');
    if (this._modalOff) this._modalOff();
    const close = () => { this.modalEl.classList.add('hidden'); offKeys(); this._modalOff = null; onClose && onClose(); };
    const offKeys = this.pushKeys((e) => { if (e.key === 'Escape') { close(); return true; } return false; });
    this._modalOff = offKeys;
    this.modalEl.querySelectorAll('[data-close]').forEach((b) => (b.onclick = () => { this.sfx('select'); close(); }));
    return { root: this.modalEl, close };
  }
  closeModal() { this.modalEl.classList.add('hidden'); }

  options(onClose) {
    const s = this.save.state.settings;
    const m = this.modal(`<h2>Options</h2><p class="muted">Réglages enregistrés automatiquement.</p>
      <div class="opt"><span>🎵 Musique</span><input type="range" min="0" max="1" step="0.05" value="${s.music}" id="om"></div>
      <div class="opt"><span>🔔 Bruitages</span><input type="range" min="0" max="1" step="0.05" value="${s.sfx}" id="os"></div>
      <div class="opt"><span>✍️ Vitesse du texte</span><input type="range" min="0.5" max="3" step="0.25" value="${s.textSpeed}" id="ot"></div>
      <div class="opt"><span>⛶ Plein écran</span><button class="btn small" id="ofs">Basculer</button></div>
      <div class="opt"><span style="color:#ff8fa3">Effacer toute la progression</span><button class="btn small" id="orst">Effacer</button></div>
      <div class="row"><button class="btn primary" data-close>Fermer</button></div>`, { onClose });
    m.root.querySelector('#om').oninput = (e) => this.audio.setMusicVolume(+e.target.value);
    m.root.querySelector('#os').oninput = (e) => { this.audio.setSfxVolume(+e.target.value); this.sfx('select'); };
    m.root.querySelector('#ot').oninput = (e) => this.save.setting('textSpeed', +e.target.value);
    m.root.querySelector('#ofs').onclick = () => {
      try { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); } catch { /* non supporté */ }
    };
    m.root.querySelector('#orst').onclick = async () => {
      if (await this.confirm('Effacer toute la progression, les souvenirs et la complicité ?')) { this.save.resetAll(); location.reload(); }
    };
  }

  confirm(text) {
    return new Promise((resolve) => {
      let settled = false;
      const back = () => this.onModalBack && this.onModalBack();
      const m = this.modal(`<h2>Es-tu sûre ?</h2><p class="muted">${text}</p><div class="row"><button class="btn primary" id="cy">Oui</button><button class="btn" id="cn">Non</button></div>`, {
        onClose: () => { if (settled) return; settled = true; back(); resolve(false); },
      });
      const end = (v) => { settled = true; m.close(); if (!v) back(); resolve(v); };
      m.root.querySelector('#cy').onclick = () => end(true);
      m.root.querySelector('#cn').onclick = () => end(false);
    });
  }

  gallery(onClose, onNecklace) {
    const s = this.save.state;
    const count = Object.keys(s.memories).length;
    const items = MEMORIES.map((m) => {
      const has = !!s.memories[m.id];
      return `<div class="mem ${has ? '' : 'locked'} ${m.unique && has ? 'unique' : ''}" data-id="${m.id}"><img src="${A(`objects/${m.icon}.svg`)}" alt=""><b>${has ? m.title : m.secret ? 'Souvenir secret' : '???'}</b><small>${m.chapter > 8 ? 'Final' : `Chapitre ${m.chapter}`}${m.unique ? ' · unique' : ''}</small></div>`;
    }).join('');
    const md = this.modal(`<h2>Galerie des souvenirs</h2><p class="muted">${count} / ${MEMORIES.length} souvenirs retrouvés. Les souvenirs secrets sont cachés dans les niveaux.</p><div class="gallery">${items}</div><div class="row"><button class="btn primary" data-close>Fermer</button></div>`, { onClose, wide: true });
    md.root.querySelectorAll('.mem').forEach((n) => {
      n.onclick = () => {
        const m = memoryById[n.dataset.id];
        if (!s.memories[m.id]) return;
        this.sfx('select');
        const d = this.modal(`<div class="mem-detail"><img src="${A(`objects/${m.icon}.svg`)}" alt=""><div><h2>${m.title}</h2><p class="muted">${m.chapter > 8 ? 'Chapitre final' : `Chapitre ${m.chapter}`}</p><p>${m.text}</p></div></div>
          <div class="row">${m.unique ? '<button class="btn primary" id="replay">✦ Revoir la scène du collier</button>' : ''}<button class="btn" id="back">← Retour</button></div>`, { onClose });
        d.root.querySelector('#back').onclick = () => this.gallery(onClose, onNecklace);
        const rp = d.root.querySelector('#replay');
        if (rp) rp.onclick = () => { d.close(); onNecklace && onNecklace(); };
      };
    });
  }

  chapters(list, onPick, onClose) {
    const reached = this.save.state.finished ? list.length - 1 : this.save.state.reached;
    const html = list.map((c, i) => `<button class="chap ${i > reached ? 'locked' : ''}" data-i="${i}"><span class="n">${c.short}</span><span><b>${i > reached ? 'Chapitre verrouillé' : c.title}</b><small>${i > reached ? 'Continue l’histoire pour le débloquer' : c.date || ''}</small></span></button>`).join('');
    const m = this.modal(`<h2>Chapitres</h2><p class="muted">Rejoue n'importe quel chapitre déjà atteint.</p><div class="chapters">${html}</div><div class="row"><button class="btn" data-close>Fermer</button></div>`, { onClose });
    m.root.querySelectorAll('.chap').forEach((b) => {
      b.onclick = () => { const i = +b.dataset.i; if (i > reached) return; m.close(); onPick(i); };
    });
  }

  pause({ resume, gallery, options, menu }) {
    const m = this.modal(`<h2>Pause</h2><p class="muted">La partie est sauvegardée automatiquement à chaque étape.</p>
      <div class="menu-buttons"><button class="btn primary" id="pr">▶ Reprendre</button><button class="btn" id="pg">✦ Galerie des souvenirs</button><button class="btn" id="po">⚙ Options</button><button class="btn" id="pm">⌂ Menu principal</button></div>`, { onClose: resume });
    m.root.querySelector('#pr').onclick = () => m.close();
    m.root.querySelector('#pg').onclick = () => gallery();
    m.root.querySelector('#po').onclick = () => options();
    m.root.querySelector('#pm').onclick = () => menu();
  }

  // ------------------------------------------------------------ calques libres (mini-jeux, cinématiques)
  overlay(cls, html, id) {
    const o = el('div', cls, html);
    if (id) o.id = id;
    o.style.pointerEvents = 'auto';
    this.root.insertBefore(o, this.menuEl);
    return o;
  }

  clearAll() {
    this.closeDialog();
    this.dialog.querySelector('#choices').innerHTML = '';
    this.dialog.querySelector('.box').classList.remove('hidden');
    this.prompt(null);
    this.objective('');
    this.cardEl.classList.remove('on');
    this.fadeEl.classList.remove('on');
    this.root.querySelectorAll('.mg, #phone, #cine').forEach((n) => n.remove());
    this.keyHandlers = [];
    this.setTouch(false);
  }
}
