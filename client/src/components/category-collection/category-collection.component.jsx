import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  selectIsFetchingProducts,
  selectProductCollection,
  selectHasMoreToFetch,
  selectProductsPerPage
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetchByCategory,
  startLoadingMoreProductsByCategory
} from "../../redux/product/product.actions";
import { connect } from "react-redux";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { createStructuredSelector } from "reselect";

const CategoryCollection = ({
  productsInCategory,
  fetchProductsInCategory,
  fetchMoreProductsInCategory,
  isFetchingProducts,
  hasMoreToFetch,
  productsPerPage,
  match
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProductsInCategory,
    [],
    isFetchingProducts,
    hasMoreToFetch
  );

  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase);
  }, [fetchProductsInCategory, categoryNameInLowerCase]);

  return (
    <>
      {productsInCategory.map((product, index) => (
        <CollectionItem
          key={product.productId}
          item={product}
          intersectionCb={
            productsInCategory.length === index + 1
              ? fetchMoreOnIntersection
              : undefined
          }
        />
      ))}
      {isFetchingProducts &&
        Array(productsPerPage)
          .fill()
          .map((item, index) => (
            <CollectionItem key={index} isLoading={true} />
          ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  productsInCategory: selectProductCollection,
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreToFetch,
  productsPerPage: selectProductsPerPage
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName)),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
