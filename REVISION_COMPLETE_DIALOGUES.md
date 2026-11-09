# RÉVISION COMPLÈTE DES DIALOGUES
## « À la conquête du cœur de Kezia »

*Export fidèle de l'état actuel du jeu — version du commit `0fc1f98` — généré le 8 novembre 2026.*

> **Ce document est un export, pas une réécriture.** Rien n'a été résumé, corrigé, reformulé ou supprimé. Les textes sont repris à l'identique depuis le code du jeu (`src/game/dialogues/`, plus les quelques textes écrits directement dans les chapitres et les mini-jeux).

## Légende

| Symbole | Signification |
|---|---|
| 💬 **Nom** *(expression : x)* : texte | Réplique prononcée. L'expression est celle du portrait affiché dans le jeu (neutral, smile, laugh, surprised, tease, shy, thinking, tender). |
| 💭 **Guillo — pensée** | Pensée intérieure de Guillo (portrait « dans sa tête », texte en italique dans le jeu). |
| 📖 **Narration** | Narrateur, sans portrait. |
| 📥 / 📤 / ⚙️ | Dans les conversations par messages : message **reçu** / message **envoyé** par Guillo / ligne système. |
| 🔀 **CHOIX** | Moment où le joueur choisit. Chaque option est suivie de la suite qu'elle déclenche et de la complicité gagnée *(complicité +N)* sur la jauge (plafonnée à 99 %). |
| 🎴 / 🎯 / 🔔 / 📲 | Textes d'interface : écran-titre, objectif affiché, message flottant, notification du téléphone. |
| ✅ **[RÉPLIQUE AUTHENTIQUE]** | Réplique **réellement prononcée** (dialogue validé). **Toute réplique sans cette mention est un dialogue imaginé pour le jeu.** |
| ⟨…⟩ | Effet visuel qui accompagne la réplique (ex. cœurs). |

**Répliques authentiques (5 au total)** : la phrase de Kezia à la vendeuse de literie (chapitre 4) et les 4 répliques du train (chapitre 5). Elles ne doivent pas être modifiées.

**Ordre de lecture** : l'ordre du jeu. Dans les niveaux d'exploration, certaines conversations sont **optionnelles ou dans un ordre libre** (c'est indiqué).

**Textes non repris ici** : libellés de boutons et de menus, invites d'interaction (« Parler à… »), options, compteurs de score — ce ne sont pas des dialogues. Les textes d'interface propres aux mini-jeux sont repris dans leur section.

## Sommaire

0. Prologue (écrans d'ouverture)
1. Chapitre 1 — The First Encounter
2. Chapitre 2 — The Afterparty
3. Chapitre 3 — The Group Chat
4. Chapitre 4 — The Paris Adventures
5. Chapitre 5 — The Train Conversation
6. Chapitre 6 — Growing Together
7. Chapitre 7 — The Paris Meetings
8. Chapitre 8 — Miles Apart
9. Chapitre final — À la conquête du cœur de Kezia
10. Annexe A — Générique de fin
11. Annexe B — Galerie des souvenirs (textes des fiches)
12. **Lettre finale (texte complet)**

---

## 0. Prologue (écrans d'ouverture du jeu)

> Affichés à la suite lorsqu'on lance « Commencer l'aventure ». Les balises HTML (`<br>`, `<span …>`) sont de la mise en forme, conservées telles quelles.

- 🎴 **Écran 1** : `Kezia,<br>ce jeu a été fabriqué rien que pour toi.`
- 🎴 **Écran 2** : `Tu vas guider Guillo, un garçon qui essaie — avec humour, créativité et sincérité — de conquérir ton cœur.<br><br>Mais ici, l’héroïne, c’est toi.`
- 🎴 **Écran 3** : `Les événements sont inspirés de votre histoire.<br>La plupart des répliques sont imaginées pour le jeu ; celles marquées <span style="color:#f4c25a;font-style:normal">❝ réplique authentique</span> ont vraiment été prononcées.`
- 🎴 **Écran 4** : `<span style="font-style:normal;font-size:.8em;line-height:2">🖥️ ← → marcher · Espace sauter · E parler · Échap pause<br>📱 boutons à l’écran · touche le texte pour avancer</span>`

---

## Chapitre 1 — The First Encounter

*13 septembre 2025*

*Répliques authentiques dans ce chapitre : aucune (les faits réels sont respectés, les répliques sont imaginées).*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 1
  - Titre : The First Encounter
  - Date : 13 septembre 2025
  - Phrase d'accroche : Une soirée networking NWAJA. Un organisateur très occupé. Et puis, elle.

#### 1.1 — Soirée NWAJA (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Accueille les invités de la soirée NWAJA
> Au début du niveau :

- 📖 **Narration** : Soirée networking NWAJA. Guillo est l’organisateur : micro, badges, sourires… tout est sous contrôle.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : smile)* : Tout est prêt. Rien ne peut me déstabiliser ce soir.
- 📖 **Narration** : (Spoiler : quelque chose va le déstabiliser.)

#### Conversations avec les invités (optionnelles, ordre libre)

**Avec l'invité·e « invite1 »**

- 💬 **Invité (invite1)** *(expression : smile)* : Super soirée ! Dis, tu pourrais me présenter quelqu’un qui investit dans… les chaussettes connectées ?
- 💬 **Guillo** *(expression : laugh)* : Je note. NWAJA, c’est des connexions, pas des miracles. Mais on ne sait jamais !

**Avec l'invité·e « invite3 »**

- 💬 **Invitée (invite3)** *(expression : smile)* : C’est toi qui as organisé tout ça ? Bravo, c’est super bien fait !
- 💬 **Guillo** *(expression : smile)* : Merci ! C’est le début d’une grande aventure.
- 💬 **Invitée (invite3)** *(expression : laugh)* : Par contre, tu regardes souvent vers le bar à jus… tu cherches quelqu’un ?
- 💭 **Guillo — pensée (dans sa tête)** *(expression : surprised)* : Ça se voit tant que ça ?!

**Avec l'invité·e « invite2 »**

- 💬 **Invitée (invite2)** *(expression : laugh)* : La playlist est parfaite ! Qui l’a choisie ?
- 💬 **Guillo** *(expression : smile)* : Moi. Enfin… un algorithme. Mais j’ai validé chaque morceau, c’est un travail d’équipe.

**Avec l'invité·e « invite4 »**

- 💬 **Invité (invite4)** *(expression : smile)* : Un conseil d’entrepreneur, gratuit : « Ose. » Toujours. Même quand ça fait peur.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Ose… Facile à dire.


#### Test du micro sur la scène (optionnel)

- 💬 **Guillo** *(expression : smile)* : Un, deux… un, deux. Bienvenue à toutes et à tous à la soirée NWAJA !
- 📖 **Narration** : Quelque part près du bar à jus, quelqu’un rit. Guillo ne sait pas encore qui.

#### Rencontre avec Kezia et Staecy (bar à jus) — nécessaire pour avancer

- 📖 **Narration** : Près du bar à jus, deux invitées discutent.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : surprised)* : Oh. Elle.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Respire, Guillo. Tu es l’organisateur. Tu as un badge. Tout va bien.
- 💬 **Guillo** *(expression : smile)* : Bonsoir ! Bienvenue à la soirée NWAJA. Je suis Guillo, l’organisateur. Ça se passe bien pour vous ?
- 💬 **Staecy** *(expression : smile)* : Super bien ! L’ambiance est top.
- 💬 **Kezia** *(expression : smile)* : Oui, c’est vraiment sympa. Il y a du monde !
- 💬 **Guillo** *(expression : smile)* : Ça fait plaisir. Et dites-moi, comment vous avez connu NWAJA ?
- 💬 **Kezia** *(expression : smile)* : C’est ma cousine qui m’en a parlé. Elle m’a dit qu’il fallait absolument que je vienne.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Guillo veut répondre quelque chose de brillant…*
  - **Option 1** : Ta cousine a un goût excellent. Remercie-la de ma part. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Je lui transmettrai… peut-être.
      - 💬 **Staecy** *(expression : tease)* : Oh, il est fort, lui.
  - **Option 2** : (Rester pro) Super ! Il y a des intervenants et des ateliers toute la soirée. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : Très pro. On sent le pitch bien rodé.
  - **Option 3** : Euh… c’est… NWAJA… cousine. Super. Voilà. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Staecy** *(expression : laugh)* : Il a buggé, non ?
      - 💬 **Kezia** *(expression : laugh)* : Je crois qu’il a buggé.
      - 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : J’ai buggé.
