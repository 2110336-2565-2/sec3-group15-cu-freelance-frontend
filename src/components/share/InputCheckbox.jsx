import tw from "twin.macro";
import React, { useState, useEffect } from "react";

const CheckboxContainer = tw.div`w-full flex flex-col mb-2`;
const Checkbox = tw.input``;
const Header = tw.div`mb-2   dt:text-[16px] align-top flex font-ibm`;

const InputCheckBox = ({
  initialValue,
  initialValid,
  dataCheckboxs,
  id,
  onInput,
  label,
  required,
  requiredText,
}) => {
  const [checkboxsValue, setCheckboxValue] = useState(
    initialValue ? initialValue : []
  );
  const [isValid, setIsValid] = useState(initialValid ? initialValid : false);

  const clickCheckboxHandler = (e) => {
    if (checkboxsValue.includes(e.target.value)) {
      const newCheckboxsValue = checkboxsValue.filter(
        (checkboxValue) => checkboxValue != e.target.value
      );
      setCheckboxValue(newCheckboxsValue);
      if (newCheckboxsValue.length === 0) setIsValid(false);
    } else {
      setCheckboxValue((prev) => [...prev, e.target.value]);
      setIsValid(true);
    }
  };

  useEffect(() => {
    onInput(id, checkboxsValue, isValid);
  }, [id, checkboxsValue, isValid, onInput]);

  //   console.log(checkboxsValue);
  return (
    <CheckboxContainer>
      <Header>
        {label}
        {required && (
          <>
            {/* <span tw="text-red-700">*</span> */}
            <span tw="text-[12px] dt:text-[14px] text-red-700">
              *{requiredText}
            </span>
          </>
        )}
      </Header>
      {dataCheckboxs.map((dataCheckbox) => (
        <div tw="flex gap-x-2">
          <Checkbox
            id={dataCheckbox.label}
            value={dataCheckbox.value}
            type="checkbox"
            checked={checkboxsValue.includes(dataCheckbox.value)}
            onChange={clickCheckboxHandler}
          />
          <label htmlFor={dataCheckbox.label}>{dataCheckbox.label}</label>
        </div>
      ))}
    </CheckboxContainer>
  );
};

export default InputCheckBox;
