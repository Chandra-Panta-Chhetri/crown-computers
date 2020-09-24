import React, { useEffect, useState } from "react";

import ProductCollection from "../product-collection/product-collection.component";
import { Redirect } from "react-router-dom";

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
  const [redirectUser, setRedirectUser] = useState(false);
  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  const fetchMoreOnIntersection = usePaginationOnIntersection(
    () => {
      fetchMoreProductsInCategory(categoryNameInLowerCase);
    },
    isFetchingProducts,
    hasMoreToFetch
  );

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase, () => {
      setRedirectUser(true);
    });
  }, [fetchProductsInCategory, categoryNameInLowerCase]);

  return (
    <>
      {redirectUser && <Redirect to="/" />}
      <ProductCollection
        intersectionCb={fetchMoreOnIntersection}
        isFetchingProducts={isFetchingProducts}
      />
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreToFetch
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
