// Sauvegarde automatique (localStorage). Toutes les lectures/écritures sont protégées :
// en navigation privée ou si le stockage est bloqué, le jeu continue sans sauvegarde.

export const SAVE_KEY = 'kezia-conquete-save-v1';

export function defaultState() {
  return {
    version: 1,
    chapter: 0,
    step: 0,
    started: false,
    finished: false,
    reached: 0, // plus haut chapitre atteint (déblocage du menu Chapitres)
    memories: {},
    flags: {},
    complicity: 0,
    settings: { music: 0.6, sfx: 0.8, textSpeed: 1 },
  };
}

export function createSave(storage = safeStorage()) {
  let state = load();

  function load() {
    try {
      const raw = storage && storage.getItem(SAVE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      return { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings || {}) } };
    } catch {
      return defaultState();
    }
  }

  function write() {
    try {
      storage && storage.setItem(SAVE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  return {
    get state() { return state; },
    write,
    hasProgress: () => state.started && !(state.chapter === 0 && state.step === 0),
    progress(chapter, step) {
      state.started = true;
      state.chapter = chapter;
      state.step = step;
      state.reached = Math.max(state.reached, chapter);
      return write();
    },
    finish() { state.finished = true; state.chapter = 0; state.step = 0; return write(); },
    unlockMemory(id) {
      if (state.memories[id]) return false;
      state.memories[id] = Date.now();
      write();
      return true;
    },
    hasMemory: (id) => !!state.memories[id],
    setFlag(k, v = true) { state.flags[k] = v; write(); },
    flag: (k) => state.flags[k],
    addComplicity(n) {
      const before = state.complicity;
      state.complicity = Math.max(0, Math.min(99, state.complicity + n)); // le dernier pourcent ne se gagne pas
      write();
      return state.complicity - before;
    },
    setComplicity(n) { state.complicity = Math.max(0, Math.min(100, n)); write(); },
    setting(k, v) { state.settings[k] = v; write(); },
    resetStory() {
      const keep = { settings: state.settings, memories: state.memories, reached: state.reached, finished: state.finished };
      state = { ...defaultState(), ...keep };
      return write();
    },
    resetAll() { state = defaultState(); return write(); },
  };
}

function safeStorage() {
  try {
    const s = globalThis.localStorage;
    const k = '__kezia_test__';
    s.setItem(k, '1');
    s.removeItem(k);
    return s;
  } catch {
    return null;
  }
}
