import React from "react";
import {
  BackToWishlistsBtn,
  WishlistItemsTable,
  AddAllToCart,
  WishlistName,
  WishlistCreatedDate,
  ItemTableData,
  Header,
  WishlistItemCategory,
  WishlistItemName,
  WishlistEditIcon
} from "./wishlist-detail.styles";
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

import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";
import FullPageSpinner from "../full-page-spinner/full-page-spinner.component";

import { connect } from "react-redux";
import {
  selectIsFetchingWishlists,
  selectIsUpdatingWishlist,
  selectWishlistData,
  selectWishlistLoadingText
} from "../../redux/wishlist/wishlist.selectors";
import {
  removeFromWishlist,
  startWishlistFetchById
} from "../../redux/wishlist/wishlist.actions";
import useRedirect from "../../hooks/useRedirect.hook";

const WishListDetail = ({
  match,
  isFetchingWishlist,
  wishlist,
  fetchWishlistById,
  history,
  removeFromWishlist,
  isUpdatingWishlist,
  loadingText
}) => {
  const wishlistId = match.params.wishlistId;
  const { redirectComponent } = useRedirect(
    fetchWishlistById,
    [wishlistId],
    "/wishlists"
  );

  const { wishlistName, items, createdAt } = wishlist;

  return (
    <article>
      {redirectComponent}
      {!isFetchingWishlist && (
        <>
          <Header>
            <BackToWishlistsBtn
              onClick={() => history.push("/wishlists")}
              variant="no-border"
              iconClass="fas fa-angle-double-left"
            >
              Back to all wishlists
            </BackToWishlistsBtn>
            <div>
              <WishlistName>
                {wishlistName}{" "}
                <WishlistEditIcon className="fas fa-pencil-alt" />
              </WishlistName>
              <WishlistCreatedDate>
                <i className="far fa-calendar-alt" /> Created On:{" "}
                {createdAt && createdAt.toDateString()}
              </WishlistCreatedDate>
            </div>
          </Header>
          <WishlistItemsTable>
            <TableHeadings>
              <tr>
                <TableHeading>Product</TableHeading>
                <TableHeading>Unit Price</TableHeading>
                <TableHeading>Left In Stock</TableHeading>
                <TableHeading></TableHeading>
                <TableHeading>Remove</TableHeading>
              </tr>
            </TableHeadings>
            <tbody>
              {items &&
                items.map((wishlistItem, i) => {
                  const {
                    imageUrls,
                    price,
                    stock,
                    name,
                    category,
                    productId
                  } = wishlistItem;
                  return (
                    <tr key={i}>
                      <ItemTableData>
                        <ProductMetaInfo>
                          <ProductImage src={imageUrls[0]} alt={name} />
                          <ProductInfo>
                            <WishlistItemCategory
                              onClick={() =>
                                history.push(`/shop/category/${category}`)
                              }
                            >
                              {category}
                            </WishlistItemCategory>
                            <WishlistItemName
                              onClick={() => history.push(`/shop/${productId}`)}
                            >
                              {name}
                            </WishlistItemName>
                          </ProductInfo>
                        </ProductMetaInfo>
                      </ItemTableData>
                      <ItemTableData>${price}</ItemTableData>
                      <ItemTableData>{stock}</ItemTableData>
                      <ItemTableData>
                        <AddToCartButton itemToAddOnClick={wishlistItem} />
                      </ItemTableData>
                      <ItemTableData>
                        <RemoveItemButton
                          onClick={() =>
                            removeFromWishlist(
                              wishlistItem,
                              wishlist,
                              wishlistId
                            )
                          }
                        >
                          <Icon className="fas fa-trash-alt"></Icon>
                        </RemoveItemButton>
                      </ItemTableData>
                    </tr>
                  );
                })}
            </tbody>
          </WishlistItemsTable>
          {items && items.length > 0 && (
            <AddAllToCart>Add All To Cart</AddAllToCart>
          )}
        </>
      )}
      <FullPageSpinner
        isLoading={isUpdatingWishlist}
        loadingText={loadingText}
      />
    </article>
  );
};

const mapStateToProps = (state) => ({
  isFetchingWishlist: selectIsFetchingWishlists(state),
  wishlist: selectWishlistData(state),
  isUpdatingWishlist: selectIsUpdatingWishlist(state),
  loadingText: selectWishlistLoadingText(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishlistById: (wishlistId, onFail) =>
    dispatch(startWishlistFetchById(wishlistId, onFail)),
  removeFromWishlist: (item, wishlist, wishlistId) =>
    dispatch(removeFromWishlist(item, wishlist, wishlistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
