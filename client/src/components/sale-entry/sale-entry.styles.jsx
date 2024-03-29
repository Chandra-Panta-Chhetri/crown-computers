import styled from "styled-components";

export const SaleEntryContainer = styled.article`
  margin-bottom: 30px;
`;

export const SaleInfo = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  @media only screen and (max-width: 450px) {
    flex-direction: column-reverse;
  }
`;

export const CustomerInfo = styled.div`
  display: flex;
  flex-direction: column;

  header {
    font-weight: bold;
    margin-bottom: 10px;
  }

  span:first-of-type {
    text-transform: capitalize;
  }

  @media only screen and (max-width: 450px) {
    margin-top: 15px;
  }
`;

export const SaleTotal = styled.span`
  display: block;
  text-align: right;
  font-weight: bold;

  @media only screen and (max-width: 450px) {
    text-align: left;
  }
`;

export const OrderedDate = styled.span`
  font-weight: bold;
`;

export const PaymentMethod = styled.span`
  text-transform: capitalize;
  margin-bottom: 20px;
`;
