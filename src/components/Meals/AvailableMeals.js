import React, { useState, useEffect } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [ourMeals, setOurMeals] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState();

  useEffect(() => {
    setisLoading(true);
    async function fetchData() {
      try {
        const response = await fetch("https://react-fetch-api-7d08a-default-rtdb.firebaseio.com/meals.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const mealsData = await response.json();
        setOurMeals(mealsData);
        setisLoading(false);
      } catch (error) {
        setIsError(error.message);
      }
    }
    
    fetchData();
    
  }, []);

  // console.log(ourMeals);

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
        {isLoading && !isError && <p className={classes.loading}>Loading...</p>}
        {isError && <p className={classes.loading}>{isError}</p>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
