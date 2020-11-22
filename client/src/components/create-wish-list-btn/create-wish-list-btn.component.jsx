import React, { useState } from "react";

import Button from "../button/button.component";
import CreateWishListModal from "../create-wish-list-modal/create-wish-list-modal.component";

const CreateWishListBtn = ({ className }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Button
        className={className}
        variant="icon"
        iconClass="fas fa-plus"
        onClick={() => setIsAddModalOpen(true)}
      >
        New Wish List
      </Button>
      {isAddModalOpen && (
        <CreateWishListModal
          closeModalHandler={() => setIsAddModalOpen(false)}
          modalTitle="Create Wish List"
        />
      )}
    </>
  );
};

export default CreateWishListBtn;
