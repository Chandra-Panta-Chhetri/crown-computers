const NUM_ITEM_NAME_CHAR_SHOWN = 20;

export const truncate = (str, numCharacterToShow = NUM_ITEM_NAME_CHAR_SHOWN) =>
  str.length > numCharacterToShow
    ? str.substr(0, numCharacterToShow - 1) + "..."
    : str;

export const roundPrice = (price) => Math.round(price * 100) / 100;
