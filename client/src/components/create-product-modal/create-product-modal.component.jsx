import React, { useState, useEffect } from "react";
import {
  NewProductModal,
  SubmitProductBtn
} from "./create-product-modal.styles";

import FormInput from "../form-input/form-input.component";
import FileUpload from "../file-upload/file-upload.component";
import FormSelect from "../form-select/form-select.component";
import DynamicFormInput from "../dynamic-form-input/dynamic-form-input.component";

import { connect } from "react-redux";
import {
  createNewProduct,
  updateProductInfo
} from "../../redux/product/product.actions";
import { fetchAllCategories } from "../../redux/product-category/product-category.actions";
import { selectProductCategories } from "../../redux/product-category/product-category.selectors";
import { addInfoNotification } from "../../redux/notification/notification.actions";

const DEFAULT_PRODUCT_CATEGORY_ID = -1;

const CreateProductModal = ({
  closeModalHandler,
  modalTitle = "Create New Product",
  isEditing = false,
  defaultProduct,
  submitBtnText = "Create New Product",
  createNewProduct,
  updateProduct,
  displayInfoNotification,
  fetchAllCategories,
  productCategories
}) => {
  useEffect(() => {
    fetchAllCategories();
  }, [fetchAllCategories]);

  const [productInfo, setProductInfo] = useState({
    name: defaultProduct ? defaultProduct.name : "",
    price: defaultProduct ? defaultProduct.price : "0.01",
    stock: defaultProduct ? defaultProduct.stock : "0",
    description: defaultProduct ? defaultProduct.description : "",
    productCategoryId: defaultProduct
      ? defaultProduct.productCategoryId
      : DEFAULT_PRODUCT_CATEGORY_ID,
    specifications: defaultProduct ? defaultProduct.specifications : [],
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const numOfProductImages = productInfo.images.length;
    if (!isEditing && !numOfProductImages) {
      return displayInfoNotification(
        "Product Creation Failed",
        "To create a new product, at least one product image is required."
      );
    }
    if (isEditing) {
      return updateProduct(
        {
          ...defaultProduct,
          ...productInfo
        },
        defaultProduct.productId,
        closeModalHandler
      );
    }
    createNewProduct(productInfo, closeModalHandler);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const updateUploadedFiles = (files) =>
    setProductInfo({ ...productInfo, images: files });

  const updateSpecifications = (specifications) => {
    setProductInfo({ ...productInfo, specifications });
  };

  return (
    <NewProductModal
      isOpen
      closeModalHandler={closeModalHandler}
      modalTitle={modalTitle}
    >
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Name*"
          inputValue={productInfo.name}
          inputChangeHandler={handleChange}
          name="name"
          placeholder="Dell XPS 15 9500"
          required
        />
        <FormInput
          label="Price*"
          inputValue={productInfo.price}
          inputChangeHandler={handleChange}
          name="price"
          required
          type="number"
          step="0.01"
          min="0.01"
        />
        <FormInput
          label="Stock*"
          inputValue={productInfo.stock}
          inputChangeHandler={handleChange}
          name="stock"
          required
          type="number"
          min="0"
        />
        <FormSelect
          name="productCategoryId"
          noneSelectedText="Select A Category"
          label="Product Category*"
          selectedOptionChangeHandler={handleChange}
          nameOfOptionField="category"
          nameOfValueField="categoryId"
          optionsToValueMap={productCategories || []}
          defaultSelectedOption={productInfo.productCategoryId}
          required
        />
        <DynamicFormInput
          defaultInputFields={productInfo.specifications}
          inputFieldStructure={{ label: "", value: "" }}
          inputFieldComponents={[
            {
              component: FormInput,
              props: { required: true, label: "Label", placeholder: "Storage" }
            },
            {
              component: FormInput,
              props: {
                required: true,
                label: "Detail",
                placeholder: "512 GB SSD"
              }
            }
          ]}
          onChangeCb={updateSpecifications}
          title="Specifications"
        />
        <FormInput
          label="Description*"
          inputValue={productInfo.description}
          inputChangeHandler={handleChange}
          name="description"
          placeholder="A 15-inch laptop with an InfinityEdge display."
          isTextarea
          required
        />
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label={isEditing ? "New Product Images" : "Product Images*"}
          updateFilesCb={updateUploadedFiles}
          multiple
        />
        <SubmitProductBtn type="submit">{submitBtnText}</SubmitProductBtn>
      </form>
    </NewProductModal>
  );
};

const mapStateToProps = (state) => ({
  productCategories: selectProductCategories(state)
});

const mapDispatchToProps = (dispatch) => ({
  createNewProduct: (newProductInfo, onSuccess) =>
    dispatch(createNewProduct(newProductInfo, onSuccess)),
  updateProduct: (updatedProductInfo, productId, onSuccess) =>
    dispatch(updateProductInfo(updatedProductInfo, productId, onSuccess)),
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg)),
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal);
