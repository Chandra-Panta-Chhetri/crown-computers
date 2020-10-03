import React, { useEffect } from "react";
import {
  ProductDetailContainer,
  ProductInfoContainer,
  ProductPrice,
  ProductActionContainer,
  ProductCategory,
  ProductName,
  ProductDescription,
  ProductStock,
  AddProductToCart
} from "./product-detail.styles";

import Tabs from "../tabs/tabs.component";
import Tab from "../tab/tab.component";
import ProductsCarousel from "../products-carousel/products-carousel.component";
import ProductImageCarousel from "../product-image-carousel/product-image-carousel.component";
import Banner from "../banner/banner.component";
import ProductDetailSkeleton from "../product-detail-skeleton/product-detail-skeleton.component";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startFetchProductById } from "../../redux/product/product.actions";
import {
  selectIsFetchingProducts,
  selectProductData
} from "../../redux/product/product.selectors";
import useRedirect from "../../hooks/useRedirect.hook";

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
  const productId = match.params.productId;
  const {
    redirectComponent,
    resetIsActionDispatched
  } = useRedirect(fetchProductById, [productId]);

  useEffect(() => {
    //useRedirect hook only calls dispatchAction once using a flag
    //need to reset flag to allow component to update after productId changes
    resetIsActionDispatched();
  }, [productId, resetIsActionDispatched]);

  return (
    <>
      {redirectComponent}
      {isFetchingProduct && <ProductDetailSkeleton />}
      {!isFetchingProduct && (
        <>
          <ProductDetailContainer>
            <ProductImageCarousel imageUrls={imageUrls} />
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
                <AddProductToCart
                  itemToAddOnClick={{ ...product, productId }}
                />
              </ProductActionContainer>
              {stock < 10 && <ProductStock>{stock} left in stock</ProductStock>}
            </ProductInfoContainer>
          </ProductDetailContainer>
          {category && <ProductsCarousel categoryName={category} />}
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
