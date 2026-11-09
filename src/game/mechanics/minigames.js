// Mini-jeux en interface : « Le bon créneau » (décalage horaire) et « Enregistrement du podcast ».
import { el } from '../../interface/UI.js';
import { controls } from '../systems/Controls.js';

// ------------------------------------------------------------------ fuseaux horaires
// Kuala Lumpur (UTC+8) et Paris (UTC+1 en hiver) : 7 heures d'écart.
export const OFFSET = 7;
export function guilloStatus(kl) {
  if (kl >= 3 && kl <= 6) return { k: 'sleep', ok: false, t: 'Guillo dort profondément. Même l’amour ne le réveille pas à cette heure-là.' };
  if (kl >= 0 && kl <= 2) return { k: 'late', ok: true, t: 'Il devrait dormir… mais pour Kezia, il veille.' };
  if (kl >= 8 && kl <= 17) return { k: 'class', ok: false, t: 'En cours d’ingénierie. Le professeur ne trouverait pas ça romantique.' };
  if (kl === 7) return { k: 'wake', ok: false, t: 'Il vient de se réveiller et cherche encore ses lunettes… euh, son âme.' };
  return { k: 'free', ok: true, t: 'Libre ! Guillo est disponible.' };
}
export function keziaStatus(paris) {
  if (paris >= 0 && paris <= 6) return { k: 'sleep', ok: false, t: 'Kezia dort. On ne réveille pas une reine.' };
  if (paris >= 9 && paris <= 17) return { k: 'work', ok: false, t: 'Kezia est concentrée sur ses projets. Respect.' };
  return { k: 'free', ok: true, t: 'Kezia est disponible.' };
}
export const parisFromKL = (kl) => (kl - OFFSET + 24) % 24;

const STATUS_COLOR = { sleep: '#3a3f6a', late: '#b48cff', class: '#d4643f', wake: '#e0a43b', free: '#4fc38a', work: '#d4643f' };

export function timezone(G) {
  return new Promise((resolve) => {
    const o = G.ui.overlay('mg', '');
    const bars = (fn, conv) => Array.from({ length: 24 }, (_, h) => `<i style="background:${STATUS_COLOR[fn(conv(h)).k]}"></i>`).join('');
    o.innerHTML = `<div class="sheet"><h3>Le bon créneau</h3><p>Kuala Lumpur et Paris : 7 heures d’écart. Trouve l’heure où Guillo et Kezia peuvent s’appeler.</p>
      <div class="tz-clocks"><div class="tz-clock"><div class="s">🇲🇾 Kuala Lumpur · Guillo</div><div class="h" id="hkl">20:00</div><div class="st" id="sg"></div></div>
      <div class="tz-clock"><div class="s">🇫🇷 Paris · Kezia</div><div class="h" id="hpa">13:00</div><div class="st" id="sk"></div></div></div>
      <div class="tz-row"><span>Guillo</span><div class="tz-bar">${bars(guilloStatus, (h) => h)}<div class="tz-cursor" id="c1"></div></div></div>
      <div class="tz-row"><span>Kezia</span><div class="tz-bar">${bars(keziaStatus, parisFromKL)}<div class="tz-cursor" id="c2"></div></div></div>
      <input type="range" min="0" max="23" step="1" value="20" id="tzr" aria-label="Heure à Kuala Lumpur">
      <div class="legend"><span style="--c:#4fc38a">libre</span><span style="--c:#b48cff">tard mais possible</span><span style="--c:#d4643f">occupé</span><span style="--c:#3a3f6a">sommeil</span></div>
      <div class="fb" id="fb"></div><div class="row" style="display:flex;gap:10px"><button class="btn primary" id="call" disabled>📞 Appeler Kezia</button></div></div>`;
    const r = o.querySelector('#tzr');
    const upd = () => {
      const kl = +r.value, pa = parisFromKL(kl);
      const g = guilloStatus(kl), k = keziaStatus(pa);
      o.querySelector('#hkl').textContent = `${String(kl).padStart(2, '0')}:00`;
      o.querySelector('#hpa').textContent = `${String(pa).padStart(2, '0')}:00`;
      o.querySelector('#sg').textContent = g.ok ? '✅ disponible' : '⛔ indisponible';
      o.querySelector('#sk').textContent = k.ok ? '✅ disponible' : '⛔ indisponible';
      const pct = `calc(${((kl + 0.5) / 24) * 100}% - 2px)`;
      o.querySelector('#c1').style.left = pct;
      o.querySelector('#c2').style.left = pct;
      const both = g.ok && k.ok;
      o.querySelector('#fb').innerHTML = both ? `💚 <b>Créneau trouvé !</b> ${g.k === 'late' ? 'Guillo sacrifie un peu de sommeil. Romantique, mais cerné.' : ''}` : `${!g.ok ? g.t : ''} ${!k.ok ? k.t : ''}`;
      o.querySelector('#call').disabled = !both;
    };
    r.oninput = () => { G.sfx('blip', { volume: 0.4 }); upd(); };
    upd();
    const finish = () => { if (o.querySelector('#call').disabled) return; off(); clearInterval(iv); G.sfx('success'); o.remove(); resolve(+r.value); };
    o.querySelector('#call').onclick = finish;
    const off = G.ui.pushKeys((e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { r.value = String((+r.value + (e.key === 'ArrowLeft' ? 23 : 1)) % 24); r.oninput(); return true; }
      if (e.key === 'Enter' || e.key === ' ') { finish(); return true; }
    });
    let lastL = false, lastR = false;
    const iv = setInterval(() => {
      if (controls.left && !lastL) { r.value = String((+r.value + 23) % 24); r.oninput(); }
      if (controls.right && !lastR) { r.value = String((+r.value + 1) % 24); r.oninput(); }
      lastL = controls.left; lastR = controls.right;
      if (controls.consumeAction()) finish();
    }, 60);
  });
}

