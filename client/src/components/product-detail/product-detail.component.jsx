import React, { useEffect } from "react";
import {
  ProductDetailContainer,
  ProductImage,
  ProductInfoContainer,
  TabContainer,
  Tab,
  ProductSummaryContainer,
  SummaryItemLabel,
  SummaryItemValue,
  ProductPrice,
  ProductActionContainer,
  AddProductToCartBtn,
  ProductCategory,
  ProductName
} from "./product-detail.styles";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startFetchProductById } from "../../redux/product/product.actions";
import {
  selectIsFetchingProducts,
  selectProductData
} from "../../redux/product/product.selectors";
import { addToCart } from "../../redux/cart/cart.actions";

const ProductDetail = ({
  product,
  match,
  history,
  isFetchingProduct,
  fetchProductById,
  addItemToCart
}) => {
  const { imageUrl, name, price, stock, category } = product;
  const productId = match.params.productId;
  useEffect(() => {
    fetchProductById(productId);
  }, [fetchProductById, productId]);

  return (
    <ProductDetailContainer>
      <ProductImage src={imageUrl} alt={`name`}></ProductImage>
      <ProductInfoContainer>
        <ProductCategory
          onClick={() => history.push(`/shop/category/${encodeURI(category)}`)}
        >
          {category}
        </ProductCategory>
        <ProductName>{name}</ProductName>
        <TabContainer>
          <Tab className="active">Description</Tab>
          <Tab>Specifications</Tab>
        </TabContainer>
        <p>
          Fam locavore kickstarter distillery. Mixtape chillwave tumeric
          sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps
          cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
          tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.
        </p>
        <ProductSummaryContainer>
          <SummaryItemLabel>In Stock</SummaryItemLabel>
          <SummaryItemValue>{stock}</SummaryItemValue>
        </ProductSummaryContainer>
        <ProductActionContainer>
          <ProductPrice>${price}</ProductPrice>
          <AddProductToCartBtn
            onClick={() => addItemToCart({ ...product, productId })}
          >
            Add To Cart
          </AddProductToCartBtn>
        </ProductActionContainer>
      </ProductInfoContainer>
    </ProductDetailContainer>
  );
};

const mapStateToProps = (state) => ({
  product: selectProductData(state),
  isFetchingProduct: selectIsFetchingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductById: (id) => dispatch(startFetchProductById(id)),
  addItemToCart: (item) => dispatch(addToCart(item))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetail);
