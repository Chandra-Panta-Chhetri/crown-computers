import React from "react";
import { ProductCollectionContainer } from "./product-collection.styles";

import CollectionItem from "../collection-item/collection-item.component";
import CollectionItemSkeleton from "../collection-item-skeleton/collection-item-skeleton.component";

import {
  selectProductCollection,
  selectProductsPerPage
} from "../../redux/product/product.selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const ProductCollection = ({
  products,
  isFetchingProducts,
  intersectionCb,
  productsPerPage
}) => (
  <ProductCollectionContainer>
    {products.map((product, index) => (
      <CollectionItem
        key={product.productId}
        item={product}
        intersectionCb={
          products.length === index + 1 ? intersectionCb : undefined
        }
      />
    ))}
    {isFetchingProducts &&
      Array(productsPerPage)
        .fill()
        .map((item, index) => <CollectionItemSkeleton key={index} />)}
  </ProductCollectionContainer>
);

const mapStateToProps = createStructuredSelector({
  products: selectProductCollection,
  productsPerPage: selectProductsPerPage
});

export default connect(mapStateToProps)(ProductCollection);