- 💬 **Guillo** *(expression : smile)* : En tout cas, je vous souhaite une excellente soirée. Profitez bien !
- 💬 **Kezia** *(expression : smile)* : Merci, toi aussi !
- 💭 **Guillo — pensée (dans sa tête)** *(expression : surprised)* : « Excellente soirée » ? C’est tout ? Je ne lui ai même pas demandé son prénom…
- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Elle m’intimide. Elle m’intimide vraiment.
- 🎯 **Objectif affiché à l'écran** : Direction l’afterparty → (porte au fond de la salle)

#### Si le joueur essaie de partir avant d'avoir salué les deux invitées

- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Je ne peux pas filer à l’afterparty sans avoir salué tout le monde… surtout les deux invitées près du bar à jus.

#### Après avoir ramassé les 3 étoiles secrètes (optionnel)

- 💭 **Guillo — pensée (dans sa tête)** *(expression : laugh)* : Les trois étoiles NWAJA ! Je les avais cachées en hauteur pour les plus curieux… et c’est moi qui les retrouve.

---

## Chapitre 2 — The Afterparty

*Le soir même · Bowling*

*Répliques authentiques dans ce chapitre : aucune.*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 2
  - Titre : The Afterparty
  - Date : Le soir même · Bowling
  - Phrase d'accroche : Il l’a vue. Il n’a pas osé. Mais il a un allié inattendu.

#### 2.1 — Afterparty au bowling (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Profite de l’afterparty
> ⚠️ Le texte ci-dessous est présent dans `ch2.js` (dialogues) mais **n'est pas joué actuellement** par le chapitre :

- 📖 **Narration** : Afterparty au bowling. Les quilles tombent, les rires montent, la musique est trop forte. Parfait.
> Déclenché en avançant dans le niveau :

- 💭 **Guillo — pensée (dans sa tête)** *(expression : surprised)* : Tiens… près de la piste 7. C’est elle.
- 🎯 **Objectif affiché à l'écran** : Kezia est près de la piste 7…

#### Aborder Kezia (au bord de la piste 7)

- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Elle joue… elle discute avec un garçon. Elle rit.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Que fait Guillo ?*
  - **Option 1** : Aller lui parler, avec assurance.
    - *Suite si cette option est choisie :*
      - 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Je fais un pas… et mes jambes décident que non. Pas ce soir.
  - **Option 2** : Lui faire un petit signe de loin.
    - *Suite si cette option est choisie :*
      - 📖 **Narration** : Elle ne le voit pas. Le petit signe reste suspendu dans le vide, comme un « coucou » orphelin.
      - 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : … Personne n’a rien vu. Parfait.
  - **Option 3** : Ne pas déranger. Observer, puis s’éloigner.
    - *Suite si cette option est choisie :*
      - 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Pas ce soir. Le courage est en maintenance.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Et je ne connais toujours pas son prénom…
- 🎯 **Objectif affiché à l'écran** : Rejoins le groupe de Staecy, plus loin

#### Parler au garçon (optionnel)

- 💬 **Un garçon** *(expression : smile)* : Salut ! Tu cherches une piste ?
- 💬 **Guillo** *(expression : smile)* : Non, non, tout va bien. Bonne partie !

#### Parler à Staecy (après avoir vu Kezia) — fait passer au mini-jeu

- 💬 **Staecy** *(expression : smile)* : Hé, l’organisateur ! Tu joues avec nous ? Il nous manque quelqu’un sur la piste d’à côté.
- 💬 **Guillo** *(expression : laugh)* : Avec plaisir ! Attention, je suis redoutable.
- 💬 **Staecy** *(expression : tease)* : On va vérifier ça tout de suite.

#### 2.2 — Mini-jeu : le bowling

> Pendant la partie, après chaque lancer, **une** des répliques de Staecy ci-dessous s'affiche au hasard (préfixe affiché : « Staecy : »).

- 🎯 **Objectif affiché à l'écran** : Bowling : appuie une fois pour viser, une seconde fois pour la puissance.
- 💬 **Staecy** — si **STRIKE (10 quilles)**, une au hasard parmi :
  - STRIKE ! Ok monsieur l’organisateur 😮
  - Attends… t’es pro en fait ?!
- 💬 **Staecy** — si **7 à 9 quilles**, une au hasard parmi :
  - Pas mal du tout !
  - Joli ! Kezia a même regardé 👀
- 💬 **Staecy** — si **1 à 6 quilles**, une au hasard parmi :
  - C’est… un début 😅
  - On applaudit l’effort !
- 💬 **Staecy** — si **0 quille**, une au hasard parmi :
  - Dans la rigole ! 😂
  - La boule a pris la sortie de secours.
- Textes d'interface du mini-jeu : titre « Afterparty · Piste 7 » · « Lancer ${this.frame + 1} / ${this.frames} — Vise ! » · « Puissance ! » · « STRIKE ! » · « Total : ${this.score} quilles »

#### 2.3 — Après la partie (avec Staecy)

> Selon le score total *(la valeur affichée remplace {score})*. Si le score est **supérieur ou égal à 18** :

- 💬 **Staecy** *(expression : surprised)* : {score} quilles ! Ok, tu ne mentais pas.
- 💬 **Guillo** *(expression : laugh)* : Je t’avais prévenue.
- 📖 **Narration** : Entre deux lancers, Guillo et Staecy sympathisent. Ils échangent leurs numéros.
> Si le score est **inférieur à 18**, les deux premières répliques sont remplacées par :

- 💬 **Staecy** *(expression : laugh)* : {score} quilles… « redoutable », hein ? 😂
- 💬 **Guillo** *(expression : laugh)* : La piste était penchée. C’est scientifique.
> Puis, dans les deux cas :

- 📖 **Narration** : Entre deux lancers, Guillo et Staecy sympathisent. Ils échangent leurs numéros.

#### 2.4 — « Quelques jours plus tard… » : l'appel à Staecy

- 🎴 **Écran de texte plein écran** :
  - Texte : Quelques jours plus tard…
- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Allez. J’appelle Staecy. Je lui dis tout. Direct.
> Bandeau d'appel affiché pendant la conversation : « Staecy · Appel ». Appel téléphonique :

- 💬 **Staecy** *(expression : smile)* : Allô ? Guillo ? Ça va ?
- 💬 **Guillo** *(expression : smile)* : Ça va ! Dis, Staecy… je vais être direct avec toi.
- 💬 **Guillo** *(expression : shy)* : Ton amie, au bowling… celle aux boucles magnifiques. Je ne connais même pas son prénom.
- 💬 **Staecy** *(expression : tease)* : Kezia. Elle s’appelle Kezia.
- 💬 **Guillo** *(expression : tender)* : Kezia…
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Bon. Il faut le dire.*
  - **Option 1** : Elle me plaît, Staecy. Vraiment. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Staecy** *(expression : smile)* : Ah ! Direct. J’aime bien.
  - **Option 2** : Elle m’intéresse… hypothétiquement… beaucoup. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Staecy** *(expression : laugh)* : Hypothétiquement, hein ? 😂 Ok, j’ai compris le message.
  - **Option 3** : J’appelle pour un ami. L’ami, c’est moi. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Staecy** *(expression : laugh)* : Le pire mensonge de l’histoire du téléphone.
