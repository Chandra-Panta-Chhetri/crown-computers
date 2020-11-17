import React from "react";
import { ImageContainer, ImagePreview } from "./image-carousel.styles";

import Carousel from "../carousel/carousel.component";

const ImageCarousel = ({
  imageUrls = [],
  carouselSetting,
  className,
  maxImagesToShowAtOnce = 4
}) => (
  <Carousel
    settings={{
      ...carouselSetting,
      slidesToShow:
        imageUrls.length < maxImagesToShowAtOnce
          ? imageUrls.length
          : maxImagesToShowAtOnce,
      slidesToScroll:
        imageUrls.length < maxImagesToShowAtOnce
          ? imageUrls.length
          : maxImagesToShowAtOnce
    }}
    className={className}
  >
    {imageUrls.map((imageUrl, index) => (
      <ImageContainer key={index}>
        <ImagePreview src={imageUrl} alt={`product preview ${index}`} />
      </ImageContainer>
    ))}
  </Carousel>
);

export default ImageCarousel;
