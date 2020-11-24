import React from "react";
import {
  CollectionItemContainer,
  ItemImageContainer,
  ItemInfoContainer,
  ItemCategory,
  ItemPrice,
  ItemName
} from "../collection-item/collection-item.styles";

import Skeleton from "../skeleton/skeleton.component";

const CollectionItemSkeleton = () => (
  <CollectionItemContainer>
    <ItemImageContainer>
      <Skeleton height="250px" />
    </ItemImageContainer>
    <ItemInfoContainer>
      <ItemCategory isLoading>
        <Skeleton height="20px" width="100px" />
      </ItemCategory>
      <ItemName isLoading>
        <Skeleton height="40px" />
      </ItemName>
      <ItemPrice>
        <Skeleton height="15px" width="100px" />
      </ItemPrice>
    </ItemInfoContainer>
  </CollectionItemContainer>
);

export default CollectionItemSkeleton;
