import styled, { css } from "styled-components";

export const spinAnimationKeyframe = css`
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;

export const loadingDotsAnimationStyles = css`
  &:after {
    content: " .";
    animation: dots 1s steps(5, end) infinite;
  }
  @keyframes dots {
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: black;
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
    }
  }
`;

export const SpinnerTextStyles = css`
  font-size: 18px;
  font-weight: 600;
  color: black;
`;

export const SpinnerStyles = css`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(195, 195, 195, 0.8);
  border-radius: 50%;
  border-top-color: #636767;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
`;

export const SpinnerOverlay = styled.div`
  height: 85vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SpinnerContainer = styled.div`
  display: inline-block;
  ${SpinnerStyles}
  ${spinAnimationKeyframe}
`;

export const SpinnerText = styled.p`
  ${SpinnerTextStyles}
  margin-top: 10px;
  ${loadingDotsAnimationStyles}
`;
