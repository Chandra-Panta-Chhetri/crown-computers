import React, { useState } from "react";
import { NewWishListBtn } from "./create-wish-list-btn.styles";

import CreateWishListModal from "../create-wish-list-modal/create-wish-list-modal.component";

const CreateWishListBtn = ({ className }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <NewWishListBtn
        className={className}
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsAddModalOpen(true)}
      >
        New Wish List
      </NewWishListBtn>
      {isAddModalOpen && (
        <CreateWishListModal
          closeModalHandler={() => setIsAddModalOpen(false)}
          modalTitle="Create New Wish List"
        />
      )}
    </>
  );
};

export default CreateWishListBtn;