- 💬 **Staecy** *(expression : thinking)* : Par contre, je ne sais pas vraiment si elle est célibataire…
- 💬 **Guillo** *(expression : surprised)* : Tu ne sais pas ? Vous n’êtes pas amies depuis longtemps ?
- 💬 **Staecy** *(expression : laugh)* : Pas du tout ! On s’est rencontrées à ton événement, le 13 septembre. Comme toi.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : smile)* : Donc ce soir-là, NWAJA a créé au moins une amitié. Peut-être plus, qui sait.
- 💬 **Staecy** *(expression : tease)* : Je ne promets rien. Mais je garde ça en tête. 😉

---

## Chapitre 3 — The Group Chat

*Les semaines suivantes*

*Répliques authentiques dans ce chapitre : aucune (messages réimaginés pour le jeu).*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 3
  - Titre : The Group Chat
  - Date : Les semaines suivantes
  - Phrase d'accroche : Trois personnes, un groupe, et des messages qui deviennent des appels.

#### 3.1 — Le groupe à trois (WhatsApp / messagerie de groupe)

- 📲 **Bandeau de notification du téléphone — de Staecy** : Staecy vous a ajouté au groupe « Team NWAJA ✨ »
- 📱 **CONVERSATION PAR MESSAGES** — titre affiché : **Team NWAJA ✨** · statut affiché : Kezia, Staecy, toi
  - Légende : 📥 message reçu · 📤 message envoyé par Guillo · ⚙️ ligne système · 🔀 choix de réponse
  - Mention affichée dans le jeu sous la conversation : Conversation réimaginée pour le jeu
  - ⚙️ *Système* : Staecy a créé le groupe « Team NWAJA ✨ »
  - ⚙️ *Système* : Staecy a ajouté Kezia et Guillo
  - 📥 **Staecy** *(reçu)* : Coucou Guillo ! C’est Staecy, du bowling 🎳
  - 📥 **Kezia** *(reçu)* : Hello ! On a adoré la soirée NWAJA. On se disait qu’on aimerait aider, si tu as besoin de monde 🙌
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : Sérieusement ? Vous tombez à pic : j’ai mille idées et seulement deux mains. *(complicité +2)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Parfait, on apporte quatre mains en plus 😄
    - **Option 2** (📤 envoyé par Guillo) : Bienvenue dans l’équipe ! Avantages : zéro salaire, mais énormément d’amour. *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Staecy** *(reçu)* : 😂 Vendu.
        - 📥 **Kezia** *(reçu)* : Au moins, le contrat est honnête.
  - 📥 **Kezia** *(reçu)* : Je peux aider sur la com et les réseaux, c’est un peu mon truc.
  - 📥 **Staecy** *(reçu)* : Et moi sur l’organisation des événements !
  - 📤 **Guillo** *(envoyé)* : Incroyable. Réunion d’équipe ce soir ? En appel ?
  - ⚙️ *Système* : 📞 Appel de groupe · 1 h 12
  - ⚙️ *Système* : — Les jours passent —
  - ⚙️ *Système* : 📞 Appel de groupe · 2 h 05
  - 📥 **Kezia** *(reçu)* : Bon. On a parlé de NWAJA 20 minutes… et de nos vies pendant 1 h 45 😂
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : C’est ça, le vrai networking. *(complicité +2)*
      - *(aucun message supplémentaire)*
    - **Option 2** (📤 envoyé par Guillo) : Je propose qu’on renomme le groupe « Thérapie NWAJA ». *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Staecy** *(reçu)* : Validé 😂
        - ⚙️ *Système* : Staecy a renommé le groupe « Thérapie NWAJA 🛋️ »
  - Bouton de fin affiché : Ranger le téléphone 📱

#### 3.2 — Transition

- 🎴 **Écran de texte plein écran** :
  - Texte : Les appels se multiplient. Puis, un soir, une conversation privée commence…

#### 3.3 — Messages privés entre Guillo et Kezia

- 📲 **Bandeau de notification du téléphone — de Kezia** : Kezia : Au fait…
- 📱 **CONVERSATION PAR MESSAGES** — titre affiché : **Kezia** · statut affiché : en ligne
  - Légende : 📥 message reçu · 📤 message envoyé par Guillo · ⚙️ ligne système · 🔀 choix de réponse
  - Mention affichée dans le jeu sous la conversation : Conversation réimaginée pour le jeu
  - 📥 **Kezia** *(reçu)* : Au fait, merci pour l’appel d’hier, j’ai bien rigolé 😄
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : Merci à toi. Ton rire, c’est le meilleur moment de ma journée. *(complicité +4)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Oh là là… il est en mode charmeur ce soir 😏
    - **Option 2** (📤 envoyé par Guillo) : Ton rire est plus efficace que mon café du matin. *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Donc je suis ton café ? Je prends ça comme un compliment ☕😂
    - **Option 3** (📤 envoyé par Guillo) : De rien. Je fais aussi les mariages et les anniversaires. *(complicité +2)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Note pour plus tard : engager Guillo comme animateur 😂
  - 📥 **Kezia** *(reçu)* : Je peux te poser une question ?
  - 📤 **Guillo** *(envoyé)* : Vas-y.
  - 📥 **Kezia** *(reçu)* : Le soir de l’événement, tu nous as dit bonjour, tu as été super poli… et après, plus rien. J’ai cru que tu nous avais oubliées 🙃
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : Oublier ? Impossible. Tu m’as tapé dans l’œil dès que je t’ai vue. *(complicité +4)*
      - *(aucun message supplémentaire)*
    - **Option 2** (📤 envoyé par Guillo) : La vérité ? Tu m’intéressais déjà. Mais je ne connaissais même pas ton prénom. *(complicité +4)*
      - *(aucun message supplémentaire)*
  - 📤 **Guillo** *(envoyé)* : Et pour être honnête… j’étais intimidé. Oui. Moi. L’organisateur avec un micro 😅
  - 📥 **Kezia** *(reçu)* : Intimidé ?? Toi ? Le monsieur qui parle devant cent personnes ? 😂
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : Cent personnes, c’est facile. Une seule personne, c’est une autre histoire. *(complicité +5)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Hmm… joli. Très joli. Je retiens 😌
    - **Option 2** (📤 envoyé par Guillo) : Parler au micro : oui. Te parler à toi : bug technique. *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Il faudra corriger ce bug alors 😏
  - 📥 **Kezia** *(reçu)* : En tout cas, je suis contente que Staecy ait créé ce groupe.
  - 📤 **Guillo** *(envoyé)* : Moi aussi. Je lui dois une fière chandelle 🕯️
  - Bouton de fin affiché : Ranger le téléphone 📱

#### 3.4 — Après la conversation

- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Elle a dit « joli ». Je vais m’en souvenir longtemps.

---

## Chapitre 4 — The Paris Adventures

*La Foire de Paris*

*Répliques authentiques dans ce chapitre : 1 — la phrase de Kezia à la vendeuse de literie (4.2).*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 4
  - Titre : The Paris Adventures
  - Date : La Foire de Paris
  - Phrase d'accroche : Un faux couple, un vrai fou rire, et une perle.

#### 4.1 — La Foire de Paris : le stand immobilier (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Visite la Foire de Paris avec Kezia
> Au début du niveau :

- 📖 **Narration** : La Foire de Paris. Des stands à perte de vue… et une idée un peu folle.
- 💬 **Kezia** *(expression : tease)* : Et si on faisait semblant d’être un couple qui cherche un appartement ?
- 💬 **Guillo** *(expression : surprised)* : Attends… sérieusement ?
- 💬 **Kezia** *(expression : laugh)* : Allez ! Ce sera drôle. Tu joues le jeu ?
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)**
  - **Option 1** : « Chérie, on y va ? » *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Oh non, il est déjà dans le rôle 😂
  - **Option 2** : Je suis né pour ce rôle. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : On verra bien, monsieur l’acteur.
- 🎯 **Objectif affiché à l'écran** : Stand « Appartements neufs » : joue le faux couple

