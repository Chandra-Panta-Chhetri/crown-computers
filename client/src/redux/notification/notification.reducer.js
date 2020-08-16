import NOTIFICATION_ACTION_TYPES from "./notification.action.types";
import { removeNotificationById } from "./notification.utils";

const INITIAL_STATE = {
  notifications: [],
  autoDelete: true,
  dismissTime: 2000,
  position: "bottom-left"
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION:
      return {
        ...prevState,
        notifications: [...prevState.notifications, action.payload]
      };
    case NOTIFICATION_ACTION_TYPES.DELETE_NOTIFICATION:
      return {
        ...prevState,
        notifications: removeNotificationById(
          prevState.notifications,
          idOfNotification
        )
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
