import React, { useContext, useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../Hooks/useInput";
import OrderPlacedIcon from "./OrderPlacedIcon";
import CartContext from "../../Store/cart-context";

const Checkout = (props) => {
  const [isLoading, setIsLoading] = useState("");
  const [isError, setisError] = useState();
  const cartCtx = useContext(CartContext)

  let formIsValid = false;
  const {
    inputValue: nameValue,
    valueIsValid: nameValueIsValid,
    hasError: nameInputIsInvalid,
    inputBlurHandler: nameInputBlur,
    inputChangeHandler: nameInputChange,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    inputValue: addressValue,
    valueIsValid: addressValueIsValid,
    hasError: addressInputIsInvalid,
    inputBlurHandler: addressInputBlur,
    inputChangeHandler: addressInputChange,
    reset: addressInputReset,
  } = useInput((value) => value.length > 4);

  const {
    inputValue: postalCodeValue,
    valueIsValid: postalCodeValueIsValid,
    hasError: postalCodeInputIsInvalid,
    inputBlurHandler: postalCodeInputBlur,
    inputChangeHandler: postalCodeInputChange,
    reset: postalCodeInputReset,
  } = useInput((value) => value.length > 3);

  const {
    inputValue: cityNameValue,
    valueIsValid: cityNameValueIsValid,
    hasError: cityNameInputIsInvalid,
    inputBlurHandler: cityNameInputBlur,
    inputChangeHandler: cityNameInputChange,
    reset: cityNameInputReset,
  } = useInput((value) => value.trim() !== "");

  if (
    nameValueIsValid &&
    addressValueIsValid &&
    cityNameValueIsValid &&
    postalCodeValueIsValid
  ) {
    formIsValid = true;
    console.log("executed", formIsValid);
  }

  const cartItems = cartCtx.cartItems;
  // console.log('component', formIsValid);
  // console.log(nameInputIsInvalid, cityNameInputIsInvalid, postalCodeInputIsInvalid, addressInputIsInvalid);
  let customerDetails = {};
  let orderDetails = {};
  const orderBody = [
    (customerDetails = {
      customerName: nameValue,
      deliveryAddress: addressValue,
      city: cityNameValue,
      postalCode: postalCodeValue,
    }),
    (orderDetails = {
      cartItems,
    }),
  ];

  const confirmHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    setIsLoading("loading");
    console.log(nameValue, addressValue, cityNameValue, postalCodeValue);
    try {
      const response = await fetch(
        "https://react-fetch-api-7d08a-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify(orderBody),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed Couldn't place the order, Try again");
      }

      setIsLoading("loaded");
      props.orderDone()
      setisError(null);
      nameInputReset();
      addressInputReset();
      postalCodeInputReset();
      cityNameInputReset();
      cartCtx.cartItems.splice(0)
    } catch (error) {
      setisError(error);
      setIsLoading("loaded");
    }
  };

  const nLoading = isLoading === "";
  const loading = isLoading === "loading";
  const loaded = isLoading === "loaded";

  const orderForm = (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input
          value={nameValue}
          onChange={nameInputChange}
          onBlur={nameInputBlur}
          placeholder={
            nameInputIsInvalid ? "Please enter your Name" : "Jon Doe"
          }
          type="text"
          id="name"
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          value={addressValue}
          onChange={addressInputChange}
          onBlur={addressInputBlur}
          placeholder={
            addressInputIsInvalid
              ? "Please enter your valid address"
              : "House 21, Street 43, California"
          }
          type="text"
          id="street"
        />
        <p>{addressInputIsInvalid ? "Please Enter a Valid Address" : ""} </p>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={postalCodeValue}
          onChange={postalCodeInputChange}
          onBlur={postalCodeInputBlur}
          placeholder="5432"
          type="number"
          id="postal"
        />
        <p>
          {postalCodeInputIsInvalid
            ? "Postel Code must be atleast 4 chracters long"
            : ""}{" "}
        </p>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          value={cityNameValue}
          onChange={cityNameInputChange}
          onBlur={cityNameInputBlur}
          placeholder={
            cityNameInputIsInvalid ? "Please enter City name" : "City"
          }
          type="text"
          id="city"
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          {loaded && isError ? "Try Again" : "Confirm"}
        </button>
      </div>
    </form>
  );


  return (
    <React.Fragment>
      {nLoading && orderForm}
      {loading && <p>Placing Order...</p>}
      {loaded && isError && (
        <p className={classes.error}>{isError.message}, Please try again!</p>
      )}
      {loaded && isError && orderForm}
      {loaded && !isError && (
        <div className={classes.orderPlaced}>
          <OrderPlacedIcon />
          <p>
            Your Order has been successfuly placed.
            <span onClick={props.onClick}> Continue Shoping</span>
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default Checkout;
