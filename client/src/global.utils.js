export const truncate = (str, maxStrLength = 20) =>
  str.length > maxStrLength ? str.substr(0, maxStrLength - 1) + "..." : str;

export const roundNumber = (num) => Math.round(num * 100) / 100;

export const capitalize = (str) => {
  const words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    words[i] = word[0].toUpperCase() + word.slice(1);
  }
  return words.join(" ");
};

export const getLastElementInArray = (arr) => arr[arr.length - 1];

export const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

export const addToCollection = (
  collection,
  newCollectionItems,
  uniqueField
) => {
  for (let collectionItem of newCollectionItems) {
    if (
      !collection.some((c) => c[uniqueField] === collectionItem[uniqueField])
    ) {
      collection.push(collectionItem);
    }
  }
  return [...collection];
};
