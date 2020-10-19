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
import Collapse from "../collapse/collapse.component";

import { roundPrice } from "../../global.utils";

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
        <Collapse title="Products Sold">
          <Card>
            {(itemsSold || []).map(
              ({ name, price, category, quantity }, index) => (
                <div style={{ marginBottom: "12px" }} key={index}>
                  <span
                    style={{
                      textTransform: "uppercase",
                      color: "gray",
                      fontWeight: "bold",
                      fontSize: "14px"
                    }}
                  >
                    {category}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      {quantity} x {name} @${price}
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                      ${roundPrice(quantity * price)}
                    </span>
                  </div>
                </div>
              )
            )}
          </Card>
        </Collapse>
      </Card>
    </SaleEntryContainer>
  );
};

export default SaleEntry;
