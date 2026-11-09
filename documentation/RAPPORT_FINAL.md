# Rapport final — À la conquête du cœur de Kezia

*Livré le 8 novembre 2026 · Dossier : `~/Documents/05_Developpement/A_LA_CONQUETE_DU_COEUR_DE_KEZIA`*

---

## A. Le jeu

### Fonctionnalités réalisées
- Menu principal illustré (Commencer / Continuer / Recommencer, Chapitres, Galerie, Options).
- Prologue adressé à Kezia, avec explication des répliques réelles et imaginées, et rappel des contrôles.
- 9 chapitres jouables de bout en bout, enchaînés automatiquement, avec cartes de titre.
- Sauvegarde automatique avant chaque étape (localStorage), reprise exacte avec « Continuer ».
- Pause (Échap / P / bouton), options (volume musique, volume bruitages, vitesse du texte, plein écran, effacement).
- Galerie de 19 souvenirs (dont 3 secrets et 1 objet unique), avec fiche détaillée et rejeu de la scène du collier.
- Sélection de chapitre pour rejouer tout chapitre déjà atteint.
- Jauge de complicité (HUD), plafonnée à 99 % : « le dernier pourcent se donne ».
- Interface adaptée ordinateur (clavier, souris) et téléphone (boutons tactiles, texte au toucher, conseil de rotation).

### Chapitres terminés
| Chapitre | Contenu |
|---|---|
| 1. The First Encounter | Soirée NWAJA : 4 invités, test du micro, rencontre de Kezia et Staecy (« ma cousine »), 3 étoiles secrètes |
| 2. The Afterparty | Bowling : Guillo voit Kezia avec un garçon et n'ose pas ; partie de bowling avec Staecy ; appel où il avoue son intérêt et apprend son prénom |
| 3. The Group Chat | Groupe « Team NWAJA ✨ », appels qui s'allongent, conversation privée et flirt, aveu « intimidé dès le premier soir » |
| 4. The Paris Adventures | Foire de Paris : faux couple au stand immobilier, test du lit (réplique authentique), jeu de la perle trouvée du premier coup, cinématique du collier |
| 5. The Train Conversation | Train au coucher du soleil, dialogue réel conservé mot pour mot |
| 6. Growing Together | Conseils pour le contenu cheveux afro, installation du studio, podcast test, structuration de l'équipe, coulisses d'un événement et retours sur l'application |
| 7. The Paris Meetings | Retour d'Irlande, Staecy ne vient pas, dîner à deux (projets de vie, future fiancée), invitation de Kezia au restaurant africain (non nommé) |
| 8. Miles Apart | Appel depuis l'Irlande sous la pluie, toits de Kuala Lumpur, mini-jeu du décalage horaire, appel de soutien mutuel |
| Final | Chemin des souvenirs, constellation à rallumer, lettre de Guillo, choix final fait par Kezia (4 réponses, aucune imposée), générique |

### Mécaniques de gameplay
Exploration à défilement horizontal · plateforme légère (caisses, étagères, échafaudages, nuages) · dialogues à choix (≈ 220 répliques, 21 moments de choix) ·
messagerie interactive · appels · bowling (visée + puissance) · jeu de la perle (mélange de coquillages) · podcast (rythme) ·
décalage horaire (puzzle de créneau) · constellation (maintenir appuyé) · objets à collectionner · souvenirs secrets · PNJ animés.

### Ressources graphiques produites (toutes générées par code, vectorielles)
- **238 illustrations SVG** :
  - 3 personnages principaux (Guillo, Kezia, Staecy) découpés pour l'animation : 7 têtes d'expression chacun, buste, bras, jambe,
    buste de Kezia avec le collier, 8 portraits d'expression chacun, silhouettes complètes ;
  - 9 personnages secondaires (invités, garçon du bowling, agent immobilier, vendeuse de literie, vendeuse de perles, serveur) ;
  - 7 mondes en 4 couches de parallaxe (soirée NWAJA, bowling, Foire de Paris, studio, Paris la nuit, Kuala Lumpur, chemin des souvenirs) ;
  - 11 décors fixes (chambre la nuit, restaurant + table, Irlande, stand literie, train : ciel, collines, arbres, poteaux, intérieur, table) ;
  - 30 objets et icônes de souvenirs ; couverture du menu ; cinématique du collier.
- Planche d'aperçu : `tests/asset-preview.html`.

