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
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 9999;
  visibility: ${(props) => (props.isLoading ? "visible" : "hidden")};

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
  margin-left: -85px;
  width: 170px;
  height: 24px;
  text-align: center;
  ${loadingDotsAnimationStyles}
`;
