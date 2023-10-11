import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [ourMeals, setOurMeals] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    setisLoading(true);
    fetch(
      "https://react-fetch-api-7d08a-default-rtdb.firebaseio.com/meals.json"
    )
      .then((response) => response.json())
      .then((mealsData) => {
        setOurMeals(mealsData);
        setisLoading(false);
      });
  }, []);

  console.log(ourMeals);

  const mealsList = ourMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p className={classes.loading}>Loading...</p>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
