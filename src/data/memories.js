// La galerie des souvenirs. `icon` = fichier de public/assets/objects/.
// `secret: true` = objet caché dans un niveau. `unique: true` = objet central (le collier).

export const MEMORIES = [
  { id: 'badge', chapter: 1, icon: 'badge_nwaja', title: 'Badge NWAJA', text: "13 septembre 2025. Une soirée networking, deux invitées près du bar à jus… et un organisateur qui a soudain oublié comment on fait une phrase." },
  { id: 'etoiles', chapter: 1, icon: 'etoile', secret: true, title: 'Les trois étoiles NWAJA', text: 'Cachées en hauteur, comme les ambitions de NWAJA. Il fallait sauter pour les attraper.' },
  { id: 'quille', chapter: 2, icon: 'quille', title: 'La quille du bowling', text: "Le soir où il n'a pas osé l'aborder. Heureusement, Staecy avait un téléphone." },
  { id: 'strike', chapter: 2, icon: 'boule', secret: true, title: 'Strike !', text: 'Toutes les quilles d’un coup. Si seulement le courage se jouait au bowling.' },
  { id: 'groupe', chapter: 3, icon: 'telephone', title: 'Le groupe à trois', text: 'Au début, c’était pour NWAJA. Puis les messages sont devenus des appels, et les appels sont devenus longs.' },
  { id: 'ticket', chapter: 4, icon: 'ticket_foire', title: 'La Foire de Paris', text: 'Deux entrées, un faux couple très convaincant et une journée qui restera.' },
  { id: 'cle', chapter: 4, icon: 'cle', title: 'Les clés du faux appart', text: 'Un appartement visité « pour nous ». Le vendeur y a cru. Nous aussi, un peu.' },
  { id: 'coussin', chapter: 4, icon: 'coussin', title: 'Le test du lit', text: '« Ce garçon dit qu’il veut me marier alors qu’il n’a même pas de bague ! » — Kezia, à la vendeuse.' },
  { id: 'brochure', chapter: 4, icon: 'brochure', secret: true, title: 'La brochure « notre futur appart »', text: 'Ramassée en douce au stand immobilier. Pour l’inspiration, évidemment.' },
  { id: 'collier', chapter: 4, icon: 'collier', unique: true, title: 'Le collier à la perle', text: 'Un coquillage, une perle, trouvée du premier coup. Un collier pour Kezia. Objet unique.' },
  { id: 'billet', chapter: 5, icon: 'billet_train', title: 'Le train du retour', text: '« Ça prendra le temps que ça prendra. »' },
  { id: 'ringlight', chapter: 6, icon: 'ringlight', title: 'La ring light', text: 'Le projet de Kezia autour des cheveux afro. Les boucles méritent la meilleure lumière.' },
  { id: 'micro', chapter: 6, icon: 'micro', title: 'Le premier podcast test', text: 'Un micro, un casque, une lampe et une équipe qui commence à prendre forme.' },
  { id: 'assiette', chapter: 7, icon: 'assiette', title: 'Le rendez-vous surprise', text: 'Une sortie prévue à trois… qui s’est faite à deux. On a parlé d’avenir et on a beaucoup ri.' },
  { id: 'invitation', chapter: 7, icon: 'lettre', title: 'L’invitation de Kezia', text: 'Cette fois, c’est elle qui a proposé : un restaurant africain, et c’est elle qui invitait.' },
  { id: 'tasse', chapter: 8, icon: 'tasse', title: 'Un mois en Irlande', text: 'Du vent, de la pluie, et des appels pour réchauffer.' },
  { id: 'avion', chapter: 8, icon: 'avion', title: 'Six mois en Malaisie', text: 'Sept heures de décalage. Les appels ont continué quand même.' },
  { id: 'appel', chapter: 8, icon: 'appel', title: 'Les appels longue distance', text: 'Elle développe ses projets, il avance dans ses études d’ingénieur. Et chacun soutient l’autre.' },
  { id: 'dernier', chapter: 9, icon: 'coeur', title: 'Le dernier pourcent', text: 'Il ne se gagne pas. Il se donne. Et ça prendra le temps que ça prendra.' },
];

export const memoryById = Object.fromEntries(MEMORIES.map((m) => [m.id, m]));
