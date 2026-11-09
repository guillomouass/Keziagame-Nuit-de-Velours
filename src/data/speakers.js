// Qui parle ? Nom affiché, couleur de l'étiquette, portrait et côté de l'écran.
// Les portraits sont dans public/assets/characters/portraits/<portrait>_<expression>.svg

export const MAIN_EXPR = ['neutral', 'smile', 'laugh', 'surprised', 'tease', 'shy', 'thinking', 'tender'];
export const NPC_EXPR = ['neutral', 'smile', 'laugh', 'surprised'];

export const SPEAKERS = {
  guillo: { name: 'Guillo', color: '#f4c25a', portrait: 'guillo', side: 'left', pitch: 0.9 },
  think: { name: 'Guillo · dans sa tête', color: '#c9b3e6', portrait: 'guillo', side: 'left', think: true, pitch: 0.85 },
  kezia: { name: 'Kezia', color: '#ff8fa3', portrait: 'kezia', side: 'right', pitch: 1.25 },
  staecy: { name: 'Staecy', color: '#c5a8ff', portrait: 'staecy', side: 'right', pitch: 1.15 },
  narr: { name: '', narrator: true, pitch: 1 },
  agent: { name: 'Agent immobilier', color: '#9fc3e6', portrait: 'agent', side: 'right', npc: true, pitch: 0.95 },
  vendeuse: { name: 'Vendeuse literie', color: '#d9c8ff', portrait: 'vendeuse', side: 'right', npc: true, pitch: 1.2 },
  perliere: { name: 'Vendeuse de perles', color: '#9fe0d7', portrait: 'perliere', side: 'right', npc: true, pitch: 1.1 },
  serveur: { name: 'Serveur', color: '#f1ebe1', portrait: 'serveur', side: 'right', npc: true, pitch: 0.8 },
  garcon: { name: 'Un garçon', color: '#9fb9e6', portrait: 'garcon', side: 'right', npc: true, pitch: 0.9 },
  invite1: { name: 'Invité', color: '#9fe0d7', portrait: 'invite1', side: 'right', npc: true, pitch: 0.95 },
  invite2: { name: 'Invitée', color: '#ffd38a', portrait: 'invite2', side: 'right', npc: true, pitch: 1.2 },
  invite3: { name: 'Invitée', color: '#ffb3c8', portrait: 'invite3', side: 'right', npc: true, pitch: 1.2 },
  invite4: { name: 'Invité', color: '#b8e6a8', portrait: 'invite4', side: 'right', npc: true, pitch: 0.9 },
};
