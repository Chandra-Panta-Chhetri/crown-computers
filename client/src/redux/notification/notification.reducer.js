import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

const INITIAL_STATE = {
  notifications: [],
  id: 0
};

const notificationReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION:
    case NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION:
      return {
        ...prevState,
        notifications: [{ ...action.payload, id: prevState.id }],
        id: prevState.id + 1
      };
    case NOTIFICATION_ACTION_TYPES.DELETE_NOTIFICATION:
      return {
        ...prevState,
        notifications: prevState.notifications.filter(
          (notification) => notification.id !== action.payload
        )
      };
    default:
      return prevState;
  }
};

export default notificationReducer;
