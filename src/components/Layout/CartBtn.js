import React, {useContext} from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './CartBtn.module.css'
import CartContext from '../../Store/cart-context'

const CartBtn = (props) => {
  const cartCtx = useContext(CartContext)
  const cartItems = cartCtx.cartItems.length
  return (
   <button className={classes.button} onClick={props.onClick}>
    <span className={classes.icon}>
        <CartIcon/>
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{cartItems}</span>
   </button>
  )
}

export default CartBtn