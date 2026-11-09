# Game design — À la conquête du cœur de Kezia

## Intention

Une surprise romantique, drôle et personnelle. La joueuse (Kezia) guide Guillo, qui tente — avec humour,
créativité et sincérité — de conquérir son cœur. Kezia y est indépendante, taquine, nuancée.
La conquête reste ludique et respectueuse. Elle se conclut par une cinématique romantique où Guillo et Kezia s'embrassent (voir chapitre final).

## Fil rouge : la jauge de complicité

- Chaque choix de dialogue peut ajouter de la complicité (+1 à +6). Aucun choix n'en retire : les réponses maladroites
  sont simplement plus drôles et rapportent un peu moins.
- La jauge est **plafonnée à 99 %**. Au chapitre final, Guillo explique : « le dernier pourcent ne se gagne pas, il se donne ».
- C'est le message central du jeu, en écho à la phrase réelle du train : « Ça prendra le temps que ça prendra. »

## Structure (≈ 10 à 15 minutes)

| # | Chapitre | Lieu | Gameplay |
|---|---|---|---|
| 1 | The First Encounter (13/09/2025) | Soirée networking NWAJA | Exploration, plateforme légère (3 étoiles secrètes), dialogues à choix |
| 2 | The Afterparty | Bowling | Exploration, choix « aborder ou non », **mini-jeu de bowling** (visée + puissance), appel à Staecy |
| 3 | The Group Chat | Chambre, téléphone | **Messagerie interactive** (groupe puis conversation privée) |
| 4 | The Paris Adventures | Foire de Paris | Faux couple (stand immobilier), test du lit (réplique authentique), **jeu de la perle**, **cinématique du collier** |
| 5 | The Train Conversation | Train au coucher du soleil | Scène cinématique avec le **dialogue réel validé** |
| 6 | Growing Together | Studio NWAJA | Conseils pour son contenu cheveux afro, **collecte sur étagères** (plateforme), **mini-jeu podcast** (rythme), retours sur l'application |
| 7 | The Paris Meetings | Paris la nuit, restaurant | Notification de Staecy (rendez-vous à deux), dîner et projets de vie, invitation de Kezia (restaurant africain non nommé) |
| 8 | Miles Apart | Irlande, Kuala Lumpur | Appel sous la pluie, **plateforme sur les toits** (5 messages vocaux), **mini-jeu du décalage horaire** |
| ♥ | À la conquête du cœur de Kezia | Chemin des souvenirs | Orbes de souvenirs, **constellation à rallumer** (maintenir la perle), lettre, **choix final fait par Kezia**, **cinématique du baiser**, générique |

## Mécaniques

- **Exploration / plateforme** : défilement horizontal, saut, plateformes traversables par le dessous, caméra qui se relève
  pendant les dialogues pour garder les visages visibles.
- **Dialogues** : portraits expressifs (8 expressions), effet machine à écrire, choix au clavier (1-4, flèches) ou au toucher.
- **Répliques authentiques** : badge « ❝ réplique authentique » sur les 5 répliques réellement prononcées.
  Toutes les autres sont présentées comme imaginées (annonce dans le prologue + mention « Conversation réimaginée » sur le téléphone).
- **Mini-jeux** : bowling, perle, podcast, décalage horaire, constellation.
- **Collectibles** : 19 souvenirs dont 3 secrets (étoiles NWAJA, strike, brochure) et 1 objet unique (le collier).
- **Collier à la perle** : objet unique, cinématique dédiée (rejouable depuis la galerie), et Kezia le porte ensuite
  dans toutes les scènes et sur ses portraits.
- **Sauvegarde automatique** à chaque étape ; menu Continuer / Chapitres / Galerie / Options ; pause (Échap).

## Respect des consignes

- Les événements réels sont respectés ; le nom du restaurant africain n'est pas mentionné.
- Aucun faux cadeau n'est présenté comme réel (la « bague » n'existe que comme blague, la brochure est un objet du jeu).
- Fin : la réponse finale est choisie par Kezia parmi quatre options, puis une cinématique sans dialogue montre le baiser (`src/game/scenes/KissScene.js`, illustrations dans `scripts/art/baiser.js`) : de profil sous la lune, ils se rapprochent, ferment les yeux, s'embrassent puis reculent légèrement en souriant, nez contre nez (environ 4 s de mouvement, 9 s en tout), avant l'écran « À suivre… ».
