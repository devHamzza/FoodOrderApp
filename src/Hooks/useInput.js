import React, { useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
        return {
            value: action.value,
            isTouched: state.isTouched,
        }
    case 'BLUR':
      return {
        value: state.value,
        isTouched: true,
    }
    case 'RESET':
      return {
        value: '',
        isTouched: false,
    }
    default:
        return initialState
}
};

const useInput = (checkValidty) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const valueIsValid = checkValidty(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    inputValue: inputState.value,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
