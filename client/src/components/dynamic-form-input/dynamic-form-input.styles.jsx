import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h4 {
    margin: 0 0 5px;
  }

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
