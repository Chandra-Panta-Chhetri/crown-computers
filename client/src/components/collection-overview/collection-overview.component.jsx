import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import {
  selectProductCollection,
  selectIsFetchingProducts,
  selectIsFetchingMoreProducts,
  selectHasMoreToLoad
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "../../redux/product/product.actions";
import useVisibility from "../../hooks/useVisibility.hook";

const loadingTextForInitialFetch = "Getting latest products";
const loadingTextForMoreProductsFetch = "Getting more products";

const CollectionOverview = ({
  products,
  fetchInitialProducts,
  isFetchingProducts,
  isFetchingMoreProducts,
  fetchMoreProducts,
  hasMoreToLoad
}) => {
  const lastElementRefCB = useVisibility(
    { threshold: 1.0 },
    fetchMoreProducts,
    [],
    isFetchingMoreProducts || isFetchingProducts,
    hasMoreToLoad
  );

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  return (
    <>
      {isFetchingProducts ? (
        <Spinner loadingText={loadingTextForInitialFetch} />
      ) : (
        products.map((product, index) => (
          <CollectionItem
            key={product.productId}
            item={product}
            lastElementCB={
              products.length === index + 1 ? lastElementRefCB : undefined
            }
          />
        ))
      )}
      {isFetchingMoreProducts ? (
        <Spinner loadingText={loadingTextForMoreProductsFetch} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  products: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  isFetchingMoreProducts: selectIsFetchingMoreProducts(state),
  hasMoreToLoad: selectHasMoreToLoad(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
