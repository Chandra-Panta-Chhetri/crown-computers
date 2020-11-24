import React from "react";
import { ImageContainer, ImagePreview } from "./image-carousel.styles";

import Carousel from "../carousel/carousel.component";

const ImageCarousel = ({ imageUrls = [], carouselSetting, className }) => (
  <Carousel settings={carouselSetting} className={className}>
    {imageUrls.map((imageUrl, index) => (
      <ImageContainer key={index}>
        <ImagePreview src={imageUrl} alt={`product preview ${index}`} />
      </ImageContainer>
    ))}
  </Carousel>
);

export default ImageCarousel;
