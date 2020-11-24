import styled from "styled-components";
import Carousel from "../carousel/carousel.component";

export const ProductsCarouselContainer = styled(Carousel)`
  margin-bottom: 25px;

  @media only screen and (max-width: 400px) {
    .slick-prev {
      left: 0px;
    }

    .slick-next {
      right: 0px;
    }

    .slick-dots {
      bottom: auto;
    }
  }
`;

export const CarouselHeading = styled.h4`
  font-size: 1.275rem;
  margin-bottom: 10px;
  text-transform: capitalize;
`;
