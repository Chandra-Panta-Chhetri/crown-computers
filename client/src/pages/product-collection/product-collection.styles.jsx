import styled from "styled-components";

export const ProductCollectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => (props.spinnerActive ? "70vh" : "100%")};
`;
