export const createAnswerLetters = (quantity) => {
  switch (quantity) {
    case 2:
      return ['A', 'B', 'empty', 'empty'];
    case 3:
      return ['A', 'B', 'C', 'empty'];
    case 4:
      return ['A', 'B', 'C', 'D'];
  }
};

export const calculateAnswerHeight = (quantity) => {
  if (quantity <= 2) return true;
  return false;
};
