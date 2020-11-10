import React, { useState } from "react";
import { AddProductBtn } from "./new-product-btn.styles";

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
    </>
  );
};

export default NewProductBtn;
