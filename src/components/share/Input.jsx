import React, { useReducer } from "react";
import tw from "twin.macro";
import { validate } from "./Validate.jsx";
import { useEffect } from "react"

const styles = {
  container: () => [tw`box-border flex flex-col w-full font-inter`],
  label: () => [tw`mb-2 font-light font-[16px]`],
  input: () => [
    tw`box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-inter`,
  ],
  errorText: ({ isFirstClick, isValid }) => [
    tw`my-[1px] font-light text-red-700 text-xs`,
    (!isFirstClick || isValid) && tw`hidden`,
  ],
};
function reducer(state, action) {
  if (action.type == "CHANGE") {
    return {
      ...state,
      value: action.value,
      isValid: validate(action.value, action.validator),
    };
  } else if (action.type == "TOUCH") {
    return {
      ...state,
      isFirstClick: true,
    };
  }
}

const Input = ({
  type,
  id,
  label,
  placeholder,
  errorText,
  validator,
  onInput,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: "",
    isValid: false,
    isFirstClick: false,
  });
  const {value,isValid} =state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  return (
    <div css={styles.container()}>
      <label css={styles.label()} htmlFor={id}>
        {label}
      </label>
      <input
        css={styles.input()}
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          dispatch({
            type: "CHANGE",
            value: e.target.value,
            validator: validator,
          });
        }}
        onFocus={() => {
          dispatch({ type: "TOUCH" });
        }}
      ></input>
      <div
        css={styles.errorText({
          isFirstClick: state.isFirstClick,
          isValid: state.isValid,
        })}
      >
        {errorText}
      </div>
    </div>
  );
};

export default Input;
