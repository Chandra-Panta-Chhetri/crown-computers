import styled from "styled-components";

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

  &::after {
    content: "";
    display: block;
    position: absolute;
    margin-left: -25px;
    left: 50%;
    top: 40%;
    width: 50px;
    height: 50px;
    border: 4px solid rgba(195, 195, 195, 0.8);
    border-radius: 50%;
    border-top-color: #636767;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }
`;

export const FullPageSpinnerText = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: black;
  z-index: 9999;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -85px;
  width: 170px;
  height: 24px;
  text-align: center;

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
