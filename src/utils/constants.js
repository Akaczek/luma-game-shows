export const questionsTypes = [
  { value: 'Pytanie zamknięte', isOpen: false, isImage: false, isMusic: false },
  { value: 'Pytanie otwarte', isOpen: true, isImage: false, isMusic: false },
  {
    value: 'Pytanie zamknięte ze zdjęciem',
    isOpen: false,
    isImage: true,
    isMusic: false,
  },
  {
    value: 'Pytanie otwarte ze zdjęciem',
    isOpen: true,
    isImage: true,
    isMusic: false,
  },
  {
    value: 'Pytanie otwarte z muzyką',
    isOpen: true,
    isImage: false,
    isMusic: true,
  },
];
