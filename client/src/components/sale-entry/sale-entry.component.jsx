import React from "react";
import { SaleEntryContainer } from "./sale-entry.styles";

import Card from "../card/card.component";

const SaleEntry = ({ saleInfo, intersectionCb }) => {
  const {
    itemsSold,
    subTotal,
    paymentMethod,
    createdAt,
    customerInfo: { name, email }
  } = saleInfo;

  return (
    <SaleEntryContainer ref={intersectionCb}>
      <Card>
        <span>${subTotal}</span>
        <span>{paymentMethod}</span>
        <span>{createdAt.toDateString()}</span>
        <span>{name}</span>
        <span>{email}</span>
      </Card>
    </SaleEntryContainer>
  );
};

export default SaleEntry;
