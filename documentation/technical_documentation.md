# Documentation technique

## Pile technique

- **Phaser 3.90.0** (WebGL / Canvas) : rendu, physique arcade, caméras, particules, sons.
- **Vite 7.3.7** : serveur de développement et build (`base: './'` → `dist/` portable).
- **Vitest 5.1.0** : tests unitaires.
- **@fontsource** Playfair Display + Nunito : polices embarquées (aucun appel à Google Fonts, fonctionne hors ligne).
- Interface (menus, dialogues, téléphone, mini-jeux DOM) en HTML/CSS par-dessus le canvas.
- Illustrations **vectorielles SVG générées par code** et sons **synthétisés par code** (aucune ressource externe).

## Arborescence

```
index.html, vite.config.js, package.json
scripts/
  generate-assets.mjs      → écrit toutes les illustrations dans public/assets/ + manifest.json
  generate-audio.mjs       → synthétiseur : musiques (WAV en boucle) et bruitages
  art/characters.js        → personnages : tête par expression, buste, bras, jambe, portraits, silhouettes
  art/backgrounds.js       → décors en 4 couches de parallaxe + décors fixes
  art/objects.js           → objets, souvenirs, couverture, cinématique du collier
  art/util.js
public/assets/
  characters/ (+ portraits/, full/), backgrounds/, objects/, cinematics/, music/, sounds/, manifest.json
src/
  main.js                  → création du jeu Phaser, menu, pause, navigation
  data/layout.js           → positions partagées entre décors et gameplay
  data/speakers.js, data/memories.js
  interface/UI.js          → HUD, dialogues, choix, cartes, galerie, options, chapitres, toasts, tactile
  game/systems/            → Save (localStorage), Audio, Controls, Director (enchaînement des chapitres)
  game/characters/Rig.js   → pantin articulé animé (marche, respiration, clignement, émotions)
  game/scenes/             → Boot, World (exploration), Backdrop (décor + personnages), Train, Bowling, Shell
  game/mechanics/          → phone.js (messagerie, appels), minigames.js (décalage horaire, podcast), finale.js
  game/chapters/           → un fichier par chapitre (déroulé, étapes)
  game/dialogues/          → tous les textes
  styles/main.css
tests/                     → tests Vitest + outils de recette (qa-autopilot.js, asset-preview.html)
documentation/
```

## Le « Director » et les chapitres

Un chapitre est un objet `{ title, num, date, tagline, music, steps: [async (G) => { ... }] }`.
Le Director exécute les étapes dans l'ordre et **sauvegarde avant chaque étape** (reprise exacte avec « Continuer »).
`G` est la boîte à outils des scripts :

| Méthode | Effet |
|---|---|
| `G.world(cfg)` | Niveau d'exploration ; se termine quand le joueur atteint la sortie ou qu'un script appelle `scene.finish()` |
| `G.backdrop(cfg)` | Décor fixe animé avec personnages (`{ bg, fg, chars, lights, music, particles }`) |
| `G.train()`, `G.shell()`, `G.bowling()` | Scènes spéciales |
| `G.say(répliques)` / `G.choose()` | Dialogues et choix |
| `G.chat(cfg)`, `G.notification()`, `G.callPill()`, `G.incoming()` | Téléphone |
| `G.timezone()`, `G.podcast()`, `G.necklace()`, `G.constellation()`, `G.letter()`, `G.credits()` | Mini-jeux et cinématiques |
| `G.memory(id)`, `G.complicity(n)`, `G.flag(k)`, `G.has(k)`, `G.objective(t)`, `G.card()` | État et interface |

Revenir au menu annule proprement le chapitre en cours (`CancelledError`).

### Configuration d'un niveau (`G.world`)

```js
{
  bg: 'event',                 // décor : bg_<nom>_far/mid/near/fg
  music: 'explore',            // menu | explore | fair | tender | night | final
  start: { x: 140 },
  follower: 'kezia',           // personnage qui suit Guillo (optionnel)
  objective: 'Texte de l’objectif',
  platforms: [{ x, y, w, style: 'crate' | 'shelf' | 'scaffold' | 'cloud' | 'invisible' }],
  items: [{ tex: 'etoile', x, y, memory: 'id', secret: true, onPick: async (G) => {} }],
  npcs: [{ id: 'kezia', x, face: -1, expr, mood: 'dance'|'cheer'|'phone', label, when: () => bool, talk: async (G, scene) => {} }],
  hotspots: [{ x, label, talk }],
  triggers: [{ x, run: async (G) => {} }],
  exit: { x, label, when: () => bool, locked: async (G) => {} },
  onStart: async (G) => {},
}
```

