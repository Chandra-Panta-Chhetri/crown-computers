export const deleteNotificationById = (notifications, idToDelete) => {
  console.log(notifications, idToDelete);

  const newArr = notifications.filter(
    (notification) => notification.id !== idToDelete
  );
  console.log(newArr);
  return newArr;
};
