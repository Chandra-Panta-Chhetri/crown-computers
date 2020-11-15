import styled from "styled-components";
import { mainColor } from "../form-input/form-input.styles";

export const DynamicFormInputContainer = styled.div`
  margin-bottom: 30px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 12px;
  color: ${mainColor};
  margin-top: -15px;

  i {
    cursor: pointer;

    &:hover {
      transform: scale(1.3);
    }
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  .input-field {
    margin-bottom: 5px;
  }

  i {
    margin-top: 5px;
    margin-left: auto;
    cursor: pointer;

    &:hover {
      transform: scale(1.3);
    }
  }
`;
