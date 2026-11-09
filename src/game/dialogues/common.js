// Textes communs : prologue, cinématique du collier, générique.
// Format des répliques : { s: 'qui parle', e: 'expression', t: 'texte', real: true si réplique authentique }
// Expressions : neutral, smile, laugh, surprised, tease, shy, thinking, tender

export const PROLOGUE = [
  { text: 'Kezia,<br>ce jeu a été fabriqué rien que pour toi.', hold: 3200 },
  { text: 'Tu vas guider Guillo, un garçon qui essaie — avec humour, créativité et sincérité — de conquérir ton cœur.<br><br>Mais ici, l’héroïne, c’est toi.', hold: 4200 },
  { text: 'Les événements sont inspirés de votre histoire.<br>La plupart des répliques sont imaginées pour le jeu ; celles marquées <span style="color:#f4c25a;font-style:normal">❝ réplique authentique</span> ont vraiment été prononcées.', hold: 5200 },
  { text: '<span style="font-style:normal;font-size:.8em;line-height:2">🖥️ ← → marcher · Espace sauter · E parler · Échap pause<br>📱 boutons à l’écran · touche le texte pour avancer</span>', hold: 4200 },
];

export const NECKLACE_LINES = [
  'Une perle, cachée dans un coquillage.',
  'Trouvée du premier coup.',
  'Kezia n’en revient pas.',
  'Un collier, rien que pour elle. ✦',
];

export const CREDITS = [
  ['title', 'À la conquête du cœur de Kezia'],
  ['Une idée, une envie et beaucoup de cœur', 'Guillo'],
  ['Héroïne', 'Kezia'],
  ['Entremetteuse (involontaire ?)', 'Staecy'],
  ['Là où tout a commencé', 'Soirée networking NWAJA · 13 septembre 2025'],
  ['Musique, illustrations et bruitages', 'Créés spécialement pour ce jeu'],
  ['Merci d’avoir joué', '✦ À suivre… ✦'],
];
