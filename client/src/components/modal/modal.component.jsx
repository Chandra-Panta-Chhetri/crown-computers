import React from "react";
import { ModalContainer, ModalContent, ModalCloseButton } from "./modal.styles";

const Modal = ({ isOpen = false, children, closeModalHandler }) => {
  const handleClose = () => {
    closeModalHandler();
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={handleClose}>&times;</ModalCloseButton>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
