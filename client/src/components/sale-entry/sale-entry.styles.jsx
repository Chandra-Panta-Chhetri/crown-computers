import styled from "styled-components";

export const SaleEntryContainer = styled.div`
  margin-bottom: 30px;
`;

export const SaleInfo = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
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
`;

export const SaleTotal = styled.span`
  display: block;
  text-align: right;
  font-weight: bold;
`;

export const OrderedDate = styled.span`
  font-weight: bold;
`;

export const PaymentMethod = styled.span`
  text-transform: capitalize;
  margin-bottom: 10px;
`;
