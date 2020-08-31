import NOTIFICATION_ACTION_TYPES from "./notification.action.types";

export const addSuccessNotification = (title, message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_SUCCESS_NOTIFICATION,
  payload: {
    message,
    title,
    backgroundColor: "#5cb85c",
    iconClassName: "fas fa-check-circle fa-2x"
  }
});

export const addErrorNotification = (title, message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_ERROR_NOTIFICATION,
  payload: {
    message,
    title,
    backgroundColor: "#d9534f",
    iconClassName: "fas fa-exclamation-circle fa-2x"
  }
});

export const addInfoNotification = (title, message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_INFO_NOTIFICATION,
  payload: {
    message,
    title,
    backgroundColor: "#5bc0de",
    iconClassName: "fas fa-info-circle fa-2x"
  }
});

export const addWarningNotification = (title, message) => ({
  type: NOTIFICATION_ACTION_TYPES.ADD_WARNING_NOTIFICATION,
  payload: {
    message,
    title,
    backgroundColor: "#f0ad4e",
    iconClassName: "fas fa-exclamation-triangle fa-2x"
  }
});

export const deleteNotificationById = (id) => ({
  type: NOTIFICATION_ACTION_TYPES.DELETE_NOTIFICATION,
  payload: id
});
