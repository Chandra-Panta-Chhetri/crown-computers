import React, { useEffect } from "react";
import {
  WishlistDetailContainer,
  BackToWishlistsBtn,
  WishlistTable,
  AddAllToCart
} from "./wishlist-detail.styles";
import {
  TableHeading,
  TableHeadingItem
} from "../cart-summary-items/cart-summary-items.styles";

import AddToCartButton from "../add-to-cart-btn/add-to-cart-btn.component";

import { connect } from "react-redux";
import {
  selectIsFetchingWishlists,
  selectWishlistData
} from "../../redux/wishlist/wishlist.selectors";
import { startWishlistFetchById } from "../../redux/wishlist/wishlist.actions";

const WishListDetail = ({
  match,
  isFetchingWishlist,
  wishlist,
  fetchWishlistById,
  history
}) => {
  const wishlistId = match.params.wishlistId;
  const { wishlistName, items, createdAt } = wishlist;

  useEffect(() => {
    //fetchWishlistById(wishlistId)
  }, [wishlistId]);

  return (
    <WishlistDetailContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start"
        }}
      >
        <BackToWishlistsBtn
          onClick={() => history.push("/wishlists")}
          isIconButton
          iconClass="fas fa-angle-double-left"
        >
          Back to all wishlists
        </BackToWishlistsBtn>
        <div>
          <p
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              margin: "0",
              textAlign: "right",
              fontSize: "16px",
              letterSpacing: "1.9px"
            }}
          >
            {wishlistName}
          </p>
          <p
            style={{
              margin: "5px 0 0",
              fontSize: "16px",
              letterSpacing: "1.9px",
              fontWeight: "bold"
            }}
          >
            <i className="far fa-calendar-alt"></i> Created On:{" "}
            {createdAt.toDateString()}
          </p>
        </div>
      </div>
      <WishlistTable>
        <TableHeading>
          <tr>
            <TableHeadingItem>Product</TableHeadingItem>
            <TableHeadingItem>Unit Price</TableHeadingItem>
            <TableHeadingItem>Left In Stock</TableHeadingItem>
            <TableHeadingItem></TableHeadingItem>
            <TableHeadingItem>Remove</TableHeadingItem>
          </tr>
        </TableHeading>
        <tbody>
          {items.map((wishlistItem, i) => {
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
                <td style={{ padding: "0.9em" }}>
                  <div style={{ display: "flex" }}>
                    <img
                      src={imageUrls[0]}
                      alt={name}
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "15px",
                        textAlign: "left"
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          cursor: "pointer"
                        }}
                        onClick={() =>
                          history.push(`/shop/category/${category}`)
                        }
                      >
                        {category}
                      </p>
                      <p
                        style={{ margin: "0", cursor: "pointer" }}
                        onClick={() => history.push(`/shop/${productId}`)}
                      >
                        {name}
                      </p>
                    </div>
                  </div>
                </td>
                <td>${price}</td>
                <td>{stock}</td>
                <td>
                  <AddToCartButton itemToAddOnClick={wishlistItem} />
                </td>
                <td>
                  <span
                    style={{
                      color: "red",
                      cursor: "pointer",
                      width: "fit-content"
                    }}
                  >
                    <i
                      className="fas fa-trash-alt"
                      style={{ fontSize: "22px" }}
                    ></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </WishlistTable>
      <AddAllToCart>Add All To Cart</AddAllToCart>
    </WishlistDetailContainer>
  );
};

const mapStateToProps = (state) => ({
  isFetchingWishlist: selectIsFetchingWishlists(state),
  wishlist: selectWishlistData(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchWishlistById: (wishlistId) =>
    dispatch(startWishlistFetchById(wishlistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(WishListDetail);
