import React from "react";
import { CarouselContainer } from "./carousel.styles";

const defaultSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToSwipe: 4
};

const Carousel = ({ settings = defaultSettings, children, refHandler }) => (
  <CarouselContainer {...settings} ref={refHandler}>
    {children}
  </CarouselContainer>
);

export default Carousel;
