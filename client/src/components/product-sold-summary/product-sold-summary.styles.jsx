import styled from "styled-components";

export const ProductSoldSummaryContainer = styled.div`
  margin-bottom: 12px;
`;

export const ProductCategory = styled.span`
  text-transform: uppercase;
  color: gray;
  font-weight: bold;
  font-size: 14px;
`;

export const PriceBreakdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  span {
    font-weight: bold;
  }

  @media only screen and (max-width: 750px) {
    flex-direction: column;
  }
`;

export const TotalProductSale = styled.span`
  @media only screen and (max-width: 750px) {
    text-align: right;
    width: 100%;
    margin-top: 10px;
  }
`;
