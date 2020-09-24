import React, { useEffect } from "react";

import ProductCollection from "../product-collection/product-collection.component";

import {
  selectIsFetchingProducts,
  selectHasMoreToFetch
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
  hasMoreToFetch
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProducts,
    isFetchingProducts,
    hasMoreToFetch
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
  hasMoreToFetch: selectHasMoreToFetch
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
