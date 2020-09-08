import React from "react";

import CollectionItem from "../collection-item/collection-item.component";
import Spinner from "../spinner/spinner.component";

import {
  selectIsFetchingProducts,
  selectProductCollection
} from "../../redux/product/product.selectors";
import { startInitialProductsFetchByCategory } from "../../redux/product/product.actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { useEffect } from "react";

const CategoryCollection = ({
  productsInCategory,
  match,
  isFetchingProducts,
  fetchProductsInCategory
}) => {
  const categoryNameInLowerCase = decodeURI(
    match.params.productCategory
  ).toLowerCase();

  useEffect(() => {
    fetchProductsInCategory(categoryNameInLowerCase);
  }, [fetchProductsInCategory, match, categoryNameInLowerCase]);

  const loadingText = `Getting latest ${categoryNameInLowerCase} products`;

  return (
    <>
      {isFetchingProducts ? (
        <Spinner loadingText={loadingText} />
      ) : (
        productsInCategory.map((product) => (
          <CollectionItem key={product.productId} item={product} />
        ))
      )}
      {!productsInCategory.length && !isFetchingProducts ? (
        <Redirect to="/shop" />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  productsInCategory: selectProductCollection(state),
  isFetchingProducts: selectIsFetchingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCollection);
