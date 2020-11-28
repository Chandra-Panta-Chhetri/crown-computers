import styled from "styled-components";
import Banner from "../banner/banner.component";
import { BannerDetail, BannerLabel } from "../banner/banner.styles";

import ImageCarousel from "../image-carousel/image-carousel.component";
import {
  ImageContainer,
  ImagePreview
} from "../image-carousel/image-carousel.styles";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";
import { ModalContent } from "../modal/modal.styles";

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
  color: ${(props) => props.theme.secondary};
  margin-right: 10px;

  &:hover {
    transform: scale(1.3);
  }
`;

export const DeleteProductModal = styled(DeleteConfirmationModal)`
  ${ModalContent} {
    height: 44%;
    margin-top: 20px;
  }
`;

export const CategoryName = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 13px;
  color: gray;
  letter-spacing: 2px;
`;

export const FlexRowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
  font-weight: bold;

  @media only screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

export const ProductName = styled.span`
  font-weight: bold;
  text-transform: capitalize;

  @media only screen and (max-width: 500px) {
    margin-bottom: 5px;
  }
`;

export const InventoryCount = styled.span`
  font-weight: bold;
`;

export const SpecificationBanner = styled(Banner)`
  border-bottom: 2px solid ${(props) => props.theme.textColor};
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

  .slick-track {
    display: flex;
    justify-content: start;
  }
`;
