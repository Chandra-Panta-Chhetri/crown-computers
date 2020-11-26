import styled from "styled-components";

export const BannerLabel = styled.span`
  color: gray;
  text-transform: capitalize;
`;

export const BannerContainer = styled.div`
  display: flex;
  border-bottom: 2px solid ${(props) => props.theme.primaryBorderColor};
  padding: 8px 0;

  @media only screen and (max-width: 500px) {
    flex-direction: column;

    ${BannerLabel} {
      margin-bottom: 5px;
    }
  }
`;

export const BannerDetail = styled.span`
  color: rgba(26, 32, 44, 1);
  margin-left: auto;
`;
