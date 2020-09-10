import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  selectIsFetchingProducts,
  selectProductCollection,
  selectIsFetchingMoreProducts,
  selectHasMoreToLoad,
  selectProductsPerPage
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetchByCategory,
  startLoadingMoreProductsByCategory
} from "../../redux/product/product.actions";
import { connect } from "react-redux";
import useVisibility from "../../hooks/useVisibility.hook";

const CategoryCollection = ({
  productsInCategory,
  match,
  isFetchingProducts,
  fetchProductsInCategory,
  isFetchingMoreProducts,
  hasMoreToLoad,
  fetchMoreProductsInCategory,
  productsPerPage
}) => {
  const skeletonCollectionItems = [];
  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  const lastElementRefCB = useVisibility(
    { threshold: 0.9 },
    fetchMoreProductsInCategory,
    [categoryNameInLowerCase],
    isFetchingMoreProducts || isFetchingProducts,
    hasMoreToLoad
  );

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase);
  }, [fetchProductsInCategory, categoryNameInLowerCase]);

  if (isFetchingProducts || isFetchingMoreProducts) {
    for (let i = 0; i < productsPerPage; i++) {
      skeletonCollectionItems.push(<CollectionItem key={i} isLoading={true} />);
    }
  }

  return (
    <>
      {productsInCategory.map((product, index) => (
        <CollectionItem
          key={product.productId}
          item={product}
          lastElementCB={
            productsInCategory.length === index + 1
              ? lastElementRefCB
              : undefined
          }
        />
      ))}
      {skeletonCollectionItems}
    </>
  );
};

const mapStateToProps = (state) => ({
  productsInCategory: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  isFetchingMoreProducts: selectIsFetchingMoreProducts(state),
  hasMoreToLoad: selectHasMoreToLoad(state),
  productsPerPage: selectProductsPerPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName)),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
