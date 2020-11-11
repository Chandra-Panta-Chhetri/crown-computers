import React, { useState } from "react";
import {
  ProductEntryContainer,
  FlexContainer,
  CategoryName,
  InventoryCount,
  SpecificationBanner,
  ProductActionContainer,
  EditProductIcon,
  ProductName,
  ProductImages,
  Heading
} from "./product-entry.styles";

import Card from "../card/card.component";
import Collapse from "../collapse/collapse.component";
import DeleteConfirmationModal from "../delete-confirmation-modal/delete-confirmation-modal.component";

const IMAGES_TO_SHOW_AT_ONCE = 10;

const ProductEntry = ({ product, intersectionCb }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    category,
    description,
    name,
    price,
    stock,
    specifications,
    imageUrls
  } = product;
  const numOfImages = imageUrls.length;
  const numOfImagesToShown =
    numOfImages > IMAGES_TO_SHOW_AT_ONCE ? IMAGES_TO_SHOW_AT_ONCE : numOfImages;
  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: numOfImagesToShown,
    slidesToScroll: numOfImagesToShown
  };

  return (
    <ProductEntryContainer ref={intersectionCb}>
      <Card>
        <ProductActionContainer>
          <EditProductIcon
            onClick={() => setIsEditModalOpen(true)}
            className="fas fa-pencil-alt"
          />
          <DeleteConfirmationModal
            modalTitle="Delete Product Confirmation"
            confirmButtonText="Delete Product"
          >
            <p>
              Are you sure you want to delete <ProductName>{name}</ProductName>{" "}
              ?
            </p>
          </DeleteConfirmationModal>
        </ProductActionContainer>
        <CategoryName>{category}</CategoryName>
        <FlexContainer>
          <ProductName>{name}</ProductName>
          <span>
            <i className="fas fa-tag" /> ${price}
          </span>
        </FlexContainer>
        <InventoryCount>
          <i className="fas fa-boxes" /> In Inventory: {stock}
        </InventoryCount>
        <p>{description}</p>
        <Collapse title={`Specifications (${specifications.length})`}>
          {(specifications || []).map(({ label, value }, index) => (
            <SpecificationBanner label={label} value={value} key={index} />
          ))}
        </Collapse>
        <Heading>Product Images</Heading>
        <ProductImages
          imageUrls={imageUrls}
          carouselSetting={imageCarouselSettings}
        />
      </Card>
    </ProductEntryContainer>
  );
};

export default ProductEntry;
