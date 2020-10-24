export const removeCategory = (categoryId, productCategories) => {
  const indexOfCategoryToDelete = productCategories.findIndex(
    (category) => category.categoryId === categoryId
  );
  if (indexOfCategoryToDelete === -1) {
    throw Error(`Category with id ${categoryId} does not exist`);
  }
  productCategories.splice(indexOfCategoryToDelete, 1);
  return [...productCategories];
};
