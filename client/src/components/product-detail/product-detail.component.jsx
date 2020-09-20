import React, { useEffect } from "react";
import {
  ProductDetailContainer,
  ProductInfoContainer,
  ProductSummaryContainer,
  SummaryItemLabel,
  SummaryItemValue,
  ProductPrice,
  ProductActionContainer,
  AddProductToCartBtn,
  ProductCategory,
  ProductName,
  CarouselHeading
} from "./product-detail.styles";

import Tabs from "../tabs/tabs.component";
import Tab from "../tab/tab.component";
import ProductInCategoryCarousel from "../product-in-category-carousel/product-in-category-carousel.component";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startFetchProductById } from "../../redux/product/product.actions";
import {
  selectIsFetchingProducts,
  selectProductData
} from "../../redux/product/product.selectors";
import { addToCart } from "../../redux/cart/cart.actions";
import ProductImageCarousel from "../product-image-carousel/product-image-carousel.component";

const ProductDetail = ({
  product,
  match,
  history,
  isFetchingProduct,
  fetchProductById,
  addItemToCart
}) => {
  const { imageUrl, name, price, stock, category, description } = product;
  const productId = match.params.productId;
  useEffect(() => {
    fetchProductById(productId);
    //scrolls user back to top of page as page is not refreshed
    //when clicking product in product carousel
    window.scrollTo(0, 0);
  }, [fetchProductById, productId]);

  return (
    <>
      <ProductDetailContainer>
        <ProductImageCarousel imageUrls={[imageUrl, imageUrl]} />
        <ProductInfoContainer>
          <ProductCategory
            onClick={() =>
              history.push(`/shop/category/${encodeURI(category)}`)
            }
          >
            {category}
          </ProductCategory>
          <ProductName>{name}</ProductName>
          <Tabs>
            <Tab tabLabel="Description">
              <p>{description || "No product description available"}</p>
            </Tab>
            <Tab tabLabel="Specifications">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Beatae, non delectus veritatis dolor, voluptatum numquam quam,
                ullam ex quis tenetur atque porro eaque amet sequi. Omnis
                dolorum minus odit veritatis!
              </p>
            </Tab>
          </Tabs>
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
      {category ? (
        <>
          <CarouselHeading>
            More {category.charAt(0).toUpperCase() + category.slice(1)} To
            Explore
          </CarouselHeading>
          <ProductInCategoryCarousel category={category} />
        </>
      ) : null}
    </>
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
