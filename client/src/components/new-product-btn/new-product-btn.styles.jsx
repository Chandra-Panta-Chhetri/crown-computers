import styled from "styled-components";
import Button from "../button/button.component";

export const AddProductBtn = styled(Button)`
  margin-left: auto;
  padding-right: 10px;

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;
