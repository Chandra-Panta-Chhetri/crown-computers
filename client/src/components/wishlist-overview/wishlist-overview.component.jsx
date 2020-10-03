import React from "react";
import { WishlistsContainer } from "./wishlist-overview.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";

const WishListOverview = ({ wishlists = [] }) => {
  return (
    <>
      <WishlistsContainer>
        {wishlists.map(({ wishlistName, createdAt, items }) => (
          <WishlistPreview
            wishlistName={wishlistName}
            createdAt={createdAt}
            items={items}
          />
        ))}
      </WishlistsContainer>
    </>
  );
};

export default WishListOverview;
