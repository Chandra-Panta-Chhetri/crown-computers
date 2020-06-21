export const addToCart = (shoppingCart, itemToBeAdded) => {
  const index = shoppingCart.findIndex((item) => {
    return item.id === itemToBeAdded.id;
  });
  if (index === -1) {
    return [...shoppingCart, { ...itemToBeAdded, quantity: 1 }];
  }
  shoppingCart[index].quantity += 1;
  return [...shoppingCart];
};

export const removeFromCart = (shoppingCart, itemToBeRemoved) =>
  shoppingCart.filter((item) => item.id !== itemToBeRemoved.id);

export const changeItemQuantity = (shoppingCart, { item, newQuantity }) => {
  if (newQuantity <= 0) {
    return removeFromCart(shoppingCart, item);
  }
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (itemIndex !== -1) {
    shoppingCart[itemIndex] = { ...item, quantity: newQuantity };
  }
  return [...shoppingCart];
};
