import CART_ACTION_TYPES from "./cart.action.types";
const INITIALSTATE = {
  hidden: true,
  shoppingCart: [],
  numItemsInCart: 0
};

const increaseQuantity = (shoppingCart, itemToBeAdded) => {
  const index = shoppingCart.findIndex((item) => {
    return item.id === itemToBeAdded.id;
  });
  if (index === -1) {
    return [...shoppingCart, { ...itemToBeAdded, quantity: 1 }];
  }
  shoppingCart[index].quantity += 1;
  return [...shoppingCart];
};

const cartReducer = (prevState = INITIALSTATE, action) => {
  switch (action.type) {
    case CART_ACTION_TYPES.TOGGLE_CART_VISIBILITY:
      return {
        ...prevState,
        hidden: !prevState.hidden
      };
    case CART_ACTION_TYPES.ADD_TO_CART:
      return {
        ...prevState,
        numItemsInCart: prevState.numItemsInCart + 1,
        shoppingCart: increaseQuantity(prevState.shoppingCart, action.payload)
      };
    default:
      return prevState;
  }
};

export default cartReducer;
