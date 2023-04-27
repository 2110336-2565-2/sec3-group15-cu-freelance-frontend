import React, { useReducer, useRef } from "react";
import tw from "twin.macro";
import { validate } from "./Validate.jsx";
import { useEffect } from "react";

const styles = {
  container: ({isTextArea,rows}) => [
    tw`box-border flex flex-col w-full font-inter min-h-[84px]`,
    isTextArea&&rows!==7&&tw`min-h-[300px]`,
    isTextArea&&rows===7&&tw`min-h-[230px]`
  ],
  label: () => [tw`mb-2   dt:text-[16px] align-top font-ibm`],
  input: () => [
    tw`focus:outline-0 focus:border-[#D62B70] box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-ibm`,
  ],
  textAreaInput: () => [
    tw`focus:outline-0 resize-none  focus:border-[#D62B70] box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-ibm`,
  ],
  inputSelect: () => [
    tw`focus:outline-0 box-border rounded-[10px] border-[1px] font-light text-base text-freelance-black-primary px-4 py-1 font-ibm`,
  ],
  inputOption: () => [
    tw` font-[20px] text-freelance-black-primary p-[1%] font-light font-ibm`,
  ],
  errorText: ({ isFirstClick, isValid }) => [
    tw`my-[1px] font-light text-red-700 text-sm font-ibm`,
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
  initialValid,
  min,
  step,
  required,
  rows = 10,
  keyDownHandler,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    value: initialValue || "",
    isValid: initialValid || false,
    isFirstClick: false,
  });
  const { value, isValid } = state;

  const onKeyDown = (event) => {
    if (event.key == "Enter") {
      keyDownHandler();
    }
  }

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const input =
    type === "textarea" ? (
      <textarea
        value={state.value}
        rows={rows}
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
        min={min}
        step={step}
        onKeyDown={onKeyDown}
      ></input>
    );

  return (
    <div css={styles.container({isTextArea:type==="textarea",rows})}>
      <label css={styles.label()} htmlFor={id}>
        {label}
        {required && <span className="text-red-700 ">*</span>}
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
    </div >
  );
};

export default Input;
