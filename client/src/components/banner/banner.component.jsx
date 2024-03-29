import React from "react";
import { BannerContainer, BannerDetail, BannerLabel } from "./banner.styles";

const Banner = ({ label, value, className }) => (
  <BannerContainer className={className}>
    <BannerLabel>{label}</BannerLabel>
    <BannerDetail>{value}</BannerDetail>
  </BannerContainer>
);

export default Banner;
