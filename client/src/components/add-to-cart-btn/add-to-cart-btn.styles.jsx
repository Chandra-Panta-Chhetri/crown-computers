import styled from "styled-components";
import Button from "../button/button.component";

export const AddToCartBtnContainer = styled(Button)`
  filter: ${(props) => (props.isDisabled ? "grayscale(1)" : "none")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "unset")};
`;
