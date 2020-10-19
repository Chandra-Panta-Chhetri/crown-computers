import React from "react";
import {
  SaleEntryContainer,
  SaleTotal,
  PaymentMethod,
  CustomerInfo,
  OrderedDate,
  SaleInfo
} from "./sale-entry.styles";

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
        <SaleInfo>
          <CustomerInfo>
            <header>Customer Info</header>
            <span>
              <i className="fas fa-user" /> {name}
            </span>
            <span>
              <i className="fas fa-envelope" /> {email}
            </span>
          </CustomerInfo>
          <div>
            <SaleTotal>${subTotal}</SaleTotal>
            <OrderedDate>
              <i className="far fa-calendar-alt" /> {createdAt.toDateString()}
            </OrderedDate>
          </div>
        </SaleInfo>
        <PaymentMethod>
          <i className="fas fa-money-bill" /> Payment Method: {paymentMethod}
        </PaymentMethod>
        <span>Items Sold</span>
      </Card>
    </SaleEntryContainer>
  );
};

export default SaleEntry;
