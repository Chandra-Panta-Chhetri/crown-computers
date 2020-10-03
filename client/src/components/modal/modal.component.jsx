import React from "react";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalTitle
} from "./modal.styles";

const Modal = ({
  isOpen = false,
  children,
  closeModalHandler,
  modalTitle,
  className
}) => {
  const handleClose = () => {
    closeModalHandler();
  };

  return (
    <ModalContainer isOpen={isOpen} className={className}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{modalTitle}</ModalTitle>
          <div onClick={handleClose}>
            <i className="fas fa-times fa-2x" />
          </div>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
