import React, { useEffect } from "react";
import "./toast.styles.scss";

import { connect } from "react-redux";
import { deleteNotificationById } from "../../redux/notification/notification.actions";
import { selectNotifications } from "../../redux/notification/notification.selectors";

const Toast = ({
  toastList,
  position,
  deleteNotification,
  autoDelete,
  dismissTime
}) => {
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
    <div className={`notification-container ${position}`}>
      {toastList.map((toast, i) => (
        <div
          key={i}
          className={`notification toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button onClick={() => deleteNotification(toast.id)}>X</button>
          <div className="notification-body">
            <div className="notification-image">
              <i className={toast.iconClassName} />
            </div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  toastList: selectNotifications(state)
});

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (id) => dispatch(deleteNotificationById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
