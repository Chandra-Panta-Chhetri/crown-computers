import styled from "styled-components";
import Slider from "react-slick";

export const CarouselContainer = styled(Slider)`
  .slick-next:before,
  .slick-prev:before {
    color: #3498db;
    font-size: 25px;
  }

  .slick-dots li button:before {
    font-size: 13px;
  }

  .slick-slide {
    outline: none;
  }

  .slick-slider {
    margin: 0 0 20px;
  }

  .slick-prev {
    left: -5px;
  }

  .slick-next {
    right: -5px;
  }
`;
