export const removeNotificationById = (notifications, idToDelete) => {
  const index = list.findIndex((e) => e.id === id);
  list.splice(index, 1);
  setList([...list]);
};
