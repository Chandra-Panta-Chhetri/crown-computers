import DIRECTORY_ITEMS from "./directoryItems";

const INITIAL_STATE = {
  productCategories: DIRECTORY_ITEMS
};

const directoryReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return prevState;
  }
};

export default directoryReducer;
