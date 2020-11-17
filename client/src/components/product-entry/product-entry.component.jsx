import React, { useState } from "react";
import {
  ProductEntryContainer,
  FlexRowContainer,
  CategoryName,
  InventoryCount,
  SpecificationBanner,
  ProductActionContainer,
  EditProductIcon,
  ProductName,
  ProductImages,
  Heading,
  DeleteProductModal
} from "./product-entry.styles";

import Card from "../card/card.component";
import Collapse from "../collapse/collapse.component";
import CreateProductModal from "../create-product-modal/create-product-modal.component";

import { connect } from "react-redux";
import { startDeleteProductById } from "../../redux/product/product.actions";

const IMAGES_TO_SHOW_AT_ONCE = 10;

const ProductEntry = ({ product, intersectionCb, deleteProductById }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const closeEditModal = () => setIsEditModalOpen(false);
  const {
    category,
    description,
    name,
    price,
    stock,
    specifications,
    imageUrls
  } = product;
  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    variableWidth: true
  };

  return (
    <ProductEntryContainer ref={intersectionCb}>
      <Card>
        <ProductActionContainer>
          <EditProductIcon
            onClick={() => setIsEditModalOpen(true)}
            className="fas fa-pencil-alt"
          />
          {isEditModalOpen && (
            <CreateProductModal
              closeModalHandler={closeEditModal}
              isEditing
              modalTitle="Edit Product"
              submitBtnText="Update Product"
              defaultProduct={product}
            />
          )}
          <DeleteProductModal
            modalTitle="Delete Product Confirmation"
            confirmButtonText="Delete Product"
            onConfirmation={() => deleteProductById(product)}
          >
            <p>
              Are you sure you want to delete <ProductName>{name}</ProductName>{" "}
              ?
            </p>
          </DeleteProductModal>
        </ProductActionContainer>
        <CategoryName>{category}</CategoryName>
        <FlexRowContainer>
          <ProductName>{name}</ProductName>
          <span>
            <i className="fas fa-tag" /> ${price}
          </span>
        </FlexRowContainer>
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
          maxImagesToShowAtOnce={IMAGES_TO_SHOW_AT_ONCE}
        />
      </Card>
    </ProductEntryContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteProductById: (productToDelete) =>
    dispatch(startDeleteProductById(productToDelete))
});

export default connect(null, mapDispatchToProps)(ProductEntry);