// ------------------------------------------------------------------ podcast
const QUESTIONS = [
  { q: 'Kezia : « Bienvenue dans le tout premier épisode test ! »', ok: 'Intro parfaite. On entend même le sourire.' },
  { q: 'Guillo : « NWAJA, c’est des rencontres qui créent des projets. »', ok: 'Pitch envoyé sans bafouiller. Un miracle.' },
  { q: 'Kezia : « Et toi, ton meilleur conseil pour entreprendre ? »', ok: 'Réponse inspirante. L’équipe hoche la tête.' },
  { q: 'Guillo : « …commencer avant d’être prêt. »', ok: 'Kezia lève le pouce 👍' },
  { q: 'Les deux : « Merci de nous avoir écoutés ! »', ok: 'C’est dans la boîte ! 🎙️' },
];

export function podcast(G) {
  return new Promise((resolve) => {
    const o = G.ui.overlay('mg', '');
    const wave = Array.from({ length: 60 }, (_, i) => `<i style="height:${18 + Math.abs(Math.sin(i * 0.7) * 50 + Math.sin(i * 0.23) * 20)}%"></i>`).join('');
    o.innerHTML = `<div class="sheet"><h3>🎙️ Podcast test — enregistrement</h3><p>Appuie (Espace / toucher) quand le curseur passe dans la zone verte pour lancer chaque réplique au bon moment.</p>
      <div class="pod-q" id="pq"></div><div class="pod-track" id="pt"><div class="pod-wave">${wave}</div><div class="pod-zone" id="pz"></div><div class="pod-cur" id="pc"></div></div>
      <div class="fb" id="pf">Prêts ? 3, 2, 1… on enregistre.</div><div class="pod-score" id="ps"></div></div>`;
    const zone = o.querySelector('#pz'), cur = o.querySelector('#pc');
    let i = 0, pos = 0, dir = 1, zs = 0, zw = 0.18, perfect = 0, tries = 0, lock = false, raf;
    const setZone = () => { zw = 0.2 - i * 0.02; zs = 0.12 + Math.random() * (0.76 - zw); zone.style.left = `${zs * 100}%`; zone.style.width = `${zw * 100}%`; o.querySelector('#pq').textContent = QUESTIONS[i].q; tries = 0; };
    setZone();
    let last = performance.now();
    const loop = (t) => {
      const dt = (t - last) / 1000; last = t;
      if (!lock) { pos += dir * dt * (0.55 + i * 0.08); if (pos > 1) { pos = 1; dir = -1; } if (pos < 0) { pos = 0; dir = 1; } }
      cur.style.left = `calc(${pos * 100}% - 2px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const hit = () => {
      if (lock) return;
      if (pos >= zs && pos <= zs + zw) {
        if (tries === 0) perfect++;
        G.sfx('beat');
        o.querySelector('#pf').textContent = `✅ ${QUESTIONS[i].ok}`;
        o.querySelector('#ps').textContent = '🎙️'.repeat(i + 1);
        lock = true;
        setTimeout(() => {
          i++;
          if (i >= QUESTIONS.length) { end(); return; }
          setZone(); lock = false;
        }, 1100);
      } else {
        tries++;
        G.sfx('miss', { volume: 0.6 });
        o.querySelector('#pf').textContent = ['Oups, trop tôt ! On refait la prise.', 'Coupez ! Prise numéro… on ne compte plus.', 'Presque ! L’ingé son soupire.'][tries % 3];
      }
    };
    const end = () => { cancelAnimationFrame(raf); off(); clearInterval(iv); G.sfx('success'); setTimeout(() => { o.remove(); resolve(perfect); }, 900); };
    o.querySelector('#pt').onpointerdown = hit;
    o.onpointerdown = (e) => { if (e.target === o) hit(); };
    const off = G.ui.pushKeys((e) => { if (e.key === ' ' || e.key === 'Enter' || e.key === 'e') { hit(); return true; } });
    const iv = setInterval(() => { if (controls.consumeAction() || controls.consumeJump()) hit(); }, 30);
  });
}

export const _test = { QUESTIONS, el };
