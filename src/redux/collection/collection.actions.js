import COLLECTION_ACTION_TYPES from "./collection.action.types";

export const setProductCollection = (productCollection) => ({
  type: COLLECTION_ACTION_TYPES.SET_PRODUCT_COLLECTION,
  payload: productCollection
});
