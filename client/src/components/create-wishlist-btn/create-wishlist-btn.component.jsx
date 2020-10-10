import React, { useState } from "react";
import { NewWishlistBtn } from "./create-wishlist-btn.styles";

import CreateWishlistModal from "../create-wishlist-modal/create-wishlist-modal.component";

const CreateWishlistBtn = ({ className }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <NewWishlistBtn
        className={className}
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsAddModalOpen(true)}
      >
        New Wishlist
      </NewWishlistBtn>
      {isAddModalOpen && (
        <CreateWishlistModal
          closeModalHandler={() => setIsAddModalOpen(false)}
          modalTitle="Create New Wishlist"
        />
      )}
    </>
  );
};

export default CreateWishlistBtn;
