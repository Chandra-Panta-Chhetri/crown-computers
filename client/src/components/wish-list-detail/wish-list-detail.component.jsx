import React, { useState } from "react";
import {
  BackToWishListsBtn,
  WishListItemsTable,
  AddAllToCart,
  WishListName,
  WishListCreatedDate,
  ItemTableData,
  Header,
  WishListItemCategory,
  WishListItemName,
  WishListEditIcon,
  WishListDetailContainer,
  NoItemsText,
  AddItemToCartBtn,
  ResponsiveTableContainer
} from "./wish-list-detail.styles";
import {
  TableHeadings,
  TableHeading
} from "../cart-summary-items/cart-summary-items.styles";
import {
  ProductMetaInfo,
  ProductImage,
  ProductInfo,
  RemoveItemButton,
  Icon
} from "../cart-summary-item/cart-summary-item.styles";

import FullPageSpinner from "../full-page-spinner/full-page-spinner.component";
import CreateWishListModal from "../create-wish-list-modal/create-wish-list-modal.component";
import WishListDetailSkeleton from "../wish-list-detail-skeleton/wish-list-detail-skeleton.component";

import { connect } from "react-redux";
import {
  selectIsFetchingWishLists,
  selectIsUpdatingWishList,
  selectWishListData,
  selectWishListLoadingText
} from "../../redux/wish-list/wish-list.selectors";
import {
  removeFromWishList,
  startWishListFetchById
} from "../../redux/wish-list/wish-list.actions";
import { createStructuredSelector } from "reselect";
import useRedirect from "../../hooks/useRedirect.hook";

const WishListDetail = ({
  fetchWishListById,
  isFetchingWishList,
  wishList,
  match,
  history,
  removeFromWishList,
  isUpdatingWishList,
  loadingText
}) => {
  const wishListId = match.params.wishListId;
  const { redirectComponent } = useRedirect(
    fetchWishListById,
    [wishListId],
    "/wish-lists"
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { wishListName, items, createdAt } = wishList;
  const hasItemsInWishList = (items || []).length > 0;

  if (isFetchingWishList) {
    return <WishListDetailSkeleton />;
  }

  return (
    <WishListDetailContainer>
      {redirectComponent}
      <Header>
        <BackToWishListsBtn
          onClick={() => history.push("/wish-lists")}
          variant="no-border"
          iconClass="fas fa-angle-double-left"
        >
          Back to all wish lists
        </BackToWishListsBtn>
        <div>
          <WishListName>
            {wishListName}
            <WishListEditIcon
              className="fas fa-pencil-alt"
              onClick={() => setIsEditModalOpen(true)}
            />
          </WishListName>
          <WishListCreatedDate>
            <i className="far fa-calendar-alt" /> Created On:{" "}
            {createdAt && createdAt.toDateString()}
          </WishListCreatedDate>
        </div>
      </Header>
      {}
      {(items || []).length === 0 && (
        <NoItemsText>
          It seems you have no items in your wish list. Add items using the shop
          page!
        </NoItemsText>
      )}
      {hasItemsInWishList && (
        <ResponsiveTableContainer>
          <WishListItemsTable>
            <TableHeadings>
              <tr>
                <TableHeading>Product</TableHeading>
                <TableHeading>Unit Price</TableHeading>
                <TableHeading>In Stock</TableHeading>
                <TableHeading></TableHeading>
                <TableHeading>Remove</TableHeading>
              </tr>
            </TableHeadings>
            <tbody>
              {(items || []).map((wishListItem, index) => (
                <tr key={index}>
                  <ItemTableData>
                    <ProductMetaInfo>
                      <ProductImage
                        src={wishListItem.imageUrls[0]}
                        alt={wishListItem.name}
                      />
                      <ProductInfo>
                        <WishListItemCategory
                          onClick={() =>
                            history.push(
                              `/shop/category/${wishListItem.category}`
                            )
                          }
                        >
                          {wishListItem.category}
                        </WishListItemCategory>
                        <WishListItemName
                          onClick={() =>
                            history.push(`/shop/${wishListItem.productId}`)
                          }
                        >
                          {wishListItem.name}
                        </WishListItemName>
                      </ProductInfo>
                    </ProductMetaInfo>
                  </ItemTableData>
                  <ItemTableData>${wishListItem.price}</ItemTableData>
                  <ItemTableData>{wishListItem.stock}</ItemTableData>
                  <ItemTableData>
                    <AddItemToCartBtn itemsToAddOnClick={[wishListItem]} />
                  </ItemTableData>
                  <ItemTableData>
                    <RemoveItemButton
                      onClick={() => removeFromWishList(wishListItem, wishList)}
                    >
                      <Icon className="fas fa-trash-alt"></Icon>
                    </RemoveItemButton>
                  </ItemTableData>
                </tr>
              ))}
            </tbody>
          </WishListItemsTable>
        </ResponsiveTableContainer>
      )}
      {hasItemsInWishList && (
        <AddAllToCart itemsToAddOnClick={items} label="Add All To Cart" />
      )}
      {isEditModalOpen && (
        <CreateWishListModal
          isEditingWishList
          closeModalHandler={() => setIsEditModalOpen(false)}
          modalTitle="Edit Wish List"
          defaultWishList={wishList}
        />
      )}
      <FullPageSpinner
        isLoading={isUpdatingWishList}
        loadingText={loadingText}
      />
    </WishListDetailContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetchingWishList: selectIsFetchingWishLists,
  wishList: selectWishListData,
  isUpdatingWishList: selectIsUpdatingWishList,
  loadingText: selectWishListLoadingText
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishListById: (wishListId, onFail) =>
    dispatch(startWishListFetchById(wishListId, onFail)),
  removeFromWishList: (item, wishList) =>
    dispatch(removeFromWishList(item, wishList))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
