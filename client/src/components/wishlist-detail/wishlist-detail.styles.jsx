import styled from "styled-components";
import Button from "../button/button.component";
import {
  ProductCategory,
  ProductName
} from "../cart-summary-item/cart-summary-item.styles";
import { secondaryColor } from "../../global.styles";

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
`;

export const WishlistName = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  margin: 0;
  text-align: right;
  font-size: 16px;
  letter-spacing: 1.9px;
`;

export const WishlistCreatedDate = styled.p`
  margin: 5px 0 0;
  font-size: 16px;
  letter-spacing: 1.9px;
  font-weight: bold;
`;

export const BackToWishlistsBtn = styled(Button)`
  i {
    width: 13%;
  }
`;

export const WishlistItemsTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

export const ItemTableData = styled.td`
  padding: 0.9em;
`;

export const WishlistItemCategory = styled(ProductCategory)`
  cursor: pointer;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const WishlistItemName = styled(ProductName)`
  cursor: pointer;
  letter-spacing: 2.3px;
  margin-top: 3px;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const AddAllToCart = styled(Button)`
  margin-top: 30px;
`;
