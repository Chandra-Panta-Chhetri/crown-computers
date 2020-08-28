import styled from "styled-components";

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding-top: 100px;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.85);
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
`;

export const ModalContent = styled.div`
  margin: auto;
  position: relative;
  padding: 20px;
  outline: 0;
  width: 65%;
  border: 4px solid gainsboro;
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
`;
