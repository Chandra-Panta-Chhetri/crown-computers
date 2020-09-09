import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";

import {
  selectIsFetchingProducts,
  selectProductCollection,
  selectIsFetchingMoreProducts,
  selectHasMoreToLoad
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
  fetchMoreProductsInCategory
}) => {
  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  const lastElementRefCB = useVisibility(
    { threshold: 1.0 },
    fetchMoreProductsInCategory,
    [categoryNameInLowerCase],
    isFetchingMoreProducts || isFetchingProducts,
    hasMoreToLoad
  );

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase);
  }, [fetchProductsInCategory, categoryNameInLowerCase]);

  const loadingText = `Getting latest ${categoryNameInLowerCase} products`;

  return (
    <>
      {isFetchingProducts ? (
        <Spinner loadingText={loadingText} />
      ) : (
        productsInCategory.map((product, index) => (
          <CollectionItem
            key={product.productId}
            item={product}
            lastElementCB={
              productsInCategory.length === index + 1
                ? lastElementRefCB
                : undefined
            }
          />
        ))
      )}
      {isFetchingMoreProducts ? (
        <Spinner
          loadingText={`Getting more ${categoryNameInLowerCase} products`}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  productsInCategory: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  isFetchingMoreProducts: selectIsFetchingMoreProducts(state),
  hasMoreToLoad: selectHasMoreToLoad(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName)),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
