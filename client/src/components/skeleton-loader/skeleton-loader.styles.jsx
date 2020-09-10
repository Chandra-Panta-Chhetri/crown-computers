import styled, { css } from "styled-components";

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

export const SkeletonLoaderContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -90deg,
    gainsboro 0%,
    #f8f8f8 50%,
    gainsboro 100%
  );
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  ${pulseAnimation}
`;
