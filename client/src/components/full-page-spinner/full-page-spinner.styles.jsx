import styled from "styled-components";
import {
  spinAnimationKeyframe,
  loadingDotsAnimationStyles,
  SpinnerTextStyles,
  SpinnerStyles
} from "../spinner/spinner.styles";

export const FullPageSpinnerContainer = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.overlayBackgroundColor};
  z-index: 9999;
  display: ${(props) => (props.isLoading ? "block" : "none")};

  &::after {
    content: "";
    display: block;
    position: absolute;
    margin-left: -25px;
    left: 50%;
    top: 40%;
    ${SpinnerStyles}
  }
  ${spinAnimationKeyframe}
`;

export const FullPageSpinnerText = styled.p`
  ${SpinnerTextStyles}
  z-index: 9999;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -130px;
  width: 270px;
  height: 24px;
  text-align: center;
  text-transform: capitalize;
  ${loadingDotsAnimationStyles}
`;
