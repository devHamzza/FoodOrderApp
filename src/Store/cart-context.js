import React from "react";

const CartContext = React.createContext({
  cartItems: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
});

export default CartContext;
