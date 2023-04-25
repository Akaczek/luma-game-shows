export const questionsTypes = [
  {
    value: 'Pytanie zamknięte',
    isOpen: false,
    isMusic: false,
    collection: 'quiz_question',
  },
  {
    value: 'Pytanie otwarte',
    isOpen: true,
    isMusic: false,
    collection: 'open_question',
  },
  {
    value: 'Pytanie otwarte z muzyką',
    isOpen: true,
    isMusic: true,
    collection: 'music_question',
  },
];

export const collections = {
  quiz: 'quiz_question',
  open: 'open_question',
  music: 'music_question',
};
