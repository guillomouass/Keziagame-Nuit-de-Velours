# À la conquête du cœur de Kezia 💗

Un mini-jeu romantique en 2.5D, fait main par Guillo pour Kezia.
Neuf chapitres (environ 10 à 15 minutes), des dialogues à choix, des mini-jeux, une galerie de souvenirs
et un collier à la perle très spécial.

## Lancer le jeu

Dans un terminal, depuis ce dossier :

```bash
npm run dev
```

Puis ouvrir **http://localhost:5178** dans le navigateur.
Sur un téléphone connecté au même Wi-Fi, utiliser l'adresse « Network » affichée dans le terminal.

Pour arrêter le serveur : `Ctrl + C` dans le terminal.

## Commandes

| Commande | Rôle |
|---|---|
| `npm install` | Installe les dépendances (déjà fait) |
| `npm run dev` | Serveur de développement (http://localhost:5178) |
| `npm run build` | Version finale dans `dist/` |
| `npm run preview` | Teste la version finale (http://localhost:4178) |
| `npm test` | Lance les tests automatiques |
| `npm run assets` | Régénère toutes les illustrations et les sons |

## Contrôles

- **Ordinateur** : ← → (ou Q/D, A/D) marcher · Espace / ↑ sauter · E ou Entrée parler · Échap ou P pause
- **Téléphone** : boutons à l'écran (◀ ▶ ⤒ ♥), toucher le texte pour avancer. En portrait, la scène occupe le haut de l'écran et le dialogue, les choix et les boutons du pouce le panneau du bas ; en paysage, la disposition de l'ordinateur est conservée.

## Offrir le jeu

`npm run build` crée le dossier `dist/`. Il peut être hébergé tel quel sur n'importe quel hébergeur de site statique
(rien n'est publié automatiquement). Ouvrir `dist/index.html` directement en double-cliquant ne fonctionne pas
(les navigateurs bloquent le chargement des fichiers locaux) : utiliser `npm run preview` ou un hébergeur.

## Où modifier quoi ?

- **Dialogues** : `src/game/dialogues/` (un fichier par chapitre, texte en clair)
- **Lettre finale** : `src/game/dialogues/final.js` → `LETTER` et `SIGNATURE`
- **Déroulé des chapitres** : `src/game/chapters/`
- **Souvenirs de la galerie** : `src/data/memories.js`
- **Images** : `public/assets/` (voir `documentation/technical_documentation.md`)

Documentation complète : `documentation/` — et le bilan détaillé : `documentation/RAPPORT_FINAL.md`.
