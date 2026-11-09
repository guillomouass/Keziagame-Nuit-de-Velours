// Pilote automatique de recette (QA) : à charger dans la console du navigateur pendant `npm run dev` :
//   await import('/tests/qa-autopilot.js'); autoOn();
// Il avance les dialogues, choisit la première option, répond au téléphone, joue les mini-jeux.
// Les helpers tele(x, y) et act() permettent de se téléporter dans les niveaux et d'interagir.

const app = () => window.__kezia;
const sm = () => app().game.scene;
const key = (k, code) => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: k, keyCode: code, which: code }));
  setTimeout(() => window.dispatchEvent(new KeyboardEvent('keyup', { key: k, keyCode: code, which: code })), 60);
};

const A = (window.A = window.A || { log: [], errors: [], pick: 0 });
if (!A.listening) {
  A.listening = true;
  window.addEventListener('error', (e) => A.errors.push(e.message));
  window.addEventListener('unhandledrejection', (e) => A.errors.push(String(e.reason)));
}

function autoStep() {
  const q = (s) => document.querySelector(s);
  const ch = document.querySelectorAll('#choices button');
  if (ch.length) { const i = Math.min(A.pick || 0, ch.length - 1); A.log.push('CHOICE ' + ch[i].textContent.slice(0, 50)); ch[i].click(); return; }
  const rep = document.querySelectorAll('#phone .replies button');
  if (rep.length) { A.log.push('REPLY ' + rep[0].textContent.slice(0, 50)); rep[0].click(); return; }
  const pk = q('#phone #pick'); if (pk) { pk.click(); return; }
  const nb = q('.notifbar:not(.out)'); if (nb) { A.log.push('NOTIF'); nb.click(); return; }
  if (q('#card.on')) { q('#card').click(); return; }
  const tz = q('#tzr'); if (tz) { tz.value = '1'; tz.oninput(); A.log.push('TIMEZONE'); q('#call').click(); return; }
  const pz = q('#pz');
  if (pz) { const z = parseFloat(pz.style.left), w = parseFloat(pz.style.width), c = parseFloat(q('#pc').style.left.replace('calc(', '')); if (c > z + 1 && c < z + w - 1) key(' ', 32); return; }
  const hold = q('.hold'); if (hold && !A.held) { A.held = true; window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', keyCode: 32 })); A.log.push('HOLD'); return; }
  const cb = q('#cine .btn, .mg .letter .btn'); if (cb) { A.log.push('BTN ' + cb.textContent); cb.click(); A.held = false; return; }
  const dlg = q('#dialogue');
  if (dlg && !dlg.classList.contains('hidden')) {
    const t = q('#dialogue .text').textContent;
    if (A.last !== t) { A.log.push((q('#dialogue .name').textContent || 'narr') + ': ' + t.slice(0, 70)); A.last = t; }
    q('#dialogue .box').click();
    return;
  }
  if (sm().isActive('Bowling')) { key(' ', 32); return; }
  if (sm().isActive('Shell') && sm().getScene('Shell').picking) { key(' ', 32); A.log.push('SHELL PICK'); }
}

Object.assign(window, {
  key,
  sm,
  autoStep,
  autoOn: () => { clearInterval(A.iv); A.iv = setInterval(autoStep, 300); },
  autoOff: () => clearInterval(A.iv),
  tele: (x, y = 560) => sm().getScene('World').body.body.reset(x, y),
  act: () => key('e', 69),
  W: (ms) => new Promise((r) => setTimeout(r, ms)),
  state: () => ({ save: `${app().save.state.chapter}/${app().save.state.step}`, scenes: sm().getScenes(true).map((s) => s.sys.settings.key), errors: A.errors, log: A.log.slice(-15) }),
});
