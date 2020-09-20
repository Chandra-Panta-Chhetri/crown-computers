import styled from "styled-components";
const borderColor = "rgba(226, 232, 240, 1)";

export const SpecificationContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${borderColor};
  padding: 8px 0;
`;

export const SpecificationLabel = styled.span`
  color: gray;
  text-transform: capitalize;
`;

export const SpecificationDetail = styled.span`
  color: rgba(26, 32, 44, 1);
  margin-left: auto;
`;
