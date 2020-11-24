const KILO_BYTES_PER_BYTE = 1024;

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

export const convertBytesToKiloBytes = (bytes) =>
  Math.round(bytes / KILO_BYTES_PER_BYTE);

export const isVariableDefined = (variable) => typeof variable !== "undefined";

export const addUniqueItemsToCollection = (
  collection,
  newCollectionItems,
  uniqueFieldName
) => {
  for (let collectionItem of newCollectionItems) {
    if (
      !collection.some(
        (c) => c[uniqueFieldName] === collectionItem[uniqueFieldName]
      )
    ) {
      collection.push(collectionItem);
    }
  }
  return [...collection];
};

export const removeObjFromArrOfObjects = (
  uniqueFieldName,
  uniqueFieldValue,
  arrOfObjects,
  errorMsgToThrow
) => {
  const indexOfObjectToDelete = arrOfObjects.findIndex(
    (obj) => obj[uniqueFieldName] === uniqueFieldValue
  );
  if (indexOfObjectToDelete === -1) {
    throw Error(errorMsgToThrow);
  }
  arrOfObjects.splice(indexOfObjectToDelete, 1);
  return [...arrOfObjects];
};

export const updateObjInArrOfObjects = (
  uniqueFieldName,
  uniqueFieldValue,
  arrOfObjects,
  errorMsgToThrow,
  updatedObj
) => {
  const indexOfObjToUpdate = arrOfObjects.findIndex(
    (obj) => obj[uniqueFieldName] === uniqueFieldValue
  );
  if (indexOfObjToUpdate === -1) {
    throw Error(errorMsgToThrow);
  }
  arrOfObjects[indexOfObjToUpdate] = {
    ...arrOfObjects[indexOfObjToUpdate],
    ...updatedObj
  };
  return [...arrOfObjects];
};