#### Au stand immobilier : faux couple (agent immobilier)

- 💬 **Agent immobilier** *(expression : smile)* : Bonjour ! Vous cherchez votre premier appartement ensemble ?
- 💬 **Kezia** *(expression : smile)* : Oui ! On cherche quelque chose de… cosy.
- 💬 **Agent immobilier** *(expression : smile)* : Parfait. Combien de chambres ?
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Combien de chambres ?*
  - **Option 1** : Trois : une pour nous, une pour les enfants, une pour ses produits capillaires. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Il n’a pas tort, mes produits ont besoin d’espace 😂
      - 💬 **Agent immobilier** *(expression : laugh)* : C’est noté !
  - **Option 2** : Une seule. On est un couple très fusionnel. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : surprised)* : Chéri… calme-toi.
      - 💬 **Agent immobilier** *(expression : laugh)* : Ah, l’amour !
  - **Option 3** : C’est elle qui décide. Moi, je signe. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : Bonne réponse. Il apprend vite.
- 💬 **Agent immobilier** *(expression : smile)* : Et vous êtes ensemble depuis longtemps ?
- 💬 **Kezia** *(expression : tease)* : Oh… depuis… (elle se tourne vers Guillo)
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Vite, invente quelque chose !*
  - **Option 1** : Depuis le 13 septembre. Coup de foudre à une soirée networking. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : shy)* : … C’est presque crédible, en plus.
  - **Option 2** : Depuis toujours. Dans une autre vie, on était déjà voisins. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Agent immobilier** *(expression : surprised)* : Quelle histoire !
      - 💬 **Kezia** *(expression : laugh)* : Il est très… poétique.
- 💬 **Agent immobilier** *(expression : smile)* : Je vous laisse la brochure. Revenez quand vous voulez, les amoureux !
- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Faire semblant d’être son copain… c’est l’exercice le plus facile et le plus dangereux de ma vie.
- 🎯 **Objectif affiché à l'écran** : Stand « Literie & Rêves » : on teste le lit ?

#### À la vendeuse de literie (déclenche le test du lit)

- 💬 **Vendeuse literie** *(expression : smile)* : Bonjour ! Vous voulez essayer notre matelas vedette ? Allongez-vous, c’est fait pour ça !
- 💬 **Kezia** *(expression : laugh)* : Oh oui ! Viens, chéri, on teste.

#### Si le joueur essaie de quitter la Foire trop tôt

- 💬 **Kezia** *(expression : tease)* : On ne part pas déjà ! Il reste des stands à voir.

#### 4.2 — Le test du lit

- 💬 **Vendeuse literie** *(expression : smile)* : Alors ? Un vrai nuage, non ?
- 💬 **Guillo** *(expression : laugh)* : Oh. Wow. Je crois que je vais habiter ici.
- 💬 **Kezia** *(expression : smile)* : Il est trop bien… attendez, il coûte combien ?
- 💬 **Vendeuse literie** *(expression : smile)* : Pour un jeune couple comme vous, on a justement une offre spéciale !
- 💬 **Kezia** *(expression : tease)* ✅ **[RÉPLIQUE AUTHENTIQUE — prononcée réellement]** : Ce garçon dit qu'il veut me marier alors qu'il n'a même pas de bague !
- 💬 **Vendeuse literie** *(expression : laugh)* : Oh là là ! Monsieur, il va falloir assurer !
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Guillo doit se défendre !*
  - **Option 1** : La bague est en commande. Livraison… bientôt. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Bientôt ?! Il ose 😂
  - **Option 2** : Je voulais d’abord tester le lit. Chaque chose en son temps. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Vendeuse literie** *(expression : laugh)* : Il est pragmatique !
      - 💬 **Kezia** *(expression : laugh)* : Je suis choquée.
  - **Option 3** : Madame, je vous jure que je suis un homme sérieux. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : Sérieux… allongé sur un lit d’exposition. Très crédible.
- 📖 **Narration** : Ils rient tellement que deux visiteurs s’arrêtent pour les regarder.

#### 4.3 — Vers le stand des perles

- 🎯 **Objectif affiché à l'écran** : Stand « Perles & Coquillages »
- 💬 **Vendeuse de perles** *(expression : smile)* : Venez, venez ! Une perle se cache dans l’un de ces coquillages. Trouvez-la, et je vous la monte en collier !
- 💬 **Kezia** *(expression : surprised)* : Oh, c’est trop joli ! On essaie ?

#### 4.4 — Mini-jeu : la perle dans le coquillage

- 💬 **Vendeuse de perles** *(expression : smile)* : Regardez bien… la perle est ici. Je referme, je mélange… et à vous de jouer !
- 💬 **Kezia** *(expression : tease)* : Vas-y, Guillo. Montre-moi ton talent.
- 💬 **Guillo** *(expression : smile)* : Concentration maximale. Les yeux sur la perle.
- 🎯 **Objectif affiché à l'écran** : Choisis un coquillage ! (← → puis Espace, ou touche-le)
> Le joueur choisit un coquillage, et la perle est trouvée **du premier coup** (fait réel). Puis :

- 💬 **Vendeuse de perles** *(expression : surprised)* : Du premier coup ?! Je n’ai jamais vu ça !
- 💬 **Kezia** *(expression : surprised)* : Attends… QUOI ?! Du premier coup ?!
- 💬 **Guillo** *(expression : laugh)* : Je t’avais dit : concentration maximale.
- 💬 **Kezia** *(expression : laugh)* : Non mais tu triches, c’est pas possible !
- 💬 **Guillo** *(expression : smile)* : Madame, je vais vous prendre le collier, s’il vous plaît.
- 💬 **Kezia** *(expression : surprised)* : … Pour moi ?
- 💬 **Guillo** *(expression : tender)* : Bien sûr que c’est pour toi.
- 💬 **Kezia** *(expression : shy)* : Il est magnifique… merci. ⟨5 cœurs apparaissent⟩

#### 4.5 — Le collier à la perle (cinématique)

> Quatre lignes affichées l'une après l'autre sur l'illustration du coquillage (rejouables depuis la galerie des souvenirs) :

- ✨ **Ligne 1** : Une perle, cachée dans un coquillage.
- ✨ **Ligne 2** : Trouvée du premier coup.
- ✨ **Ligne 3** : Kezia n’en revient pas.
- ✨ **Ligne 4** : Un collier, rien que pour elle. ✦

#### 4.6 — Après la cinématique

- 💭 **Guillo — pensée (dans sa tête)** *(expression : tender)* : Elle n’arrête pas de le toucher du bout des doigts. Mission accomplie.

---

## Chapitre 5 — The Train Conversation

*Le retour de la Foire*

*Répliques authentiques dans ce chapitre : 4 — l'intégralité du dialogue du train (5.2).*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 5
  - Titre : The Train Conversation
  - Date : Le retour de la Foire
  - Phrase d'accroche : Face à face, la vérité, avec douceur.

#### 5.1 — Avant la conversation

- 📖 **Narration** : Après cette belle journée, le train du retour. Face à face.
- 💬 **Kezia** *(expression : smile)* : Merci pour aujourd’hui. Vraiment.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Le paysage défile…*
  - **Option 1** : Lui sourire. *(complicité +1)*
    - *Suite si cette option est choisie :*
      - 📖 **Narration** : Elle lui rend son sourire. Puis son regard se pose sur la fenêtre.
  - **Option 2** : Regarder le coucher de soleil avec elle. *(complicité +1)*
    - *Suite si cette option est choisie :*
      - 📖 **Narration** : Le ciel devient orange, puis rose. Un silence confortable s’installe.
- 📖 **Narration** : Puis Kezia reprend, plus doucement.

#### 5.2 — Le dialogue du train (RÉPLIQUES AUTHENTIQUES — à conserver exactement)

