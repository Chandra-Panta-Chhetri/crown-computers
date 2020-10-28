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

export const updateCategory = (
  categoryId,
  updatedCategoryInfo,
  productCategories
) => {
  const indexOfCategoryToUpdate = productCategories.findIndex(
    (category) => category.categoryId === categoryId
  );
  if (indexOfCategoryToUpdate === -1) {
    throw Error(`Category with id ${categoryId} does not exist`);
  }
  productCategories[indexOfCategoryToUpdate] = {
    ...productCategories[indexOfCategoryToUpdate],
    ...updatedCategoryInfo
  };
  return [...productCategories];
};

export const addNewCategories = (productCategories, newCategories) => {
  for (let productCategory of newCategories) {
    if (
      !productCategories.some(
        (pc) => pc.categoryId === productCategory.categoryId
      )
    ) {
      productCategories.push(productCategory);
    }
  }
  return [...productCategories];
};