## Comment…

### Modifier les dialogues
Éditer `src/game/dialogues/chN.js` (voir `documentation/dialogues.md`). Le navigateur se recharge tout seul avec `npm run dev`.

### Remplacer une image
Toutes les images sont dans `public/assets/` et listées dans `public/assets/manifest.json`.
- Remplacer un **SVG** par un autre SVG du **même nom** : rien d'autre à faire.
- Utiliser un **PNG** : déposer le fichier, puis changer l'extension de l'entrée correspondante dans `manifest.json`
  (et dans `scripts/generate-assets.mjs` si vous comptez relancer `npm run assets`, qui réécrit le manifest).
- Les portraits de dialogue sont `public/assets/characters/portraits/<personnage>_<expression>.svg`.
- Attention : `npm run assets` régénère et **écrase** les SVG produits par le code.
- Pour changer durablement l'apparence d'un personnage : modifier ses couleurs/coiffure dans `scripts/art/characters.js`
  (objets `CHARS` et `NPCS`) puis lancer `npm run assets`.

### Ajouter un chapitre
1. Créer `src/game/dialogues/monchapitre.js` (textes) et `src/game/chapters/monchapitre.js` (même structure que `ch7.js`).
2. L'ajouter dans `src/game/chapters/index.js` à la position voulue.
3. Facultatif : ajouter ses souvenirs dans `src/data/memories.js`, un décor dans `scripts/art/backgrounds.js` (+ `src/data/layout.js`), puis `npm run assets`.
4. `npm test` vérifie que les souvenirs et images référencés existent.

### Construire la version de production
```bash
npm run build      # crée dist/
npm run preview    # teste dist/ sur http://localhost:4178
```

## Tests et recette

- `npm test` : 19 tests (sauvegarde, dialogue du train mot pour mot, réplique de la Foire, cohérence des locuteurs
  et expressions, souvenirs atteignables, présence de toutes les images et sons, logique du décalage horaire).
- `tests/asset-preview.html` : planche de toutes les illustrations (`npm run dev` puis http://localhost:5178/tests/asset-preview.html).
- `tests/qa-autopilot.js` : pilote automatique à charger dans la console du navigateur
  (`await import('/tests/qa-autopilot.js'); autoOn();`), avec `tele(x)` et `act()` pour se déplacer dans les niveaux.
- Débogage : `window.__kezia` donne accès à l'application (`__kezia.play(chapitre, étape)`, `__kezia.save.state`).

## Version mobile (portrait et paysage)

- `src/game/systems/Layout.js` mesure l'écran (`visualViewport`) et choisit la composition. **Paysage et ordinateur** : canvas logique
  1280 × 720 inchangé, dialogue et commandes superposés à la scène. **Portrait** (largeur / hauteur < 0.9) : classe `portrait` sur `<body>`,
  écran coupé en deux — la scène en haut, un panneau de `--panel-h` px (244 à 360) en bas pour le dialogue, les choix et les boutons du pouce.
  La hauteur logique reste 720 ; la largeur logique se resserre pour épouser la zone (aucune déformation).
- `src/game/systems/View.js` recadre les scènes à largeur fixe (`fitCamera`) : la caméra se centre et ne recule (zoom < 1) que si le contenu
  important ne tient pas. `softEdges` estompe les bords du décor quand la caméra recule.
- Scènes concernées : Backdrop (cadrage sur les personnages principaux, la caméra suit celui qui parle s'il est hors cadre), Train, Bowling
  (jauge, score et encouragements ancrés aux bords visibles), Shell, Kiss. L'exploration (World) défile déjà : pas de recadrage, et la
  caméra ne remonte plus pendant les dialogues en portrait (le dialogue a son panneau).
- CSS : toutes les règles portrait sont dans un bloc final, préfixées `body.portrait` (testé dans `tests/layout.test.js`), donc sans effet
  sur ordinateur. Les hauteurs utilisent `--vh-px` (hauteur réellement visible, barres de Safari comprises) et `env(safe-area-inset-*)`.
