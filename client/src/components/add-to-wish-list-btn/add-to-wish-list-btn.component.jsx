import React, { useState } from "react";
import { AddToWishListIcon } from "./add-to-wish-list.styles";

import AddToWishListsModal from "../add-to-wish-lists-modal/add-to-wish-lists-modal.component";

const AddToWishListBtn = ({ itemToAddOnClick, className }) => {
  const [isWishListsModalOpen, setIsWishListsModalOpen] = useState(false);

  const closeModal = () => setIsWishListsModalOpen(false);

  return (
    <>
      <AddToWishListIcon
        onClick={() => setIsWishListsModalOpen(true)}
        className={`${className} far fa-bookmark`}
      />
      {isWishListsModalOpen && (
        <AddToWishListsModal
          closeModal={closeModal}
          itemToAdd={itemToAddOnClick}
        />
      )}
    </>
  );
};

export default AddToWishListBtn;
