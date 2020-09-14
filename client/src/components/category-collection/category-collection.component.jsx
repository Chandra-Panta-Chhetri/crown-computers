import React, { useEffect } from "react";

import ProductCollection from "../product-collection/product-collection.component";
import { Redirect } from "react-router-dom";

import {
  selectIsFetchingProducts,
  selectHasMoreToFetch,
  selectProductCollection
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
  match,
  products
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
    <>
      {!isFetchingProducts && !products.length ? <Redirect to="/" /> : null}
      <ProductCollection
        intersectionCb={fetchMoreOnIntersection}
        isFetchingProducts={isFetchingProducts}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreToFetch,
  products: selectProductCollection
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName)),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
