import React, { useEffect } from "react";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startFetchProductById } from "../../redux/product/product.actions";
import {
  selectIsFetchingProducts,
  selectProductData
} from "../../redux/product/product.selectors";

const ProductDetail = ({
  product,
  match,
  isFetchingProduct,
  fetchProductById
}) => {
  const { imageUrl, name, price, stock, category } = product;

  useEffect(() => {
    fetchProductById(match.params.productId);
  }, [fetchProductById, match]);

  return (
    <section>
      <p>{name}</p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  product: selectProductData(state),
  isFetchingProduct: selectIsFetchingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductById: (id) => dispatch(startFetchProductById(id))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetail);
