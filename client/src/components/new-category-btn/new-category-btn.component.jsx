import React, { useState } from "react";
import { AddCategoryBtn } from "./new-category-btn.styles";

import CreateCategoryModal from "../create-category-modal/create-category-modal.component";

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
      {isModalOpen && <CreateCategoryModal closeModalHandler={closeModal} />}
    </>
  );
};

export default NewCategoryBtn;
