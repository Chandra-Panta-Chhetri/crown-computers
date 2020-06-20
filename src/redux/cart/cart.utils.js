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
