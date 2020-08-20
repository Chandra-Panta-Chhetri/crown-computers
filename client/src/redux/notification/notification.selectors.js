import { createSelector } from "reselect";

const selectNotification = (state) => state.notification;

export const selectNotifications = createSelector(
  [selectNotification],
  (notification) => notification.notifications
);

export const selectLatestId = createSelector(
  [selectNotification],
  (notification) => notification.id
);
