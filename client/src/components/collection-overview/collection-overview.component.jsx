import React, { useEffect } from "react";

import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";

import { connect } from "react-redux";
import {
  selectProductCollection,
  selectIsFetchingProducts
} from "../../redux/product/product.selectors";
import { startProductsFetch } from "../../redux/product/product.actions";

const loadingText = "Getting latest products";

const CollectionOverview = ({
  products,
  fetchProducts,
  isFetchingProducts
}) => {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      {isFetchingProducts ? (
        <Spinner loadingText={loadingText} />
      ) : (
        products.map((product) => (
          <CollectionItem key={product.productId} item={product} />
        ))
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  products: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(startProductsFetch())
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionOverview);
