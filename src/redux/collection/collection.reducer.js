import COLLECTION_ACTION_TYPES from "./collection.action.types";

const INITIAL_STATE = {
  productCollection: {}
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case COLLECTION_ACTION_TYPES.SET_PRODUCT_COLLECTION:
      return {
        ...prevState,
        productCollection: action.payload
      };
    default:
      return prevState;
  }
};

export default collectionReducer;
