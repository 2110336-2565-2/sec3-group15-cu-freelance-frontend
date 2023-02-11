import React, { useReducer, useRef } from "react";
import tw from "twin.macro";
import { validate } from "./Validate.jsx";
import { useEffect } from "react";

const styles = {
  container: () => [tw`box-border flex flex-col w-full font-inter`],
  label: () => [tw`mb-2 font-light font-[16px]`],
  input: () => [
    tw`box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-inter`,
  ],
  textAreaInput: () => [
    tw`resize-none  box-border rounded-[10px] border-[#D62B70] border-[3px] font-light font-[20px] text-[F4B86A] p-[1%] font-inter`,
  ],
  inputSelect: () => [
    tw` box-border rounded-[10px] border-[#D62B70] border-[3px] font-light font-[20px] text-[#FFFFFF] bg-[#D62B70] p-[1%] font-inter`,
  ],
  inputOption: () => [
    tw`box-border rounded-[10px] border-[#D62B70] border-[3px] font-light font-[20px] text-[#D62B70] bg-[#FFFFFF] p-[1%] font-inter`,
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
  options,
  initialValue,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: initialValue || "",
    isValid: false,
    isFirstClick: false,
  });
  const { value, isValid } = state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const input =
    type === "textarea" ? (
      <textarea
        value={state.value}
        rows={10}
        css={styles.textAreaInput()}
        id={id}
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
      ></textarea>
    ) : type === "select" ? (
      <select
        css={styles.inputSelect()}
        id={id}
        value={state.value === "" ? "none" : state.value}
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
      >
        {options.map((option, idx) => {
          if (option.value === "none")
            return (
              <option
                key={idx}
                value={option.value}
                css={styles.inputOption()}
                disabled
                hidden
              >
                {option.label}
              </option>
            );
          else
            return (
              <option key={idx} value={option.value} css={styles.inputOption()}>
                {option.label}
              </option>
            );
        })}
      </select>
    ) : (
      <input
        css={styles.input()}
        id={id}
        type={type}
        placeholder={placeholder}
        value={state.value}
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
    );

  return (
    <div css={styles.container()}>
      <label css={styles.label()} htmlFor={id}>
        {label}
      </label>
      {input}
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
