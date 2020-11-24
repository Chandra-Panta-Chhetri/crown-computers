import styled from "styled-components";
import Button from "../button/button.component";

export const AddCategoryBtn = styled(Button)`
  margin-left: auto;
  margin-right: 10px;
  padding-right: 10px;

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;
