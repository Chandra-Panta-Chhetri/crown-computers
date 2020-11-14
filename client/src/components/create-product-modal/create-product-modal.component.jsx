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
import { createNewProduct } from "../../redux/product/product.actions";
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
    createNewProduct(productInfo, closeModalHandler);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const updateUploadedFiles = (files) =>
    setProductInfo({ ...productInfo, images: files });

  const updateSpecifications = (specifications) => {
    console.log(specifications);
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
          label="Product Name"
          inputValue={productInfo.name}
          inputChangeHandler={handleChange}
          name="name"
          required
        />
        <FormInput
          label="Product Description"
          inputValue={productInfo.description}
          inputChangeHandler={handleChange}
          name="description"
          isTextarea
          required
        />
        <FormInput
          label="Product Price"
          inputValue={productInfo.price}
          inputChangeHandler={handleChange}
          name="price"
          required
          type="number"
          step="0.01"
          min="0.01"
        />
        <FormInput
          label="Product Stock"
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
          label="Product Category"
          selectedOptionChangeHandler={handleChange}
          nameOfOptionField="category"
          nameOfValueField="categoryId"
          optionsToValueMap={productCategories || []}
          defaultSelectedOption={productInfo.productCategoryId}
          required
        />
        <DynamicFormInput
          inputFieldStructure={{ label: "", value: "" }}
          inputFieldComponents={[
            { component: FormInput, props: { required: true, label: "Label" } },
            { component: FormInput, props: { required: true, label: "Detail" } }
          ]}
          onChangeCb={updateSpecifications}
          title="Specifications"
        />
        <FileUpload
          accept=".jpg,.png,.jpeg"
          label={"Product Images"}
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
  displayInfoNotification: (title, msg) =>
    dispatch(addInfoNotification(title, msg)),
  fetchAllCategories: () => dispatch(fetchAllCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal);