- 💬 **Kezia** *(expression : thinking)* ✅ **[RÉPLIQUE AUTHENTIQUE — prononcée réellement]** : Tu sais, en ce moment, je préfère vraiment me concentrer sur moi-même et sur mes projets.
- 💬 **Guillo** *(expression : neutral)* ✅ **[RÉPLIQUE AUTHENTIQUE — prononcée réellement]** : Ah oui, je comprends.
- 💬 **Kezia** *(expression : tender)* ✅ **[RÉPLIQUE AUTHENTIQUE — prononcée réellement]** : J'aime bien passer du temps avec toi, mais je ne me vois pas forcément me remettre en couple maintenant. Je sors d'une relation qui a duré un certain temps et j'ai besoin de penser à moi.
- 💬 **Guillo** *(expression : tender)* ✅ **[RÉPLIQUE AUTHENTIQUE — prononcée réellement]** : Je comprends totalement. Je ne vais pas te mettre la pression. De mon côté, je ne suis pas encore dans une situation totalement stable non plus. Mais je veux que tu saches une chose : tu m'intéresses vraiment. Je ne suis pas pressé, je ne veux pas te mettre la pression. Ça prendra le temps que ça prendra.

#### 5.3 — Après la conversation

- 📖 **Narration** : Pas de promesse. Pas de pression. Juste deux personnes qui se comprennent, pendant que le train file vers Paris.
- 🎴 **Écran de texte plein écran** :
  - Texte : « Ça prendra le temps que ça prendra. »

---

## Chapitre 6 — Growing Together

*Après la Foire*

*Répliques authentiques dans ce chapitre : aucune.*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 6
  - Titre : Growing Together
  - Date : Après la Foire
  - Phrase d'accroche : Ses boucles, leur podcast, une équipe qui naît.
- 🎴 **Écran de texte plein écran** :
  - Texte : Après la Foire, les conversations continuent. Et les projets grandissent.

#### 6.1 — Le studio NWAJA (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Va voir Kezia près de la ring light

#### Avec Kezia, près de la ring light

- 💬 **Kezia** *(expression : smile)* : Regarde ! Ma ring light est arrivée. Je lance enfin mon contenu sur les cheveux afro.
- 💬 **Guillo** *(expression : smile)* : Enfin ! Tu en parles depuis des semaines. Raconte, c’est quoi le concept ?
- 💬 **Kezia** *(expression : smile)* : Des routines, des astuces, des coiffures… Montrer que nos cheveux naturels sont magnifiques et qu’on peut en prendre soin simplement.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Le conseil de Guillo :*
  - **Option 1** : Commence avant d’être parfaite. La régularité bat la perfection. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : thinking)* : C’est vrai… ça fait trop longtemps que je repousse.
  - **Option 2** : Montre les coulisses : les ratés, les essais. Les gens adorent le vrai. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Les ratés du wash day… j’en ai une collection 😂
  - **Option 3** : Je peux t’aider pour la stratégie et le montage, si tu veux. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : smile)* : Tu ferais ça ? Deal !
- 💬 **Kezia** *(expression : tease)* : Et toi, tu ne veux pas passer devant la caméra ? Tes waves mériteraient un tuto.
- 💬 **Guillo** *(expression : laugh)* : Mes waves sont un secret industriel.
- 💬 **Kezia** *(expression : laugh)* : Pff. Bon, et le podcast NWAJA, il avance ?
- 💬 **Guillo** *(expression : smile)* : Justement ! Aide-moi à installer le matériel : le micro, le casque et la lampe. Ils sont… quelque part sur les étagères.
- 🎯 **Objectif affiché à l'écran** : Matériel du podcast : ${gear} / 3

#### Si le joueur essaie d'installer le studio sans avoir tout le matériel

- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Il me manque encore du matériel. Les étagères, peut-être… en sautant.

#### S'il n'a pas encore parlé à Kezia

- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Je devrais d’abord passer voir Kezia.

#### Une fois les 3 objets (casque, micro, lampe) ramassés

- 💭 **Guillo — pensée (dans sa tête)** *(expression : smile)* : Micro, casque, lampe : tout est là. Direction le bureau pour installer le studio.
- 🎯 **Objectif affiché à l'écran** : Installe le studio au bureau

#### 6.2 — Le premier podcast test

- 💬 **Kezia** *(expression : smile)* : Bon. On fait un premier podcast test ?
- 💬 **Staecy** *(expression : smile)* : Je m’occupe du chrono !
- 💬 **Guillo** *(expression : smile)* : Silence… on enregistre.

**Mini-jeu « Podcast » — textes de l'interface et des répliques à lancer :**

- Titre : 🎙️ Podcast test — enregistrement
- Consigne : Appuie (Espace / toucher) quand le curseur passe dans la zone verte pour lancer chaque réplique au bon moment.
- Message de départ : Prêts ? 3, 2, 1… on enregistre.
- **Réplique 1** (affichée au joueur) : Kezia : « Bienvenue dans le tout premier épisode test ! »
  - Retour affiché si réussie (précédé de « ✅ ») : Intro parfaite. On entend même le sourire.
- **Réplique 2** (affichée au joueur) : Guillo : « NWAJA, c’est des rencontres qui créent des projets. »
  - Retour affiché si réussie (précédé de « ✅ ») : Pitch envoyé sans bafouiller. Un miracle.
- **Réplique 3** (affichée au joueur) : Kezia : « Et toi, ton meilleur conseil pour entreprendre ? »
  - Retour affiché si réussie (précédé de « ✅ ») : Réponse inspirante. L’équipe hoche la tête.
- **Réplique 4** (affichée au joueur) : Guillo : « …commencer avant d’être prêt. »
  - Retour affiché si réussie (précédé de « ✅ ») : Kezia lève le pouce 👍
- **Réplique 5** (affichée au joueur) : Les deux : « Merci de nous avoir écoutés ! »
  - Retour affiché si réussie (précédé de « ✅ ») : C’est dans la boîte ! 🎙️
- Retour affiché en cas de raté (un des trois, selon le nombre d'essais) :
  - Oups, trop tôt ! On refait la prise.
  - Coupez ! Prise numéro… on ne compte plus.
  - Presque ! L’ingé son soupire.

#### Après l'enregistrement

> Si le joueur a réussi **au moins 4 prises du premier coup** :

- 💬 **Kezia** *(expression : laugh)* : On est trop forts ! On dirait des pros.
> Sinon, la première réplique est :

- 💬 **Kezia** *(expression : smile)* : Pour un premier test, c’est vraiment pas mal !
> Puis, dans les deux cas :

- 💬 **Guillo** *(expression : smile)* : Il nous faut une vraie équipe : quelqu’un au son, au montage, aux réseaux…
- 💬 **Staecy** *(expression : tease)* : Et quelqu’un pour empêcher Guillo de faire des blagues pendant l’enregistrement.
- 📖 **Narration** : Sur le tableau blanc, l’équipe du podcast commence à prendre forme.

#### 6.3 — Les coulisses d'un événement NWAJA

- 📖 **Narration** : Quelques semaines plus tard : les coulisses d’un événement NWAJA.
- 💬 **Kezia** *(expression : surprised)* : Donc c’est ça, l’envers du décor ? Des câbles, des badges, et toi qui cours partout.
- 💬 **Guillo** *(expression : laugh)* : Bienvenue dans ma vie.
- 💬 **Kezia** *(expression : smile)* : J’ai testé l’application, au fait. J’ai des retours.
- 💬 **Guillo** *(expression : smile)* : Vas-y, je t’écoute.
- 💬 **Kezia** *(expression : thinking)* : L’inscription est un peu longue. Et le bouton principal… on ne le voit pas.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Guillo réagit :*
  - **Option 1** : Merci, c’est précieux. On corrige ça. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : smile)* : Voilà. Un fondateur qui écoute. J’aime.
  - **Option 2** : Comment ça, on ne le voit pas ? Il est… discret. C’est un choix artistique. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : Un choix artistique… que personne ne trouve 😂
      - 💬 **Guillo** *(expression : shy)* : … D’accord. On corrige ça.
