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
  const mainCarouselSettings = {
    arrows: false,
    afterChange: changeActiveImage
  };
  const secondaryCarouselSettings = {
    focusOnSelect: true,
    asNavFor: mainImageNav,
    afterChange: changeActiveImage,
    variableWidth: imageUrls.length < 5,
    slidesToShow: imageUrls.length < 5 ? imageUrls.length : 5,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: imageUrls.length < 4 ? imageUrls.length : 4
        }
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: imageUrls.length < 3 ? imageUrls.length : 3
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: imageUrls.length < 8 ? imageUrls.length : 8
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: imageUrls.length < 6 ? imageUrls.length : 6
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: imageUrls.length < 5 ? imageUrls.length : 5,
          arrows: false
        }
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: imageUrls.length < 4 ? imageUrls.length : 4,
          arrows: false
        }
      }
    ]
  };

  if (!imageUrls.length) return null;

  return (
    <ProductImageCarouselContainer>
      <Carousel
        refHandler={(slider) => setMainImageCarouselRef(slider)}
        settings={mainCarouselSettings}
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
        carouselSetting={secondaryCarouselSettings}
        imageUrls={imageUrls}
      />
    </ProductImageCarouselContainer>
  );
};

export default ProductImageCarousel;
