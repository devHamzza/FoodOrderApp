import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../Store/cart-context";
import Card from "../../UI/Card";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };

  return (
    <Card>
      <li className={classes.meal}>
        <div className={classes.mealImg}>
          <img src={props.image} alt="" />
        </div>
        <div className={classes.itemText}>
          <div>
            <h3>{props.name}</h3>
            <p className={classes.description}>{props.description}</p>
          </div>
          <p className={classes.price}>{price}</p>
        </div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler} />
        </div>
      </li>
    </Card>
  );
};

export default MealItem;
