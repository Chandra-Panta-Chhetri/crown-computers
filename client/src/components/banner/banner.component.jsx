import React from "react";
import { BannerContainer, BannerDetail, BannerLabel } from "./banner.styles";

const ProductBannerLabel = ({ label, value }) => (
  <BannerContainer>
    <BannerLabel>{label}</BannerLabel>
    <BannerDetail>{value}</BannerDetail>
  </BannerContainer>
);

export default ProductBannerLabel;
