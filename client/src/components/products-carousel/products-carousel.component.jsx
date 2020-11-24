import React, { useEffect, useState } from "react";
import {
  ProductsCarouselContainer,
  CarouselHeading
} from "./products-carousel.styles";

import ProductCarouselItem from "../product-carousel-item/product-carousel-item.component";

import { connect } from "react-redux";
import { startInitialProductsFetchByCategory } from "../../redux/product/product.actions";
import { selectProductCollection } from "../../redux/product/product.selectors";

const MIN_PRODUCTS_TO_SHOW = 3;

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
  }, [fetchProductsInCategory, categoryName]);

  if (!isCarouselShown || products.length <= MIN_PRODUCTS_TO_SHOW) {
    return null;
  }

  const carouselConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 660,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <CarouselHeading>More Products To Explore</CarouselHeading>
      <ProductsCarouselContainer settings={carouselConfig}>
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
  fetchProductsInCategory: (categoryName, onFail) =>
    dispatch(startInitialProductsFetchByCategory(categoryName, onFail))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsCarousel);
