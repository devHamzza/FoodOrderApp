import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./CartBtn.module.css";
import CartContext from "../../Store/cart-context";

const CartBtn = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnHighlight, setBtnHighlight] = useState(false);

  const { cartItems } = cartCtx;
  const cartItemsL = cartItems.length;

  const buttonClasses = `${classes.button} ${btnHighlight ? classes.bump : ""}`;
  useEffect(() => {
    if (cartItemsL === 0) {
      return;
    }

    setBtnHighlight(true);

    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartItems, cartItemsL]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemsL}</span>
    </button>
  );
};

export default CartBtn;
