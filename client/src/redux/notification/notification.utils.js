export const deleteNotificationById = (notifications, idToDelete) =>
  notifications.filter((notification) => notification.id !== idToDelete);
