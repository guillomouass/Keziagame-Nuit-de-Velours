// État des commandes partagé entre clavier (lu dans les scènes) et boutons tactiles (DOM).

export const controls = {
  left: false,
  right: false,
  jump: false,
  action: false,
  _jumpEdge: false,
  _actionEdge: false,
  press(name) {
    if (name === 'jump' && !this.jump) this._jumpEdge = true;
    if (name === 'action' && !this.action) this._actionEdge = true;
    this[name] = true;
  },
  release(name) { this[name] = false; },
  consumeJump() { const v = this._jumpEdge; this._jumpEdge = false; return v; },
  consumeAction() { const v = this._actionEdge; this._actionEdge = false; return v; },
  reset() { this.left = this.right = this.jump = this.action = false; this._jumpEdge = this._actionEdge = false; },
};

export const isTouch = () =>
  (typeof window !== 'undefined' && ('ontouchstart' in window || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)));
