import React from "react";
import { CarouselContainer } from "./carousel.styles";

const defaultSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 4
};

const Carousel = ({
  settings = defaultSettings,
  children,
  refHandler,
  className,
  ...otherProps
}) => (
  <CarouselContainer
    {...settings}
    ref={refHandler}
    {...otherProps}
    className={className}
  >
    {children}
  </CarouselContainer>
);

export default Carousel;
