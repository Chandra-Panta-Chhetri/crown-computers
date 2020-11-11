import React, { useState, useEffect } from "react";
import {
  NumOfPreviews,
  ProductImage,
  ProductImageCarouselContainer,
  ProductImageContainer
} from "./product-image-carousel.styles";

import Carousel from "../carousel/carousel.component";
import ImageCarousel from "../image-carousel/image-carousel.component";

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
      <ImageCarousel
        carouselSetting={{
          focusOnSelect: true,
          asNavFor: mainImageNav,
          afterChange: changeActiveImage,
          variableWidth: true
        }}
        imageUrls={imageUrls}
      />
    </ProductImageCarouselContainer>
  );
};

export default ProductImageCarousel;
