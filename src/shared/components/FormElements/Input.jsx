import React, { useEffect, useReducer } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    isTouched: false,
    isValid: props.initialValid || false,
    value: props.initialValue || "",
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        onBlur={touchHandler}
        onChange={changeHandler}
        placeholder={props.placeholder}
        type={props.type}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        onBlur={touchHandler}
        onChange={changeHandler}
        rows={props.rows || 3}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};
