import styled from "styled-components";
import { mainBorderColor } from "../../global.styles";

export const BannerContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${mainBorderColor};
  padding: 8px 0;
`;

export const BannerLabel = styled.span`
  color: gray;
  text-transform: capitalize;
`;

export const BannerDetail = styled.span`
  color: rgba(26, 32, 44, 1);
  margin-left: auto;
`;
