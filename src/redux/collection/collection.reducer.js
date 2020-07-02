import PRODUCT_DATA from "./productsData";

const INITIAL_STATE = {
  productCollection: PRODUCT_DATA
};

const collectionReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return prevState;
  }
};

export default collectionReducer;
