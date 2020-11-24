import styled from "styled-components";

export const CardContainer = styled.section`
  background: #fff;
  border-radius: 3px;
  height: ${(props) => props.height};
  position: relative;
  width: ${(props) => props.width};
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  padding: 30px;
  display: flex;
  flex-direction: column;
`;
