import styled from "styled-components";
import Button from "../button/button.component";
import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";
import {
  ProductCategory,
  ProductName
} from "../cart-summary-item/cart-summary-item.styles";
import { secondaryColor } from "../../global.styles";

export const WishListDetailContainer = styled.article`
  min-height: 250px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 15px;
`;

export const WishListName = styled.p`
  text-transform: capitalize;
  font-weight: bold;
  margin: 0;
  text-align: right;
  font-size: 16px;
  letter-spacing: 1.9px;
`;

export const WishListEditIcon = styled.i`
  color: ${secondaryColor};
  cursor: pointer;
  font-size: 20px;
  margin-left: 5px;

  &:hover {
    transform: scale(1.4);
  }
`;

export const WishListCreatedDate = styled.p`
  margin: 5px 0 0;
  font-size: 16px;
  letter-spacing: 1.9px;
  font-weight: bold;
`;

export const BackToWishListsBtn = styled(Button)`
  i {
    width: 13%;
  }
`;

export const WishListItemsTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: collapse;
`;

export const ItemTableData = styled.td`
  padding: 0.9em;
`;

export const WishListItemCategory = styled(ProductCategory)`
  cursor: pointer;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const WishListItemName = styled(ProductName)`
  cursor: pointer;
  letter-spacing: 2.3px;
  margin-top: 3px;

  &:hover {
    color: ${secondaryColor};
  }
`;

export const NoItemsText = styled.p`
  margin-top: auto;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1.5px;
`;

export const AddAllToCart = styled(AddToCartButton)`
  margin-top: 30px;
  width: fit-content;
`;