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
import CreateProductModal from "../create-product-modal/create-product-modal.component";

import { connect } from "react-redux";
import { startDeleteProductById } from "../../redux/product/product.actions";
import useImageUrlsToFiles from "../../hooks/useImageUrlsToFiles.hook";

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
  const numOfImages = imageUrls.length;
  const numOfImagesToShown =
    numOfImages > IMAGES_TO_SHOW_AT_ONCE ? IMAGES_TO_SHOW_AT_ONCE : numOfImages;
  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    slidesToShow: numOfImagesToShown,
    slidesToScroll: numOfImagesToShown
  };

  const convertFilesArrToNestedObj = (newFiles) => {
    const filesAsObj = {};
    for (let file of newFiles) {
      filesAsObj[file.name] = file;
    }
    return { ...filesAsObj };
  };

  const { files, isConvertingUrlsToFiles } = useImageUrlsToFiles(
    imageUrls,
    "product-preview"
  );

  const productImageFiles = convertFilesArrToNestedObj(files);

  return (
    <ProductEntryContainer ref={intersectionCb}>
      <Card>
        <ProductActionContainer>
          <EditProductIcon
            onClick={() => setIsEditModalOpen(true)}
            className="fas fa-pencil-alt"
            disabled={isConvertingUrlsToFiles}
          />
          {isEditModalOpen && !isConvertingUrlsToFiles && (
            <CreateProductModal
              closeModalHandler={closeEditModal}
              isEditing
              modalTitle="Edit Product"
              submitBtnText="Update Product"
              defaultProduct={{ ...product, images: productImageFiles }}
            />
          )}
          <DeleteConfirmationModal
            modalTitle="Delete Product Confirmation"
            confirmButtonText="Delete Product"
            onConfirmation={() => deleteProductById(product)}
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

const mapDispatchToProps = (dispatch) => ({
  deleteProductById: (productToDelete) =>
    dispatch(startDeleteProductById(productToDelete))
});

export default connect(null, mapDispatchToProps)(ProductEntry);
