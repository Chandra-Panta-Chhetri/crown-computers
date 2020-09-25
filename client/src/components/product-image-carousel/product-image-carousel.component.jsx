import React, { useState, useEffect } from "react";
import Carousel from "../carousel/carousel.component";
import {
  NumOfPreviews,
  ProductImage,
  ProductImageContainer,
  ProductImagePreview,
  ProductImageCarouselContainer
} from "./product-image-carousel.styles";

const ProductImageCarousel = ({ imageUrls = [] }) => {
  const [mainImageNav, setMainImageNav] = useState(null);
  const [mainImageCarouselRef, setMainImageCarouselRef] = useState(null);
  const [activeImage, setActiveImage] = useState(1);

  useEffect(() => {
    setMainImageNav(mainImageCarouselRef);
  }, [setMainImageNav, mainImageCarouselRef]);

  const changeActiveImage = (index) => setActiveImage(index + 1);

  if (!imageUrls.length) return null;

  return (
    <ProductImageCarouselContainer>
      <Carousel
        refHandler={(slider) => setMainImageCarouselRef(slider)}
        settings={{ arrows: false, afterChange: changeActiveImage }}
      >
        {imageUrls.map((imageUrl, index) => (
          <ProductImageContainer key={index}>
            <ProductImage src={imageUrl} alt={`product preview ${index}`} />
          </ProductImageContainer>
        ))}
      </Carousel>
      <NumOfPreviews>
        {activeImage} of {imageUrls.length}
      </NumOfPreviews>
      <Carousel
        settings={{
          focusOnSelect: true,
          asNavFor: mainImageNav,
          afterChange: changeActiveImage,
          variableWidth: true
        }}
      >
        {imageUrls.map((imageUrl, index) => (
          <ProductImageContainer key={index}>
            <ProductImagePreview
              src={imageUrl}
              alt={`product preview ${index}`}
            />
          </ProductImageContainer>
        ))}
      </Carousel>
    </ProductImageCarouselContainer>
  );
};

export default ProductImageCarousel;
