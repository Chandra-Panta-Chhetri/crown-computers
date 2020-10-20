import styled, { css } from "styled-components";
const pulseMainColor = "gainsboro";
const pulseSecondaryColor = "#f8f8f8";

export const pulseAnimation = css`
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -140% 0%;
    }
  }
`;

export const SkeletonContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  background: linear-gradient(
    -90deg,
    ${pulseMainColor} 0%,
    ${pulseSecondaryColor} 50%,
    ${pulseMainColor} 100%
  );
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  ${pulseAnimation}
`;
