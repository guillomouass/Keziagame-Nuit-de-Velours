# CLAUDE_HANDOFF — reprise du travail

## État (8 novembre 2026)
Version 1.0 **jouable et complète** : 9 chapitres, sauvegarde, galerie, mini-jeux, version de production qui se construit.
19 tests passent. Rien n'a été publié en ligne, aucun commit git n'a encore été fait (dépôt initialisé sur `main`).

## Reprendre
```bash
cd ~/Documents/05_Developpement/A_LA_CONQUETE_DU_COEUR_DE_KEZIA
npm install          # si node_modules est absent
npm run dev          # http://localhost:5178
npm test
```
Recette rapide dans la console du navigateur :
```js
await import('/tests/qa-autopilot.js'); __kezia.play(3, 0); autoOn();   // chapitre 4, étape 1
```

## Repères
- Contenu : `src/game/dialogues/` (textes) et `src/game/chapters/` (déroulé). Index : `src/game/chapters/index.js`.
- Moteur : `src/game/systems/Director.js` (API `G`), `src/game/scenes/WorldScene.js`, `src/interface/UI.js`.
- Art : `scripts/art/*.js` → `npm run assets` régénère `public/assets/` (écrase les SVG générés).
- Positions partagées décor/gameplay : `src/data/layout.js`.
- **Ne jamais modifier** les répliques `real: true` (ch4 lit, ch5 train) : le test `tests/dialogues.test.js` les protège.

## Reste à faire (par priorité)
1. Faire relire/personnaliser la lettre finale par Guillo (`src/game/dialogues/final.js`).
2. Intégrer les photos de référence si elles sont fournies (ajuster `CHARS` dans `scripts/art/characters.js`).
3. Tester sur iPhone/Safari et Android réels.
4. Convertir `public/assets/music/*.wav` en MP3/OGG (ffmpeg non installé) et adapter `generate-audio.mjs` + manifest.
5. Option : remettre la complicité à zéro quand on rejoue un chapitre isolé depuis le menu Chapitres.
6. Option : PWA hors ligne, doublage, animations de profil.

Voir `documentation/RAPPORT_FINAL.md` pour le bilan complet.
