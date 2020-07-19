import styled from "styled-components";

export const OrderSummaryContainer = styled.article`
  border: 4px solid #efefef;
  font-size: 15px;
  padding: 0 15px 15px;
  width: 26%;
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  span {
    display: flex;
  }
`;

export const Heading = styled.h2`
  font-weight: bold;
`;

export const PriceSummaryContainer = styled.section`
  font-weight: lighter;
  color: gray;
  flex-grow: 1;
  margin-bottom: 25px;
`;

export const Price = styled.span`
  float: right;
`;
