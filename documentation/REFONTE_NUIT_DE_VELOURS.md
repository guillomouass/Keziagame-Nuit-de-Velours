# THE QUEST FOR KEZIA — Nuit de velours

## Direction artistique

La finition visuelle adopte une ambiance romantique premium : aubergine profond, prune, champagne, rose poudré et ivoire.

## Périmètre de cette passe

- Harmonisation de la palette globale via les variables CSS existantes.
- Finition du menu, des boutons, des dialogues et des choix narratifs.
- Harmonisation des fenêtres, cartes de souvenirs et mini-jeux.
- Harmonisation du HUD et des commandes tactiles.
- Finition du téléphone intégré, des cartes narratives et de la lettre finale.
- Mise à jour du CSS source (`src/styles/main.css`) et du CSS actuellement servi par GitHub Pages (`docs/assets/index-BuF94wQL.css`).

## Intégrité du jeu

Cette passe est additive et limitée aux styles. Aucun fichier de dialogues, scénario, progression, mécanique ou illustration n'a été modifié.

## Vérifications effectuées

- Équilibre des accolades CSS vérifié : 452 ouvrantes et 452 fermantes.
- Le CSS source et le CSS de la version GitHub Pages ont reçu la même couche de finition.
- Le build Vite et les tests Vitest n'ont pas pu être exécutés dans l'environnement de préparation : l'installation des dépendances (`npm ci`) a dépassé le délai disponible. Ils doivent être exécutés localement avant publication.

## Publication

Le dossier `docs/` contient déjà la version statique configurée pour GitHub Pages. Le CSS de cette version a été mis à jour pour refléter la finition Nuit de velours.


## Contrôle qualité complémentaire — 9 novembre 2026

- Réorganisation de la cascade CSS : les couches artistiques globales précèdent désormais la couche finale « Nuit de velours », et les règles de mise en page portrait restent regroupées à la fin.
- Ajustement du test `layout.test.js` : il isole explicitement le bloc portrait au lieu d'englober les couches artistiques globales.
- 683 assertions de contrôle exécutées directement avec Node.js : dialogues validés, locuteurs et expressions, chapitres, souvenirs, manifestes d'images et d'audio, mini-jeu de décalage horaire, layout et isolation CSS.
- 22 assertions complémentaires exécutées sur la sauvegarde : progression, restauration, souvenirs, réglages, fin de jeu et stockage défaillant.
- 13 vérifications complémentaires sur les illustrations de la cinématique du baiser.
- Syntaxe de tous les fichiers JavaScript et MJS vérifiée avec `node --check`.
- Références locales de `docs/index.html` vérifiées ; équilibre des accolades CSS contrôlé dans les feuilles source et publiée.

**Limite restante :** `npm ci` n'a pas abouti dans l'environnement de préparation (délai d'attente dépassé). Les commandes officielles `npm test`, `npm run build` et `npm run build:pages` n'ont donc pas pu être exécutées ici. Les contrôles Node.js ci-dessus sont des vérifications ciblées et ne remplacent pas Vitest ni une compilation Vite complète. La version publiée `docs/` a été conservée et sa feuille CSS a été synchronisée manuellement.

## Contrôles complémentaires de la livraison

- 43 fichiers JavaScript du dossier `src/` passés avec `node --check`.
- 91 sélecteurs associés à `body.portrait` contrôlés : aucun sélecteur global mélangé à ces règles.
- Accolades CSS équilibrées.
- Métadonnée `theme-color` alignée sur le prune profond de la direction artistique dans `index.html` et `docs/index.html`.
- Feuille CSS du miroir `docs/` resynchronisée avec la source actuelle, tout en conservant les déclarations de polices générées par Vite.
- Workflow GitHub Actions renforcé : `npm test` est exécuté avant le build et le déploiement.
- Les tests Vitest et le build Vite restent à exécuter sur une machine pouvant installer les dépendances ; `npm ci` a dépassé le délai de l'environnement de préparation.
