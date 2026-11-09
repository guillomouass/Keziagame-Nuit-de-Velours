import * as D from '../dialogues/ch5.js';

export default {
  id: 'ch5',
  short: '5',
  num: 'Chapitre 5',
  title: 'The Train Conversation',
  date: 'Le retour de la Foire',
  tagline: 'Face à face, la vérité, avec douceur.',
  music: 'tender',
  steps: [
    async (G) => {
      await G.train();
      await G.wait(1200);
      await G.say(D.before);
      await G.say(D.TRAIN_DIALOGUE);
      G.complicity(5);
      await G.say(D.after);
      await G.memory('billet');
      await G.card({ text: '« Ça prendra le temps que ça prendra. »', hold: 3500 });
    },
  ],
};
