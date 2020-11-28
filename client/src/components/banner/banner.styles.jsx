import styled from "styled-components";

export const BannerLabel = styled.span`
  color: ${(props) => props.theme.textColor};
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
  color: ${(props) => props.theme.textColor};
  margin-left: auto;
`;
