import React, { useEffect, useState } from "react";
import {
  ProductDetailContainer,
  ProductInfoContainer,
  ProductPrice,
  ProductActionContainer,
  ProductCategory,
  ProductName,
  ProductDescription,
  ProductStock
} from "./product-detail.styles";

import Tabs from "../tabs/tabs.component";
import Tab from "../tab/tab.component";
import ProductsCarousel from "../products-carousel/products-carousel.component";
import ProductImageCarousel from "../product-image-carousel/product-image-carousel.component";
import Banner from "../banner/banner.component";
import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";

import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { startFetchProductById } from "../../redux/product/product.actions";
import {
  selectIsFetchingProducts,
  selectProductData
} from "../../redux/product/product.selectors";
import ProductDetailSkeleton from "../product-detail-skeleton/product-detail-skeleton.component";

const ProductDetail = ({
  product,
  match,
  history,
  isFetchingProduct,
  fetchProductById
}) => {
  const {
    imageUrls,
    name,
    price,
    stock,
    category,
    description,
    specifications
  } = product;
  const [redirectUser, setRedirectUser] = useState(false);
  const productId = match.params.productId;
  useEffect(() => {
    fetchProductById(productId, () => {
      setRedirectUser(true);
    });
    //scrolls user back to top of page as page is not refreshed
    //when clicking product in product carousel
    window.scrollTo(0, 0);
  }, [fetchProductById, productId]);

  return (
    <>
      {redirectUser && <Redirect to="/" />}
      {isFetchingProduct && <ProductDetailSkeleton />}
      {!isFetchingProduct && (
        <>
          <ProductDetailContainer>
            <ProductImageCarousel imageUrls={imageUrls} />
            <ProductInfoContainer>
              <ProductCategory
                onClick={() =>
                  history.push(`/shop/categoryName/${encodeURI(category)}`)
                }
              >
                {category}
              </ProductCategory>
              <ProductName>{name}</ProductName>
              <Tabs>
                <Tab tabLabel="Description">
                  <ProductDescription>
                    {description || "No product description available"}
                  </ProductDescription>
                </Tab>
                <Tab tabLabel="Specifications">
                  {specifications &&
                    specifications.map(({ label, value }, index) => (
                      <Banner label={label} value={value} key={index} />
                    ))}
                </Tab>
              </Tabs>
              <ProductActionContainer>
                <ProductPrice>${price}</ProductPrice>
                <AddToCartButton itemToAddOnClick={{ ...product, productId }} />
              </ProductActionContainer>
              {stock < 10 ? (
                <ProductStock>{stock} left in stock</ProductStock>
              ) : null}
            </ProductInfoContainer>
          </ProductDetailContainer>
          {!isFetchingProduct && category && (
            <ProductsCarousel categoryName={category} />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  product: selectProductData(state),
  isFetchingProduct: selectIsFetchingProducts(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductById: (id, onNoProductFound) =>
    dispatch(startFetchProductById(id, onNoProductFound))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetail);
