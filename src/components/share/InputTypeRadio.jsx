import React from "react";
import tw from "twin.macro";
const styles = {
  container: () => [tw`box-border flex flex-col w-full font-ibm min-h-[84px]`],
  label: () => [tw`mb-2 font-light font-[16px] align-top font-ibm`],
  input: () => [
    tw`focus:outline-0 focus:border-[#D62B70] box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-ibm`,
  ],
  textAreaInput: () => [
    tw`focus:outline-0 resize-none  focus:border-[#D62B70] box-border rounded-[10px] border-[1px] font-light text-base text-[F4B86A] px-4 py-1 font-ibm`,
  ],
  inputSelect: () => [
    tw`focus:outline-0 box-border rounded-[10px] border-[1px] font-light font-[20px] text-freelance-black-primary p-2 font-ibm`,
  ],
  inputOption: () => [
    tw`box-border rounded-[10px] border-[#D62B70] border-[3px] font-light font-[20px] text-[#D62B70] bg-[#FFFFFF] p-[1%] font-ibm`,
  ],
  errorText: ({ isFirstClick, isValid }) => [
    tw`my-[1px] font-light text-red-700 text-xs`,
    (!isFirstClick || isValid) && tw`hidden`,
  ],
};
const InputTypeRadio = ({ label, value, selected, onChange }) => {
  return (
    <div tw="flex gap-x-2">
      <input
        type="radio"
        id={label}
        name={label}
        value={value}
        checked={selected === value}
        onChange={onChange.bind(null, value)}
      />
      <label htmlFor={label} tw="font-light">
        {label}
      </label>
    </div>
  );
};

export default InputTypeRadio;
