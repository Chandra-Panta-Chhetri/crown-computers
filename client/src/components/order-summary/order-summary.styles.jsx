import styled from "styled-components";

export const OrderSummaryContainer = styled.section`
  font-size: 15px;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;

  @media only screen and (max-width: 850px) {
    width: 100%;
  }
`;

export const Heading = styled.h2`
  font-weight: bold;
  background-color: ${(props) => props.theme.backgroundColorLight};
  padding: 1.1em;
  text-transform: uppercase;
  font-size: 16px;
`;

export const PriceSummaryContainer = styled.section`
  font-weight: lighter;
  color: gray;
  flex-grow: 1;
  margin-bottom: 25px;
  padding: 0 1.1em;
`;

export const Price = styled.span`
  float: right;
  font-weight: 700;
`;

export const PriceSummaryItem = styled.p`
  margin: 0px;
  margin-bottom: 5px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #3498db;
  color: ${(props) => props.theme.textColor};
`;
