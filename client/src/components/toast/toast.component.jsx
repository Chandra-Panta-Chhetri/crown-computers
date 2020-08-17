import React, { useEffect } from "react";
import {
  NotificationsContainer,
  Notification,
  NotificationBody,
  NotificationImageContainer,
  NotificationMessage,
  NotificationTitle,
  RemoveNotificationButton
} from "./toast.styles";

import { connect } from "react-redux";
import { deleteNotificationById } from "../../redux/notification/notification.actions";
import { selectNotifications } from "../../redux/notification/notification.selectors";

const Toast = ({ toastList, deleteNotification, autoDelete, dismissTime }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length) {
        deleteNotification(toastList[0].id);
      }
    }, dismissTime);
    return () => {
      clearInterval(interval);
    };
  }, [autoDelete, dismissTime, toastList, deleteNotification]);

  return (
    <NotificationsContainer>
      {toastList.map((toast, i) => (
        <Notification key={i} backgroundColor={toast.backgroundColor}>
          <RemoveNotificationButton
            onClick={() => deleteNotification(toast.id)}
          >
            X
          </RemoveNotificationButton>
          <NotificationBody>
            <NotificationImageContainer>
              <i className={toast.iconClassName} />
            </NotificationImageContainer>
            <div>
              <NotificationTitle>{toast.title}</NotificationTitle>
              <NotificationMessage>{toast.message}</NotificationMessage>
            </div>
          </NotificationBody>
        </Notification>
      ))}
    </NotificationsContainer>
  );
};

const mapStateToProps = (state) => ({
  toastList: selectNotifications(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (id) => dispatch(deleteNotificationById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
