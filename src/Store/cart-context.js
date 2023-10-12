import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  orderDone: false,
});

export default CartContext;
