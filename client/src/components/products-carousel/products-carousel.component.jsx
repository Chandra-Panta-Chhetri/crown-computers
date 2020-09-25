import React, { useEffect, useState } from "react";
import {
  ProductsCarouselContainer,
  CarouselHeading
} from "./products-carousel.styles";

import ProductCarouselItem from "../product-carousel-item/product-carousel-item.component";

import { connect } from "react-redux";
import { startInitialProductsFetchByCategory } from "../../redux/product/product.actions";
import { selectProductCollection } from "../../redux/product/product.selectors";

const ProductsCarousel = ({
  categoryName,
  fetchProductsInCategory,
  products
}) => {
  const [isCarouselShown, setIsCarouselShown] = useState(true);
  useEffect(() => {
    if (products.length) return;
    fetchProductsInCategory(categoryName, () => {
      setIsCarouselShown(false);
    });
  }, [fetchProductsInCategory, categoryName, products]);

  if (!isCarouselShown) {
    return null;
  }

  return (
    <>
      <CarouselHeading>More Products To Explore</CarouselHeading>
      <ProductsCarouselContainer>
        {products.map((product) => (
          <ProductCarouselItem product={product} key={product.productId} />
        ))}
      </ProductsCarouselContainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: selectProductCollection(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName, onNoProductsFound) =>
    dispatch(
      startInitialProductsFetchByCategory(categoryName, onNoProductsFound)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCarousel);