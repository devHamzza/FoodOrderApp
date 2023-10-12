import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [orderDone, setOrderDone] = useState(false);
  const [orderForm, setorderForm] = useState(false);
  const cartCtx = useContext(CartContext);

  const itemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  console.log(cartCtx.cartItems);
  const placeOrder = () => {
    setorderForm(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={itemAddHandler.bind(null, item)}
          onRemove={itemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  let hasCartItems = cartCtx.cartItems.length !== 0;

  const checkIfOrderDone = () => {
    setOrderDone(true);
  };

  return (
    <Modal onClick={props.onClose}>
      {!orderForm && cartItems}
      {!orderDone && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>${totalAmount}</span>
        </div>
      )}
      {orderForm && (
        <Checkout orderDone={checkIfOrderDone} onClick={props.onClose} />
      )}
      {!orderForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          <button
            disabled={!hasCartItems}
            className={classes.button}
            onClick={placeOrder}
          >
            Order
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Cart;
