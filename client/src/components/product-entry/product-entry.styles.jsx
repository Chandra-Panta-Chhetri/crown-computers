import styled from "styled-components";
import Banner from "../banner/banner.component";
import { BannerDetail, BannerLabel } from "../banner/banner.styles";
import { secondaryColor } from "../../global.styles";
import ImageCarousel from "../image-carousel/image-carousel.component";
import {
  ImageContainer,
  ImagePreview
} from "../image-carousel/image-carousel.styles";

export const ProductEntryContainer = styled.article`
  width: 100%;
  margin: 0 0 30px;
  position: relative;
`;

export const ProductActionContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 20px;
  right: 30px;
`;

export const EditProductIcon = styled.i`
  cursor: pointer;
  color: ${secondaryColor};
  margin-right: 10px;

  &:hover {
    transform: scale(1.3);
  }
`;

export const CategoryName = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
  color: gray;
  letter-spacing: 2px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
  font-weight: bold;
`;

export const ProductName = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

export const InventoryCount = styled.span`
  font-weight: bold;
`;

export const SpecificationBanner = styled(Banner)`
  border-bottom: 2px solid darkgray;

  ${BannerLabel}, ${BannerDetail} {
    color: black;
  }
`;

export const Heading = styled.h4`
  margin: 15px 0;
`;

export const ProductImages = styled(ImageCarousel)`
  ${ImageContainer} {
    justify-content: flex-start;
  }

  ${ImagePreview} {
    margin: 0 10px 0;
  }
`;
