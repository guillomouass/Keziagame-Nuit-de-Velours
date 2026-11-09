# Dialogues

Tous les textes du jeu sont dans `src/game/dialogues/` (un fichier par chapitre). Environ 220 répliques, en français, sans nouchi.

## Répliques authentiques (ne pas modifier)

Marquées `real: true` dans le code et affichées avec le badge « ❝ réplique authentique ».
Le test `tests/dialogues.test.js` échoue si l'une d'elles est modifiée.

**Chapitre 4 — Foire de Paris, à la vendeuse de literie**
> Kezia : « Ce garçon dit qu'il veut me marier alors qu'il n'a même pas de bague ! »

**Chapitre 5 — Dans le train**
> Kezia : « Tu sais, en ce moment, je préfère vraiment me concentrer sur moi-même et sur mes projets. »
> Guillo : « Ah oui, je comprends. »
> Kezia : « J'aime bien passer du temps avec toi, mais je ne me vois pas forcément me remettre en couple maintenant. Je sors d'une relation qui a duré un certain temps et j'ai besoin de penser à moi. »
> Guillo : « Je comprends totalement. Je ne vais pas te mettre la pression. De mon côté, je ne suis pas encore dans une situation totalement stable non plus. Mais je veux que tu saches une chose : tu m'intéresses vraiment. Je ne suis pas pressé, je ne veux pas te mettre la pression. Ça prendra le temps que ça prendra. »

## Répliques imaginées

Toutes les autres répliques sont inventées pour le jeu, dans le ton des personnages :
Guillo romantique, drôle, parfois audacieux, parfois maladroit (surtout quand il n'est pas d'accord) ;
Kezia vive, taquine, indépendante ; Staecy complice et moqueuse.
Le prologue l'annonce clairement et l'écran du téléphone affiche « Conversation réimaginée pour le jeu ».

## Format d'une réplique

```js
{ s: 'kezia', e: 'laugh', t: 'Texte affiché' }
```

- `s` : qui parle — `guillo`, `think` (pensée de Guillo), `kezia`, `staecy`, `narr` (narration), `agent`, `vendeuse`, `perliere`, `serveur`, `garcon`, `invite1`…`invite4` (voir `src/data/speakers.js`)
- `e` : expression — `neutral`, `smile`, `laugh`, `surprised`, `tease`, `shy`, `thinking`, `tender`
- `real: true` : uniquement pour une réplique réellement prononcée
- `hearts: 5` : fait apparaître des cœurs au-dessus du personnage

## Format d'un choix

```js
{
  prompt: 'Question affichée au-dessus des choix',
  choice: [
    { t: 'Texte du choix', c: 3, then: [ /* répliques qui suivent ce choix */ ] },
    { t: 'Autre choix', c: 1 },
  ],
}
```

`c` = complicité gagnée (la jauge s'arrête à 99 %).

## Messagerie (chapitres 3 et 7)

```js
{ from: 'kezia', t: 'message reçu' }   { me: 'message envoyé par Guillo' }   { sys: 'ligne système' }
{ choice: [{ t: 'réponse proposée', c: 3, then: [ ... ] }] }
```

## La lettre finale

`src/game/dialogues/final.js` → `LETTER` (paragraphes) et `SIGNATURE`. Elle est écrite au nom de Guillo :
c'est le texte le plus personnel du jeu, à relire et personnaliser librement.
