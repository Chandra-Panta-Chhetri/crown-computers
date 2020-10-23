import React, { useState } from "react";
import {
  DeleteModalContainer,
  ModalButtonContainer,
  DeleteIcon
} from "./delete-confirmation-modal.styles";

import Button from "../button/button.component";

const DeleteConfirmationModal = ({
  modalTitle,
  onConfirmation = () => {},
  confirmButtonText,
  children,
  className
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className={className}>
      <DeleteIcon onClick={() => setIsDeleteModalOpen(true)}>
        <i className="fa fa-trash-alt"></i>
      </DeleteIcon>
      <DeleteModalContainer
        isOpen={isDeleteModalOpen}
        closeModalHandler={closeDeleteModal}
        modalTitle={modalTitle}
      >
        {children}
        <ModalButtonContainer>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={onConfirmation}>
            {confirmButtonText}
          </Button>
        </ModalButtonContainer>
      </DeleteModalContainer>
    </div>
  );
};

export default DeleteConfirmationModal;