- 💬 **Kezia** *(expression : smile)* : Et mets plus de photos des événements. Ça donne envie de venir.
- 💬 **Guillo** *(expression : smile)* : Note prise, directrice produit.
- 💬 **Kezia** *(expression : laugh)* : Directrice produit ! J’accepte le titre.

---

## Chapitre 7 — The Paris Meetings

*De retour à Paris*

*Répliques authentiques dans ce chapitre : aucune.*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 7
  - Titre : The Paris Meetings
  - Date : De retour à Paris
  - Phrase d'accroche : Une sortie à trois… qui se fait à deux.
- 🎴 **Écran de texte plein écran** :
  - Texte : Après un mois en Irlande, Guillo est de retour à Paris. Une sortie à trois est prévue…

#### 7.1 — Paris la nuit (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Rejoins Kezia et Staecy au restaurant
> En avançant dans le niveau, Guillo reçoit une notification :

- 📲 **Bandeau de notification du téléphone — de Staecy** : Je ne vais pas pouvoir venir finalement 🙈 Amusez-vous bien tous les deux !
- 💭 **Guillo — pensée (dans sa tête)** *(expression : surprised)* : « Tous les deux »… Donc c’est un rendez-vous à deux.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : Calme-toi, Guillo. Respire. Tu as survécu au bowling.
- 🎯 **Objectif affiché à l'écran** : Rejoins Kezia devant le restaurant

#### Devant le restaurant, avec Kezia

- 💬 **Kezia** *(expression : smile)* : Staecy t’a prévenu ? Elle nous lâche !
- 💬 **Guillo** *(expression : laugh)* : Oui… quelle tragédie.
- 💬 **Kezia** *(expression : tease)* : Tu n’as pas l’air très triste.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)**
  - **Option 1** : Je suis dévasté. Intérieurement. Tout au fond. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Ça se voit à peine 😂
  - **Option 2** : Avec toi, c’est déjà une bonne soirée. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : shy)* : … Bon. On entre ?

#### 7.2 — Le dîner à deux (restaurant africain — nom volontairement non mentionné)

- 💬 **Serveur** *(expression : smile)* : Bonsoir ! Une table pour deux ?
- 💬 **Guillo** *(expression : smile)* : Pour deux, oui.
- 💬 **Kezia** *(expression : smile)* : Alors, raconte. C’est quoi la suite pour toi ? Les projets, la vie…
- 💬 **Guillo** *(expression : smile)* : Finir mon diplôme d’ingénieur. Faire grandir NWAJA. Et un jour…
- 💬 **Kezia** *(expression : tease)* : Et un jour… ?
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Guillo imagine son avenir :*
  - **Option 1** : Une fiancée géniale, une petite famille, et une maison pleine de rires. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : smile)* : C’est mignon. Très « film du dimanche soir », mais mignon.
  - **Option 2** : Une femme ambitieuse, avec ses propres projets… et des cheveux magnifiques. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tease)* : Tu décris quelqu’un en particulier, là ? 😏
      - 💬 **Guillo** *(expression : shy)* : Moi ? Non. Pas du tout. Totalement au hasard.
  - **Option 3** : Trois enfants : une qui code, un qui entreprend, et un qui fait des podcasts. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Tu as déjà fait le planning de toute la famille ?!
- 💬 **Kezia** *(expression : laugh)* : Tu as vraiment tout prévu, toi !
- 💬 **Guillo** *(expression : laugh)* : J’ai même prévu le nom du chien.
- 💬 **Kezia** *(expression : laugh)* : Non… ne me dis pas.
- 💬 **Guillo** *(expression : smile)* : Wave. Comme mes cheveux.
- 📖 **Narration** : Ils rient tellement que le serveur repasse trois fois avant d’oser prendre la commande.

#### 7.3 — Une autre sortie, puis l'invitation de Kezia (messages privés)

- 🎴 **Écran de texte plein écran** :
  - Texte : Ils se revoient ensuite lors d’une autre sortie. Puis, un soir, le téléphone vibre…
- 📲 **Bandeau de notification du téléphone — de Kezia** : Kezia : Dis… ça te dit ?
- 📱 **CONVERSATION PAR MESSAGES** — titre affiché : **Kezia** · statut affiché : en ligne
  - Légende : 📥 message reçu · 📤 message envoyé par Guillo · ⚙️ ligne système · 🔀 choix de réponse
  - Mention affichée dans le jeu sous la conversation : Conversation réimaginée pour le jeu
  - 📥 **Kezia** *(reçu)* : Dis… ça te dit, un restaurant africain ? J’en connais un super bon.
  - 📥 **Kezia** *(reçu)* : Et cette fois, c’est moi qui t’invite 😌
  - 🔀 **CHOIX DE RÉPONSE (le joueur choisit le message envoyé par Guillo)**
    - **Option 1** (📤 envoyé par Guillo) : Kezia qui m’invite ? Je note la date dans l’histoire. *(complicité +4)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Note bien, c’est rare 😂
    - **Option 2** (📤 envoyé par Guillo) : Avec grand plaisir ! Je viens avec mon plus bel appétit. *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : Parfait, il y aura de quoi 😋
    - **Option 3** (📤 envoyé par Guillo) : Attends… c’est un rendez-vous ? *(complicité +3)*
      - *Suite si cette option est choisie :*
        - 📥 **Kezia** *(reçu)* : C’est un restaurant. Avec toi. Interprète comme tu veux 😏
  - Bouton de fin affiché : Ranger le téléphone 📱

#### Après la conversation

- 💭 **Guillo — pensée (dans sa tête)** *(expression : smile)* : C’est elle qui a proposé. C’est elle qui invite.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : shy)* : … Je souris tout seul devant mon téléphone. C’est grave, docteur ?

---

## Chapitre 8 — Miles Apart

*Irlande, puis Malaisie*

*Répliques authentiques dans ce chapitre : aucune.*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre 8
  - Titre : Miles Apart
  - Date : Irlande, puis Malaisie
  - Phrase d'accroche : La distance change les horaires. Pas les appels.

#### 8.1 — L'Irlande (un mois)

- 🎴 **Écran de texte plein écran** :
  - Titre : Puis vient le temps des départs.
  - Texte : `Un mois en Irlande.<br>Puis six mois en Malaisie.`
> Appel affiché sous la forme du bandeau « Kezia · Appel · Irlande ↔ Paris » :

- 💬 **Kezia** *(expression : smile)* : Alors, l’Irlande ? Il pleut ?
- 💬 **Guillo** *(expression : laugh)* : Il pleut à l’horizontale. Je ne savais même pas que c’était possible.
- 💬 **Kezia** *(expression : laugh)* : Prends un thé et pense à moi, bien au chaud à Paris 😌
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)**
  - **Option 1** : Je pense déjà à toi. Le thé, c’est en option. *(complicité +3)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : shy)* : Il est fort, même sous la pluie.
  - **Option 2** : Envoie-moi un peu de soleil parisien, s’il te plaît. *(complicité +2)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : laugh)* : Je t’envoie une photo du ciel gris. Solidarité.

#### 8.2 — La Malaisie (six mois) : les toits de Kuala Lumpur (niveau d'exploration)

- 🎴 **Écran de texte plein écran** :
  - Texte : `Six mois en Malaisie.<br>Sept heures de décalage.`
