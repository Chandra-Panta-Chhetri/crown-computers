import React, { useEffect } from "react";
import { ProductCarousel } from "./product-in-category.styles";
import ProductCarouselItem from "../product-carousel-item/product-carousel-item.component";

import { connect } from "react-redux";
import { startInitialProductsFetchByCategory } from "../../redux/product/product.actions";
import { selectProductCollection } from "../../redux/product/product.selectors";

const ProductInCategoryCarousel = ({
  category,
  fetchProductsInCategory,
  products
}) => {
  useEffect(() => {
    fetchProductsInCategory(category);
  }, [fetchProductsInCategory, category]);

  return (
    <ProductCarousel>
      {products.map((product) => (
        <ProductCarouselItem product={product} key={product.productId} />
      ))}
    </ProductCarousel>
  );
};

const mapStateToProps = (state) => ({
  products: selectProductCollection(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchProductsInCategory: (categoryName) =>
    dispatch(startInitialProductsFetchByCategory(categoryName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInCategoryCarousel);
