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
  const [nav1, setNav1] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [currentPreviewNum, setPreviewNum] = useState(1);

  useEffect(() => {
    setNav1(slider1);
  }, [setNav1, slider1]);

  const indexUpdate = (index) => setPreviewNum(index + 1);

  if (!imageUrls.length) return null;

  return (
    <ProductImageCarouselContainer>
      <Carousel
        refHandler={(slider) => setSlider1(slider)}
        settings={{ arrows: false, afterChange: indexUpdate }}
      >
        {imageUrls.map((imageUrl, index) => (
          <ProductImageContainer key={index}>
            <ProductImage src={imageUrl} alt={`product preview ${index}`} />
          </ProductImageContainer>
        ))}
      </Carousel>
      <NumOfPreviews>
        {currentPreviewNum} of {imageUrls.length}
      </NumOfPreviews>
      <Carousel
        settings={{
          focusOnSelect: true,
          asNavFor: nav1,
          slidesToShow: imageUrls.length < 4 ? imageUrls.length : 4,
          afterChange: indexUpdate,
          centerMode: true
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
