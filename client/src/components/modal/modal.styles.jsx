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
  background-color: rgba(0, 0, 0, 0.65);
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

export const ModalContent = styled.div`
  margin: auto;
  position: relative;
  padding: 20px;
  outline: 0;
  width: 55%;
  height: 80%;
  overflow-y: auto;
  background: white;
  border-radius: 6px;
  box-shadow: 0 5px 3px black;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 1000px) {
    height: 90% !important;
    width: 90% !important;
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ModalTitle = styled.h3`
  letter-spacing: 1.4px;
`;

export const ModalHeader = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;

  h3 {
    margin-bottom: 10px;
  }

  i {
    cursor: pointer;
    color: lightgrey;

    &:hover {
      color: black;
      transform: scale(1.3);
    }
  }
`;
