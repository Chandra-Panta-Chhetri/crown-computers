import React, { useState } from "react";
import { AddCategoryBtn, NewCategoryModal } from "./new-category-btn.styles";

const NewCategoryBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <AddCategoryBtn
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsModalOpen(true)}
      >
        New Category
      </AddCategoryBtn>
      {isModalOpen && (
        <NewCategoryModal
          isOpen={true}
          closeModalHandler={closeModal}
          modalTitle="Create New Product Category"
        >
          <form></form>
        </NewCategoryModal>
      )}
    </>
  );
};

export default NewCategoryBtn;
