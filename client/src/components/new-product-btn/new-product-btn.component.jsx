import React, { useState } from "react";
import { AddProductBtn } from "./new-product-btn.styles";

import CreateProductModal from "../create-product-modal/create-product-modal.component";

const NewProductBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AddProductBtn
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsModalOpen(true)}
      >
        New Product
      </AddProductBtn>
      {isModalOpen && <CreateProductModal closeModalHandler={closeModal} />}
    </>
  );
};

export default NewProductBtn;
