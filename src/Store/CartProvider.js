import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
    cartItems: [],
    totalAmount: 0,
  };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItems = state.cartItems.concat(action.item);
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      cartItems: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return defaultState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartState] = useReducer(cartReducer, defaultState);

  const addItemToCart = (item) => {
    dispatchCartState({ type: "ADD", item: item });
  };
  const removeItemFromCart = (id) => {
    dispatchCartState({ type: "REMOVE", id: id });
  };

  const cartContext = {
    cartItems: cartState.cartItems,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
