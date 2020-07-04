import { createSelector } from "reselect";

const MAP_ROUTE_TO_ID = {
  monitors: 1,
  laptops: 2,
  "storage-devices": 3,
  "internal-drives": 4,
  desktops: 5,
  "keyboards-mice": 6
};

export const selectCollection = (state) => state.collection;

export const selectProductCollection = createSelector(
  [selectCollection],
  (collection) => collection.productCollection
);

export const selectCategoryCollection = (route) =>
  createSelector([selectProductCollection], (productCollection) =>
    productCollection.find((category) => category.id === MAP_ROUTE_TO_ID[route])
  );