### Sons et animations intégrés
- **6 musiques originales en boucle** (synthèse maison : piano électrique, nappes, cordes pincées, basse, batterie) :
  menu, exploration, Foire (enjouée), tendresse (train), nuit (jazzy), final.
- **18 bruitages** : texte, sélection, validation, souvenir, cœur, notification, sonnerie, saut, boule, strike, coquillage,
  souffle, succès, rire, page, raté, battement, ambiance de train.
- Animations : marche, respiration, clignement des yeux, danse, acclamation, téléphone, saut, émotions (♥ ✦ !),
  parallaxe, particules lumineuses, halos pulsants, balancement du train, paysage défilant, fondus, zooms, étincelles.

---

## B. Les installations

### Outils déjà présents et réutilisés
| Outil | Version | Emplacement |
|---|---|---|
| Node.js | 24.14.0 | `/usr/local/bin/node` |
| npm | 11.9.0 | `/usr/local/bin/npm` |
| git | (système) | `/usr/bin/git` |
| xmllint | (système macOS) | validation des SVG |

**Aucun logiciel n'a été installé sur le système.** Aucune installation globale.

### Dépendances npm ajoutées (dans `node_modules/` du projet uniquement)
| Paquet | Version | Type | Rôle |
|---|---|---|---|
| phaser | 3.90.0 | dépendance | moteur de jeu 2D |
| @fontsource/playfair-display | 5.3.0 | dépendance | police des titres (embarquée) |
| @fontsource/nunito | 5.3.0 | dépendance | police de l'interface (embarquée) |
| vite | 7.3.7 | développement | serveur et build |
| vitest | 5.1.0 | développement | tests |

Versions exactes figées dans `package.json` ; `npm audit` : **0 vulnérabilité**.

### Commandes d'installation exécutées
```bash
git init -b main                 # dépôt git local du projet
npm install                      # phaser, vite, vitest 3.2.7, polices
npm install -D -E vitest@5.1.0   # remplacement de vitest 3.2.7 (voir ci-dessous)
```

### Installations ayant échoué ou remplacées
- Aucune installation n'a échoué.
- **Vitest 3.2.7** a été remplacé par **5.1.0** car `npm audit` signalait 3 vulnérabilités (dont 2 critiques via `tinypool`).
- Phaser 4 (4.2.1) existait mais Phaser 3.90.0, branche stable et éprouvée, a été préféré. Three.js n'a pas été installé
  (direction 2.5D par parallaxe, voir E).

---

## C. Les tests

### Tests réellement effectués
1. **Tests automatiques** (`npm test`) : 19/19 réussis — sauvegarde (écriture, relecture, stockage bloqué ou corrompu, plafond 99 %,
   recommencer sans perdre la galerie), dialogue du train identique mot pour mot, réplique de la Foire exacte, exactement 5 répliques
   « authentiques », locuteurs et expressions valides, absence de nouchi courant, restaurant non nommé, 9 chapitres,
   tous les souvenirs référencés existent et sont atteignables, toutes les images et tous les sons référencés existent,
   logique du décalage horaire.
2. **Validation XML** des 238 SVG (`xmllint`) : tous valides (une erreur `&` corrigée).
3. **Build de production** (`vite build`) puis **serveur de prévisualisation** : 198 ressources chargées, 0 échec, menu affiché.
4. **Partie complète dans le navigateur intégré** (Chromium), du prologue au générique : chaque chapitre parcouru,
   avec un pilote automatique pour les dialogues et des téléportations dans les niveaux. Aucune erreur JavaScript.
5. **Déplacements clavier** (flèches, vitesse mesurée 290 px/s), saut, interactions (E), collisions avec plateformes
   (étagères du chapitre 6, échafaudages du chapitre 8), ramassage d'objets, sortie verrouillée puis déverrouillée.
6. **Commandes tactiles** en émulation téléphone (740×360, écran tactile) : gauche/droite, saut, interaction, avancer le texte.
7. **Pause**, **galerie**, fiche du collier et **rejeu de la cinématique**, retour au menu après le générique.
8. **Tailles d'écran** : 800×600, 800×745, 800×993 (portrait), 740×360 (téléphone paysage), affichage plein panneau.
9. **Audio** : génération vérifiée (durées, niveaux RMS et crêtes, aucune saturation) et chargement par Phaser (24 sons).

