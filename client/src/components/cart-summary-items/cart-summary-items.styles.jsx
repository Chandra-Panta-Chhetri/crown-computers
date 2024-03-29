import styled from "styled-components";

export const CartSummaryItemsContainer = styled.table`
  text-align: center;
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeadings = styled.thead`
  background-color: ${(props) => props.theme.backgroundColorLight};
`;

export const TableHeading = styled.th`
  padding: 1.1em;
`;