- 🎯 **Objectif affiché à l'écran** : Messages vocaux écoutés : 0 / 5
- 💭 **Guillo — pensée (dans sa tête)** *(expression : smile)* : Kuala Lumpur, la nuit. Des messages vocaux de Kezia m’attendent… quelque part sur les toits.
> Sur les toits, le joueur ramasse 5 messages vocaux de Kezia. Chaque message ramassé affiche le texte suivant (dans l'ordre ci-dessous, pour les 5) précédé de « 🎧 Kezia : » :

- 🔔 **Message vocal 1** : 🎧 Kezia : « Bonne chance pour ton partiel, tu vas tout déchirer ! »
- 🔔 **Message vocal 2** : 🎧 Kezia : « Ma vidéo sur les cheveux afro a cartonné ! »
- 🔔 **Message vocal 3** : 🎧 Kezia : « Le podcast avance, l’équipe est motivée ! »
- 🔔 **Message vocal 4** : 🎧 Kezia : « Tu as mangé ? Mange. »
- 🔔 **Message vocal 5** : 🎧 Kezia : « Appelle-moi quand tu peux 🌙 »
- 🎯 **Objectif affiché à l'écran** : Messages vocaux écoutés : ${notes} / 5
- 🎯 **Objectif affiché à l'écran** : Tous les messages sont écoutés ! Va au bout du toit pour appeler Kezia

#### Si le joueur essaie d'appeler avant d'avoir tout écouté

- 💭 **Guillo — pensée (dans sa tête)** *(expression : thinking)* : Il me reste des messages vocaux à écouter. Ils sont sur les toits.

#### 8.3 — Mini-jeu : « Le bon créneau » (décalage horaire Kuala Lumpur ↔ Paris)

- Titre : Le bon créneau
- Consigne : Kuala Lumpur et Paris : 7 heures d’écart. Trouve l’heure où Guillo et Kezia peuvent s’appeler.
- Étiquettes : 🇲🇾 Kuala Lumpur · Guillo / 🇫🇷 Paris · Kezia · ✅ disponible / ⛔ indisponible · légende : libre, tard mais possible, occupé, sommeil · bouton : 📞 Appeler Kezia
- Messages affichés selon l'heure choisie — **Guillo (heures à Kuala Lumpur)** :
  - *(0 h–2 h)* [disponible] Il devrait dormir… mais pour Kezia, il veille.
  - *(3 h–6 h)* [indisponible] Guillo dort profondément. Même l’amour ne le réveille pas à cette heure-là.
  - *(7 h)* [indisponible] Il vient de se réveiller et cherche encore ses lunettes… euh, son âme.
  - *(8 h–17 h)* [indisponible] En cours d’ingénierie. Le professeur ne trouverait pas ça romantique.
  - *(18 h–23 h)* [disponible] Libre ! Guillo est disponible.
- Messages affichés selon l'heure choisie — **Kezia (heures à Paris)** :
  - *(0 h–6 h)* [indisponible] Kezia dort. On ne réveille pas une reine.
  - *(7 h–8 h, 18 h–23 h)* [disponible] Kezia est disponible.
  - *(9 h–17 h)* [indisponible] Kezia est concentrée sur ses projets. Respect.
- Message quand le créneau est bon : 💚 <b>Créneau trouvé !</b>  puis, si Guillo veille tard (0 h–2 h à Kuala Lumpur) : Guillo sacrifie un peu de sommeil. Romantique, mais cerné.

#### 8.4 — L'appel Kuala Lumpur ↔ Paris

> Bandeau d'appel affiché : « Kezia · Appel · Kuala Lumpur ↔ Paris ».

- 💬 **Kezia** *(expression : smile)* : Allô ? Il est quelle heure chez toi ?
- 💬 **Guillo** *(expression : laugh)* : Une heure du matin. Mais pour toi, je suis frais comme un croissant.
- 💬 **Kezia** *(expression : laugh)* : Menteur. Tu as une tête de zombie.
- 💬 **Guillo** *(expression : smile)* : Raconte-moi ta journée. Tes projets, ta vidéo, tout.
- 💬 **Kezia** *(expression : smile)* : J’ai bossé toute la journée sur mon contenu, et j’ai plein d’idées pour le podcast. Et toi, tes études ?
- 💬 **Guillo** *(expression : smile)* : Les cours d’ingénieur sont intenses, mais j’avance. Et savoir que toi aussi tu avances, ça me motive.
- 🔀 **CHOIX POUR LE JOUEUR (réponse de Guillo)** — intitulé affiché : *Avant de raccrocher :*
  - **Option 1** : Je suis fier de toi, tu sais. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : shy)* : Merci… Moi aussi, je suis fière de toi.
  - **Option 2** : Même à 10 000 km, tu restes ma personne préférée à appeler. *(complicité +4)*
    - *Suite si cette option est choisie :*
      - 💬 **Kezia** *(expression : tender)* : Va dormir, monsieur le charmeur 🌙
- 📖 **Narration** : Ils continuent à s’appeler, à se soutenir. La distance change les horaires, pas l’envie de se parler.

---

## Chapitre final — À la conquête du cœur de Kezia

*Maintenant*

*Répliques authentiques dans ce chapitre : aucune. Conclusion volontairement ouverte (aucune déclaration réciproque ni relation officielle imposée).*

- 🎴 **Écran-titre du chapitre** :
  - Surtitre : Chapitre final
  - Titre : À la conquête du cœur de Kezia
  - Date : Maintenant
  - Phrase d'accroche : Tous les souvenirs mènent ici.

#### F.1 — Le chemin des souvenirs (niveau d'exploration)

