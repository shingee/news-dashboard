const getRandomArrayKeys = (amount, arrayLength) => {
  const keys = [];

  for (let n = 0; n < amount; n++) {
    keys.push(Math.floor(Math.random() * arrayLength));
  }

  return keys;
};

export default getRandomArrayKeys;
