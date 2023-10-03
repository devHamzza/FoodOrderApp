import React, {Fragment} from 'react'
import classes from './Header.module.css'
import CartBtn from './CartBtn'

const Header = (props) => {
  return (
    <Fragment>
        <header className={classes.header}>
            <h1>GetMeal</h1>
            <CartBtn onClick={props.onClick}/>
        </header>
        <div className={classes["main-image"]}>
            <img src="https://github.com/academind/react-complete-guide-code/blob/11-practice-food-order-app/extra-files/meals.jpg?raw=true" alt="Delicious Meals Image" />
        </div>
    </Fragment>
  )
}

export default Header