import React, { useEffect } from "react";
import {
  ProductDetailContainer,
  ProductInfoContainer,
  ProductPrice,
  ProductActionContainer,
  ProductCategory,
  ProductName,
  CarouselHeading,
  ProductDescription,
  ProductStock
} from "./product-detail.styles";

import Tabs from "../tabs/tabs.component";
import Tab from "../tab/tab.component";
import ProductInCategoryCarousel from "../product-in-category-carousel/product-in-category-carousel.component";
import ProductImageCarousel from "../product-image-carousel/product-image-carousel.component";
import ProductSpecificationLabel from "../product-specification-label/product-specification-label.component";
import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";

import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
  const productId = match.params.productId;
  useEffect(() => {
    fetchProductById(productId);
    //scrolls user back to top of page as page is not refreshed
    //when clicking product in product carousel
    window.scrollTo(0, 0);
  }, [fetchProductById, productId]);

  if (isFetchingProduct) {
    return <ProductDetailSkeleton />;
  }

  return (
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
                  <ProductSpecificationLabel
                    label={label}
                    value={value}
                    key={index}
                  />
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
      {category ? (
        <>
          <CarouselHeading>
            More <span>{category}</span> To Explore
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
  fetchProductById: (id) => dispatch(startFetchProductById(id))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(ProductDetail);
