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
    left: 48%;
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
