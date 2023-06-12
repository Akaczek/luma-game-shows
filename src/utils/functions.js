export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const extractNumber = (value) => {
  const number = value.match(/\d+/g).join('');
  console.log(number);
  return [number.slice(0, 1), number.slice(1)];
};