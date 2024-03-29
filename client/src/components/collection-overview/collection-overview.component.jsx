import React, { useEffect } from "react";

import ProductCollection from "../product-collection/product-collection.component";

import {
  selectIsFetchingProducts,
  selectHasMoreProductsToFetch
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "../../redux/product/product.actions";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const CollectionOverview = ({
  fetchInitialProducts,
  fetchMoreProducts,
  isFetchingProducts,
  hasMoreProductsToFetch
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProducts,
    isFetchingProducts,
    hasMoreProductsToFetch
  );

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  return (
    <ProductCollection
      intersectionCb={fetchMoreOnIntersection}
      isFetchingProducts={isFetchingProducts}
    />
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreProductsToFetch: selectHasMoreProductsToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
