import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";
import CollectionItemSkeleton from "../collection-item-skeleton/collection-item-skeleton.component";

import {
  selectIsFetchingProducts,
  selectProductCollection,
  selectHasMoreToFetch,
  selectProductsPerPage
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "../../redux/product/product.actions";
import { connect } from "react-redux";
import usePaginationOnIntersection from "../../hooks/usePaginationOnIntersection.hook";
import { createStructuredSelector } from "reselect";

const CollectionOverview = ({
  products,
  fetchInitialProducts,
  fetchMoreProducts,
  isFetchingProducts,
  hasMoreToFetch,
  productsPerPage
}) => {
  const fetchMoreOnIntersection = usePaginationOnIntersection(
    fetchMoreProducts,
    [],
    isFetchingProducts,
    hasMoreToFetch
  );

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  return (
    <>
      {products.map((product, index) => (
        <CollectionItem
          key={product.productId}
          item={product}
          intersectionCb={
            products.length === index + 1 ? fetchMoreOnIntersection : undefined
          }
        />
      ))}
      {isFetchingProducts &&
        Array(productsPerPage)
          .fill()
          .map((item, index) => <CollectionItemSkeleton key={index} />)}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectProductCollection,
  isFetchingProducts: selectIsFetchingProducts,
  hasMoreToFetch: selectHasMoreToFetch,
  productsPerPage: selectProductsPerPage
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
