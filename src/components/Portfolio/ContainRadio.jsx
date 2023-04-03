import tw from "twin.macro";
import React, { useEffect, useState } from "react";
import InputTypeRadio from "../share/InputTypeRadio";
import { DUMMY_duration_options } from "../../store/portfolioForm";

const Header = tw.div`flex`;
const Container = tw.div`flex flex-col flex-wrap items-start h-[90px] gap-y-[5%]`;

const styles = {
  label: () => [tw`mb-2 font-light font-[16px] align-top font-ibm`],
  errorText: ({ isValid }) => [
    tw`my-[1px] font-light text-red-700 text-xs`,
    isValid && tw`hidden`,
  ],
};
const ContainRadio = ({
  initialValue,
  initialValid,
  onInput,
  id,
  errorText,
}) => {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(initialValid);
  const handleChangeRadio = (value) => {
    setValue(value);
    setIsValid(true);
  };
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  return (
    <div tw="w-full h-full">
      <Header>
        <div css={styles.label()}>
          ระยะเวลา <span tw="text-red-700 ">*</span>
        </div>
        <div css={styles.errorText({ isValid: isValid })}>{errorText}</div>
      </Header>
      <Container>
        {DUMMY_duration_options.map((option, idx) => (
          <InputTypeRadio
            key={idx}
            label={option.label}
            value={option.value}
            selected={value}
            onChange={handleChangeRadio}
          />
        ))}
      </Container>
    </div>
  );
};

export default ContainRadio;
