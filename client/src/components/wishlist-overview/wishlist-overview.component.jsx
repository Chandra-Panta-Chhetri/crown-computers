import React from "react";
import {
  WishlistsContainer,
  WishlistOverviewContainer,
  CreateWishlistBtn,
  NoWishlistsText
} from "./wishlist-overview.styles";

import WishlistPreview from "../wishlist-preview/wishlist-preview.component";

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
  },
  { wishlistName: "Test 2", createdAt: new Date(), items: [] },
  { wishlistName: "Test 3", createdAt: new Date(), items: [] },
  { wishlistName: "Test 4", createdAt: new Date(), items: [] },
  { wishlistName: "Test 5", createdAt: new Date(), items: [] }
];

const WishListOverview = ({ wishlists = testWishlists }) => {
  const numOfWishlists = wishlists.length;
  return (
    <WishlistOverviewContainer>
      <CreateWishlistBtn>
        <i className="fas fa-list"></i> Create New Wishlist
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
