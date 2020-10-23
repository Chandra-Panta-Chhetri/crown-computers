import React, { useState } from "react";
import {
  DeleteModalContainer,
  ModalButtonContainer,
  DeleteIcon
} from "./delete-confirmation-modal.styles";

import Button from "../button/button.component";

const DeleteConfirmationModal = ({
  modalTitle,
  confirmationMsg,
  onConfirmation = () => {},
  confirmButtonText,
  className
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <DeleteIcon
        onClick={() => setIsDeleteModalOpen(true)}
        className={className}
      >
        <i className="fa fa-trash-alt"></i>
      </DeleteIcon>
      <DeleteModalContainer
        isOpen={isDeleteModalOpen}
        closeModalHandler={closeDeleteModal}
        modalTitle={modalTitle}
      >
        <p>{confirmationMsg}</p>
        <ModalButtonContainer>
          <Button onClick={closeDeleteModal}>Cancel</Button>
          <Button color="red" onClick={onConfirmation}>
            {confirmButtonText}
          </Button>
        </ModalButtonContainer>
      </DeleteModalContainer>
    </>
  );
};

export default DeleteConfirmationModal;
