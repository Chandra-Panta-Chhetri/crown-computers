const NUM_ITEM_NAME_CHAR_SHOWN = 20;

export const truncate = (str, numCharacterToShow = NUM_ITEM_NAME_CHAR_SHOWN) =>
  str.length > numCharacterToShow
    ? str.substr(0, numCharacterToShow - 1) + "..."
    : str;

export const roundPrice = (price) => Math.round(price * 100) / 100;

export const capitalize = (str) => {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word[0].toUpperCase() + word.slice(1);
  }
  return words.join(" ");
};

export const getLastElementInArray = (arr) => arr[arr.length - 1];
