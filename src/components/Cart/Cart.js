import React, {useContext} from 'react';
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext)
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.cartItems.map((item) => (
        <CartItem key={item.id} name={item.name} price={item.price} amount={item.amount}/>
      ))}
    </ul>
  );

  const totalAmount = cartCtx.totalAmount.toFixed(2)

  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;