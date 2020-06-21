export const addToCart = (shoppingCart, item) => {
  const itemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  if (itemIndex === -1) {
    return [...shoppingCart, { ...item, quantity: 1 }];
  }
  const prevQuantity = shoppingCart[itemIndex].quantity;
  shoppingCart[itemIndex] = { ...item, quantity: prevQuantity + 1 };
  return [...shoppingCart];
};

export const removeFromCart = (shoppingCart, item) =>
  shoppingCart.filter((cartItem) => cartItem.id !== item.id);

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
