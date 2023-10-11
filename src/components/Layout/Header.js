import React, {Fragment} from 'react'
import classes from './Header.module.css'
import CartBtn from './CartBtn'

const Header = (props) => {
  return (
    <Fragment>
        <header className='flex text-[#2a2829] bg-white justify-between px-10 py-4 items-center'>
            <h1 className='text-4xl font-bold'>Eco<span className='text-[#6f9639]'>Food</span></h1>
            <CartBtn onClick={props.onClick}/>
        </header>
        <div className={classes["main-image"]}>
            <img src="https://github.com/academind/react-complete-guide-code/blob/11-practice-food-order-app/extra-files/meals.jpg?raw=true" alt="Delicious Meals Image" />
        </div>
    </Fragment>
  )
}

export default Header