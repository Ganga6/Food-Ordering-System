import { ADD_TO_CART, REMOVE_FROM_CART } from "../types";

export const addToCart = (food) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === food._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...food, count: 1 });
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (food) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== food._id);
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};