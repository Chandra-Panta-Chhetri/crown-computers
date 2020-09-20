import React from "react";
import { CarouselContainer } from "./carousel.styles";

const defaultSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 4,
  slidesToScroll: 4
};

const Carousel = ({
  settings = defaultSettings,
  children,
  refHandler,
  ...otherProps
}) => (
  <CarouselContainer
    {...settings}
    {...otherProps}
    ref={refHandler ? refHandler : undefined}
  >
    {children}
  </CarouselContainer>
);

export default Carousel;