- 🎯 **Objectif affiché à l'écran** : Suis le chemin des souvenirs
- 📖 **Narration** : Un chemin de lumière. Des souvenirs qui flottent dans la nuit.
- 💭 **Guillo — pensée (dans sa tête)** *(expression : tender)* : Tous nos souvenirs mènent ici.
> Sur le chemin, 8 orbes de souvenirs. Chacune, une fois touchée, affiche une **pensée de Guillo** (dans l'ordre du chemin) :

- 💭 **Guillo — pensée** *(orbe 1, objet : badge_nwaja, expression : tender)* : Le 13 septembre. Je ne connaissais même pas ton prénom.
- 💭 **Guillo — pensée** *(orbe 2, objet : quille, expression : tender)* : Le bowling. Je n’ai pas osé. Heureusement, Staecy a décroché.
- 💭 **Guillo — pensée** *(orbe 3, objet : telephone, expression : tender)* : Le groupe à trois. Les appels qui duraient des heures.
- 💭 **Guillo — pensée** *(orbe 4, objet : ticket_foire, expression : tender)* : La Foire de Paris. Notre faux appartement. Nos vrais fous rires.
- 💭 **Guillo — pensée** *(orbe 5, objet : collier, expression : tender)* : Le collier. Une perle trouvée du premier coup. Certains appellent ça de la chance.
- 💭 **Guillo — pensée** *(orbe 6, objet : billet_train, expression : tender)* : « Ça prendra le temps que ça prendra. » Je le pensais. Je le pense toujours.
- 💭 **Guillo — pensée** *(orbe 7, objet : micro, expression : tender)* : NWAJA, le podcast, tes vidéos. Te voir grandir, c’est mon spectacle préféré.
- 💭 **Guillo — pensée** *(orbe 8, objet : avion, expression : tender)* : L’Irlande, la Malaisie, le décalage horaire. Les appels ont continué.

#### F.2 — Rejoindre Kezia au pied de l'arbre aux lanternes

- 💬 **Kezia** *(expression : smile)* : Alors c’est ça, ton jeu ? Tous nos souvenirs ?
- 💬 **Guillo** *(expression : smile)* : Tous. Enfin… presque. J’en garde quelques-uns pour la suite.
- 💬 **Kezia** *(expression : tease)* : Et c’est quoi, le but du jeu ? « Conquérir mon cœur » ?
- 💬 **Guillo** *(expression : laugh)* : C’est écrit dans le titre, oui. Je ne suis pas très subtil.
- 💬 **Kezia** *(expression : laugh)* : Pas du tout, non.
> Jauge de complicité — `{n}` est remplacé par la valeur réelle de la jauge du joueur (au maximum 99) :

- 📖 **Narration** : Jauge de complicité : {n} %.
- 💬 **Guillo** *(expression : tender)* : Tu vois cette jauge ? Elle ne dépassera jamais 99 %.
- 💬 **Kezia** *(expression : surprised)* : Pourquoi ?
- 💬 **Guillo** *(expression : tender)* : Parce que le dernier pourcent ne se gagne pas. Il se donne. Et ça, c’est toi qui décides. Quand tu veux. Si tu veux.
- 💬 **Kezia** *(expression : shy)* : …
- 💬 **Guillo** *(expression : smile)* : Mais avant, j’ai encore une chose à te montrer.

#### F.3 — Mini-jeu : la constellation des souvenirs

- Texte affiché : Tous nos souvenirs, rallumés un par un.
- Consigne affichée : Maintiens la perle appuyée (ou la touche Espace)

#### F.4 — La lettre

- 📜 **Lettre de Guillo** : le texte complet est reproduit **à la fin de ce document** (section « Lettre finale »).
- Bouton affiché à la fin de la lettre : Refermer la lettre

#### F.5 — Le choix de Kezia

- 📖 **Narration** : Cette fois, ce n’est pas Guillo qui choisit la réponse. C’est toi, Kezia.
- 🔀 **CHOIX PROPOSÉ À KEZIA** — intitulé affiché : *Que réponds-tu à Guillo ?*
  - **Option 1** : On verra bien… 😏
    - *Suite si cette option est choisie :*
      - 💬 **Guillo** *(expression : laugh)* : « On verra bien. » Venant de toi, c’est déjà une super réponse.
  - **Option 2** : Continue de m’impressionner.
    - *Suite si cette option est choisie :*
      - 💬 **Guillo** *(expression : smile)* : Défi accepté. J’ai encore plein de niveaux en réserve.
  - **Option 3** : On en parle de vive voix.
    - *Suite si cette option est choisie :*
      - 💬 **Guillo** *(expression : tender)* : Avec plaisir. Je t’appelle… peu importe le décalage horaire.
  - **Option 4** : C’est trop mignon, merci pour ce jeu.
    - *Suite si cette option est choisie :*
      - 💬 **Guillo** *(expression : shy)* : Merci à toi d’avoir joué jusqu’au bout. Ça me touche vraiment.
- 💬 **Kezia** *(expression : tender)* : … ⟨3 cœurs apparaissent⟩
- 📖 **Narration** : Le dernier pourcent reste en suspens. Comme une promesse qui n’oblige personne.

#### F.6 — Écran de fin

- 🎴 **Écran de texte plein écran** :
  - Titre : À suivre…
  - Texte : Ça prendra le temps que ça prendra.

---

## Annexe A — Générique de fin

> Affiché après l'écran « À suivre… » ; chaque entrée = rôle (petit texte) puis nom.

- **Titre** : À la conquête du cœur de Kezia
- **Une idée, une envie et beaucoup de cœur** → Guillo
- **Héroïne** → Kezia
- **Entremetteuse (involontaire ?)** → Staecy
- **Là où tout a commencé** → Soirée networking NWAJA · 13 septembre 2025
- **Musique, illustrations et bruitages** → Créés spécialement pour ce jeu
- **Merci d’avoir joué** → ✦ À suivre… ✦
- Bouton : Retour au menu

---

## Annexe B — Galerie des souvenirs (fiches affichées dans le menu)

> 19 souvenirs. Titre et texte tels qu'ils s'affichent quand le souvenir est débloqué. Les citations entre « » à l'intérieur de ces fiches sont celles du texte du jeu.

- **Badge NWAJA** *(Chapitre 1 · identifiant : badge)*
  - Texte : 13 septembre 2025. Une soirée networking, deux invitées près du bar à jus… et un organisateur qui a soudain oublié comment on fait une phrase.
- **Les trois étoiles NWAJA** *(Chapitre 1 · souvenir secret · identifiant : etoiles)*
  - Texte : Cachées en hauteur, comme les ambitions de NWAJA. Il fallait sauter pour les attraper.
- **La quille du bowling** *(Chapitre 2 · identifiant : quille)*
  - Texte : Le soir où il n'a pas osé l'aborder. Heureusement, Staecy avait un téléphone.
- **Strike !** *(Chapitre 2 · souvenir secret · identifiant : strike)*
  - Texte : Toutes les quilles d’un coup. Si seulement le courage se jouait au bowling.
- **Le groupe à trois** *(Chapitre 3 · identifiant : groupe)*
  - Texte : Au début, c’était pour NWAJA. Puis les messages sont devenus des appels, et les appels sont devenus longs.
- **La Foire de Paris** *(Chapitre 4 · identifiant : ticket)*
  - Texte : Deux entrées, un faux couple très convaincant et une journée qui restera.
- **Les clés du faux appart** *(Chapitre 4 · identifiant : cle)*
  - Texte : Un appartement visité « pour nous ». Le vendeur y a cru. Nous aussi, un peu.
- **Le test du lit** *(Chapitre 4 · identifiant : coussin)*
  - Texte : « Ce garçon dit qu’il veut me marier alors qu’il n’a même pas de bague ! » — Kezia, à la vendeuse.
- **La brochure « notre futur appart »** *(Chapitre 4 · souvenir secret · identifiant : brochure)*
  - Texte : Ramassée en douce au stand immobilier. Pour l’inspiration, évidemment.
- **Le collier à la perle** *(Chapitre 4 · objet unique · identifiant : collier)*
  - Texte : Un coquillage, une perle, trouvée du premier coup. Un collier pour Kezia. Objet unique.
- **Le train du retour** *(Chapitre 5 · identifiant : billet)*
  - Texte : « Ça prendra le temps que ça prendra. »
- **La ring light** *(Chapitre 6 · identifiant : ringlight)*
  - Texte : Le projet de Kezia autour des cheveux afro. Les boucles méritent la meilleure lumière.
- **Le premier podcast test** *(Chapitre 6 · identifiant : micro)*
  - Texte : Un micro, un casque, une lampe et une équipe qui commence à prendre forme.
- **Le rendez-vous surprise** *(Chapitre 7 · identifiant : assiette)*
  - Texte : Une sortie prévue à trois… qui s’est faite à deux. On a parlé d’avenir et on a beaucoup ri.
- **L’invitation de Kezia** *(Chapitre 7 · identifiant : invitation)*
  - Texte : Cette fois, c’est elle qui a proposé : un restaurant africain, et c’est elle qui invitait.
- **Un mois en Irlande** *(Chapitre 8 · identifiant : tasse)*
  - Texte : Du vent, de la pluie, et des appels pour réchauffer.
- **Six mois en Malaisie** *(Chapitre 8 · identifiant : avion)*
  - Texte : Sept heures de décalage. Les appels ont continué quand même.
- **Les appels longue distance** *(Chapitre 8 · identifiant : appel)*
  - Texte : Elle développe ses projets, il avance dans ses études d’ingénieur. Et chacun soutient l’autre.
- **Le dernier pourcent** *(Chapitre final · identifiant : dernier)*
  - Texte : Il ne se gagne pas. Il se donne. Et ça prendra le temps que ça prendra.

---

## Lettre finale (texte complet)

*Écrite au nom de Guillo — affichée sur un papier à lettre au chapitre final (étape F.4). Tout ce qui suit est le texte exact, paragraphe par paragraphe.*

Kezia,

Depuis le 13 septembre 2025, il y a eu une soirée NWAJA, un bowling où je n’ai pas osé, un groupe à trois, des appels qui n’en finissaient pas, une Foire de Paris où l’on a joué les faux amoureux… et une perle trouvée du premier coup.

Dans le train, tu m’as dit que tu voulais te concentrer sur toi et sur tes projets. Je l’ai entendu, et je le respecte. Ce jeu n’est pas là pour te mettre la pression.

C’est juste ma façon de te dire, avec un peu d’humour et beaucoup de sincérité, que tu comptes. Que j’aime te voir rire, te voir créer, te voir avancer.

Je ne sais pas encore comment s’écrira la suite. Mais quelle qu’elle soit, je suis heureux que tu sois l’héroïne de cette histoire.

*Guillo — à ton rythme. Ça prendra le temps que ça prendra.*
