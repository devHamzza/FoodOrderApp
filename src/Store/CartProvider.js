import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultState = {
  cartItems: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.cartItems.concat(action.item);
    }
    return {
      cartItems: updatedItems,
      totalAmount: updatedAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.cartItems.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.cartItems];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      cartItems: updatedItems,
      totalAmount: updatedTotalAmount,
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
