import React from "react";
import {
  WishlistsContainer,
  WishlistOverviewContainer,
  CreateWishlistBtn,
  NoWishlistsText
} from "./wishlist-overview.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";
import Modal from "../modal/modal.component";
import { useState } from "react";

const testWishlists = [
  {
    wishlistName: "Test",
    createdAt: new Date(),
    items: [
      {
        name: "Sample product Testing Some super long name",
        price: 35.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1235.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1000.0,
        imageUrl: "https://dummyimage.com/400"
      },
      {
        name: "Sample product Testing Some super long name",
        price: 1235.0,
        imageUrl: "https://dummyimage.com/400"
      }
    ]
  }
];

const WishListOverview = ({ wishlists = testWishlists }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const numOfWishlists = wishlists.length;
  return (
    <WishlistOverviewContainer>
      <CreateWishlistBtn isIconButton iconClass="fas fa-plus">
        New Wishlist
      </CreateWishlistBtn>
      <WishlistsContainer numberOfWishlists={numOfWishlists}>
        {wishlists.map(({ wishlistName, createdAt, items }, index) => (
          <WishlistPreview
            key={index}
            wishlistName={wishlistName}
            createdAt={createdAt}
            items={items}
          />
        ))}
        {!numOfWishlists && (
          <NoWishlistsText>
            It seems you have no wishlists. Create one using the button above!
          </NoWishlistsText>
        )}
      </WishlistsContainer>
    </WishlistOverviewContainer>
  );
};

export default WishListOverview;
