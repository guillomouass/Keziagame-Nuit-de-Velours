# Mise en ligne — THE QUEST FOR KEZIA

## Avant publication

Dans le dossier du projet, sur votre Mac :

```bash
npm ci
npm test
npm run build
npm run build:pages
```

- `npm ci` installe les versions exactes des dépendances enregistrées dans `package-lock.json`.
- `npm test` exécute les tests automatisés.
- `npm run build` construit le jeu dans `dist/`.
- `npm run build:pages` régénère aussi le miroir statique `docs/`.

Si les commandes se terminent sans erreur, publier les modifications :

```bash
git add .
git commit -m "release: finalize Nuit de velours"
git push origin main
```

## Déploiement GitHub Pages

Le workflow `.github/workflows/deploy.yml` se déclenche à chaque push sur `main` : il installe les dépendances, exécute `npm test`, construit le jeu avec Vite, puis déploie le dossier `dist/` sur GitHub Pages. Dans les paramètres du dépôt, la source GitHub Pages doit être réglée sur **GitHub Actions**.

Le dossier `docs/` est conservé comme miroir statique de la version publiée ; le workflow actuel déploie `dist/`, pas `docs/`.

Après le push, vérifier l'exécution du workflow dans l'onglet **Actions** du dépôt. Le site n'est considéré comme publié que lorsque le job de déploiement est terminé avec succès.

## Précautions

- Décompresser l'archive et fusionner son contenu dans le dossier du projet existant.
- Conserver le dossier `.git` local : il n'est pas inclus dans l'archive.
- Ne pas remplacer les fichiers `.env` ou les identifiants locaux.
- Ne pas publier tant que `npm test` et `npm run build` n'ont pas été exécutés avec succès.
- Si GitHub refuse le push à cause d'un jeton, ne jamais coller le jeton dans un message ou dans le dépôt. Vérifier les autorisations GitHub localement.

## État de cette livraison

Le contrôle statique a validé la syntaxe de 43 fichiers JavaScript, l'équilibre des accolades CSS, 91 sélecteurs de mise en page portrait, les métadonnées de thème et la synchronisation de la feuille CSS du miroir `docs/`. La suite Vitest complète et la compilation Vite n'ont pas pu être exécutées dans l'environnement de préparation : l'installation de dépendances a dépassé le délai disponible. Le workflow GitHub exécutera ces tests avant tout déploiement.
