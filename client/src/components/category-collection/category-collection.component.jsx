import React, { useEffect } from "react";

import ProductCollection from "../product-collection/product-collection.component";

import {
  selectIsFetchingProducts,
  selectHasMoreToFetch
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetchByCategory,
  startLoadingMoreProductsByCategory
} from "../../redux/product/product.actions";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const CategoryCollection = ({
  fetchProductsInCategory,
  fetchMoreProductsInCategory,
  isFetchingProducts,
  hasMoreToFetch,
  match
}) => {
  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProductsInCategory,
    [categoryNameInLowerCase],
    isFetchingProducts,
    hasMoreToFetch
  );

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase);
  }, [fetchProductsInCategory, categoryNameInLowerCase]);

  return (
    <ProductCollection
      intersectionCb={fetchMoreOnIntersection}
      isFetchingProducts={isFetchingProducts}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName)),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
