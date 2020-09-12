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
    <ItemImageContainer isLoading>
      <Skeleton />
    </ItemImageContainer>
    <ItemInfoContainer>
      <ItemCategory isLoading>
        <Skeleton />
      </ItemCategory>
      <ItemName isLoading>
        <Skeleton />
      </ItemName>
      <ItemPrice isLoading>
        <Skeleton />
      </ItemPrice>
    </ItemInfoContainer>
  </CollectionItemContainer>
);

export default CollectionItemSkeleton;
