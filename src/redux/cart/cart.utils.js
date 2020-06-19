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
