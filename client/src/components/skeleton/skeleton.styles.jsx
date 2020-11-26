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

export const SkeletonContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  flex: ${(props) => (props.flexGrow ? "1 1 auto" : "none")};
  background: linear-gradient(
    -90deg,
    ${(props) => props.theme.primarySkeletonPulseColor} 0%,
    ${(props) => props.theme.secondarySkeletonPulseColor} 50%,
    ${(props) => props.theme.primarySkeletonPulseColor} 100%
  );
  background-size: 400% 400%;
  animation: pulse 1.2s ease-in infinite;
  ${pulseAnimation}
`;
