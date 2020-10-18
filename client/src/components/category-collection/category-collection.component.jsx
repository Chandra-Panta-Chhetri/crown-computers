import React from "react";

import ProductCollection from "../product-collection/product-collection.component";

import {
  selectIsFetchingProducts,
  selectHasMoreProductsToFetch
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetchByCategory,
  startLoadingMoreProductsByCategory
} from "../../redux/product/product.actions";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import useRedirect from "../../hooks/useRedirect.hook";
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

  const { redirectComponent } = useRedirect(fetchProductsInCategory, [
    categoryNameInLowerCase
  ]);

  const fetchMoreOnIntersection = usePaginationOnIntersection(
    () => {
      fetchMoreProductsInCategory(categoryNameInLowerCase);
    },
    isFetchingProducts,
    hasMoreToFetch
  );

  return (
    <>
      {redirectComponent}
      <ProductCollection
        intersectionCb={fetchMoreOnIntersection}
        isFetchingProducts={isFetchingProducts}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreProductsToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName, onNoProductsFound) =>
    dispatch(
      startInitialProductsFetchByCategory(categoryName, onNoProductsFound)
    ),
  fetchMoreProductsInCategory: (categoryName) =>
    dispatch(startLoadingMoreProductsByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
