import styled, { css } from "styled-components";

const bottomLeft = css`
  bottom: 12px;
  left: 12px;
  transition: transform 0.6s ease-in;
  animation: toast-in-left 0.7s;

  @keyframes toast-in-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @media only screen and (max-width: 600px) {
    bottom: 2px;
    left: 5px;
    right: 15px;
    animation: toast-in-bottom 0.7s;

    @keyframes toast-in-bottom {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
  }
`;

const toast = css`
  width: 365px;
  color: #fff;
  padding: 20px 15px 10px 10px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const NotificationsContainer = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  position: fixed;
  z-index: 999999;
  pointer-events: none;
  ${bottomLeft}

  @media only screen and (max-width: 600px) {
    padding: 5px 10px 0;
    overflow-y: auto;
  }
`;

export const Notification = styled.div`
  background: #fff;
  transition: 0.3s ease;
  position: relative;
  pointer-events: auto;
  overflow: hidden;
  margin: 0 0 6px;
  padding: 30px;
  margin-bottom: 15px;
  width: 300px;
  max-height: 110px;
  border-radius: 6px;
  box-shadow: 0 0 1.6px #999;
  color: #000;
  background-position: 15px;
  background-repeat: no-repeat;
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    box-shadow: 0 0 12px #fff;
    opacity: 1;
    cursor: pointer;
  }

  ${toast}
  ${bottomLeft}
`;

export const NotificationBody = styled.div`
  display: flex;
  align-items: center;
`;

export const RemoveNotificationButton = styled.button`
  position: relative;
  right: -0.3em;
  top: -0.3em;
  float: right;
  font-weight: 700;
  color: #fff;
  outline: none;
  border: none;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.8;
  line-height: 1;
  font-size: 16px;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

export const NotificationImageContainer = styled.div`
  float: left;
  margin-right: 8px;
`;

export const NotificationTitle = styled.p`
  font-weight: 700;
  font-size: 16px;
  text-align: left;
  margin-top: 0;
  margin-bottom: 6px;
  width: 100%;
  height: 18px;
  text-transform: capitalize;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  text-align: left;
  margin-top: 10px;
`;
