import React, {Fragment} from 'react'
import classes from './Header.module.css'
import CartBtn from './CartBtn'

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>DishDelight</h1>
            <CartBtn onClick={props.onClick}/>
        </header>
    </Fragment>
  )
}

export default Header