import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";

import { connect } from "react-redux";
import {
  selectProductCollection,
  selectIsFetchingProducts,
  selectHasMoreToLoad,
  selectProductsPerPage
} from "../../redux/product/product.selectors";
import {
  startInitialProductsFetch,
  startLoadingMoreProducts
} from "../../redux/product/product.actions";
import useVisibility from "../../hooks/useVisibility.hook";

const CollectionOverview = ({
  products,
  fetchInitialProducts,
  isFetchingProducts,
  fetchMoreProducts,
  hasMoreToLoad,
  productsPerPage
}) => {
  const skeletonCollectionItems = [];
  const lastElementRefCB = useVisibility(
    { threshold: 0.9 },
    fetchMoreProducts,
    [],
    isFetchingProducts,
    hasMoreToLoad
  );

  useEffect(() => {
    fetchInitialProducts();
  }, [fetchInitialProducts]);

  if (isFetchingProducts) {
    for (let i = 0; i < productsPerPage; i++) {
      skeletonCollectionItems.push(<CollectionItem key={i} isLoading={true} />);
    }
  }

  return (
    <>
      {products.map((product, index) => (
        <CollectionItem
          key={product.productId}
          item={product}
          lastElementCB={
            products.length === index + 1 ? lastElementRefCB : undefined
          }
        />
      ))}
      {skeletonCollectionItems}
    </>
  );
};

const mapStateToProps = (state) => ({
  products: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state),
  hasMoreToLoad: selectHasMoreToLoad(state),
  productsPerPage: selectProductsPerPage(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialProducts: () => dispatch(startInitialProductsFetch()),
  fetchMoreProducts: () => dispatch(startLoadingMoreProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
