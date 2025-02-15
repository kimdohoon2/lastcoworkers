const getRandomId = () => {
  let keyValue = '';
  const characters =
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const keyLength = 16;

  for (let i = 0; i < keyLength; i += 1) {
    const idx = Math.floor(Math.random() * characters.length);
    keyValue += characters[idx];
  }

  return keyValue;
};

export default getRandomId;