### Bugs corrigés pendant la recette
- La boîte de dialogue masquait les personnages → la caméra se relève automatiquement pendant les dialogues.
- Deux enseignes « NWAJA » se superposaient à la soirée, puis chevauchaient « Bar à jus » → enseigne déplacée.
- `npm run assets` effaçait la liste des sons du manifest → liste conservée.
- Personnages du restaurant trop enfoncés derrière la table ; scène du lit illisible → repositionnés, agrandis, oreillers ajoutés.
- L'objectif d'un niveau restait affiché dans la scène suivante → effacé à la sortie.
- Le menu proposait « Continuer · Chapitre 1 » après la fin → « Rejouer l'aventure ».
- Bannière « FOIRE DE PARIS » tronquée, cœur de chargement décentré, texte de la cinématique peu lisible, invite
  d'interaction visible derrière les dialogues, personnages du train trop petits.

### Bugs ou limites encore connus
- La musique est en **WAV** (6 Mo) : pas d'encodeur MP3/OGG installé. Fonctionne partout, mais plus lourd qu'idéal.
- Rejouer un chapitre via le menu « Chapitres » **cumule** la complicité (plafonnée à 99 %).
- ~~En téléphone portrait, le jeu (16:9) est petit~~ : corrigé, voir « Version mobile » dans `documentation/technical_documentation.md`.
- Sur petit écran paysage, la boîte de dialogue occupe une grande partie de l'écran.
- Les mini-jeux bowling/perle/podcast ont été validés par simulation de touches, pas joués « à la main » au toucher.

### Compatibilité vérifiée
- Chromium (navigateur intégré), WebGL + Web Audio, souris, clavier, tactile émulé.
- **Non vérifié** : Safari (macOS/iOS), Firefox, vrais téléphones Android/iPhone.

---

## D. Utilisation

- **Lancer** : `npm run dev` puis http://localhost:5178 (sur téléphone : adresse « Network » du terminal, même Wi-Fi).
- **Arrêter le serveur** : `Ctrl + C` dans le terminal.
- **Modifier les dialogues** : `src/game/dialogues/` (format dans `documentation/dialogues.md`). Ne pas toucher aux répliques `real: true`.
- **Remplacer les images** : fichiers de `public/assets/` (même nom pour un SVG ; pour un PNG, adapter `manifest.json`).
  Détails dans `documentation/technical_documentation.md`.
- **Ajouter un chapitre** : créer `src/game/dialogues/x.js` + `src/game/chapters/x.js`, l'ajouter dans `src/game/chapters/index.js`.
- **Version de production** : `npm run build` (dossier `dist/`), test avec `npm run preview` (http://localhost:4178).
- **Tests** : `npm test`.

---

## E. État du projet

### Terminé
Tout le périmètre P0 (menu, personnages, déplacements, dialogues, Foire de Paris, collier, train, conclusion, sauvegarde),
tout le P1 (bowling, NWAJA, podcast, restaurant africain, Malaisie, objets bonus) et une partie du P2
(secrets, galerie enrichie avec rejeu de scène, mini-jeux secondaires, animations).

### Simplifié
- **Photos de référence** : elles n'ont pas été fournies. Les personnages sont stylisés d'après les descriptions
  (Guillo : cheveux courts ; Kezia : cheveux naturels bouclés et volumineux). **L'apparence de Staecy
  (tresses et chignon, haut violet) est inventée.** Couleurs de peau, tenues et coiffures se changent dans `scripts/art/characters.js`.
- **3D** : pas de Three.js. Rendu 2.5D par parallaxe à 4 couches, éclairages additifs et particules, plus cohérent et plus léger.
- Les décors sont illustrés en vectoriel « flat » par code, pas peints à la main.
- Personnages vus de face (style « pantin »), y compris en marchant.

### Non terminé
- Pas de doublage vocal.
- Pas de version installable hors ligne (PWA).
- Pas de test sur appareils physiques.

### Recommandations pour la suite
1. **Relire et personnaliser la lettre finale** (`src/game/dialogues/final.js`) : c'est le moment le plus personnel du jeu.
2. Fournir les deux photos de référence pour affiner les visages et les tenues (ou ajuster les couleurs dans `characters.js`).
3. Faire une partie complète sur un vrai téléphone, idéalement celui de Kezia (iPhone/Safari).
4. Convertir les musiques en MP3/OGG (avec ffmpeg) pour alléger le jeu avant hébergement.
5. Pour offrir le jeu : héberger `dist/` sur un service statique (Netlify, Vercel, GitHub Pages…) — rien n'a été publié.
