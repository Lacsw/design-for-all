function getRandom(min, max) {
  const number = Math.floor(Math.random() * (max - min + 1) + min);
  return number;
}

export default getRandom;