import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const inputRef = useRef();
  const addCartHandler = (event) => {
    event.preventDefault();
  

  const amount = inputRef.current.value
  const amountnumber = +amount;

  if(amountnumber <= 0 || amountnumber > 5){
    return
  }

  props.onAddToCart(amountnumber)

};

  return (
    <form action="" onSubmit={addCartHandler} className={classes.form}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
