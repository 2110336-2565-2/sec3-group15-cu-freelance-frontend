import tw from "twin.macro";
import React from "react";
import { VALIDATOR_REQUIRE, VALIDATOR_PRICE } from "../share/Validate";
import { DUMMY_options } from "../../store/portfolioForm";
import Input from "../share/Input";
import ContainRadio from "./ContainRadio";

const CreatePortForm2 = ({ inputHandler, initialValue }) => {
  if (!initialValue) return;
  return (
    <div tw="w-[90%] h-full flex flex-col items-center">
      <Input
        type="select"
        id="category"
        label="หมวดหมู่"
        options={DUMMY_options}
        onInput={inputHandler}
        errorText="โปรดเลือกหมวดหมู่"
        initialValue={initialValue.inputs.category.value}
        initialValid={initialValue.inputs.category.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
      <Input
        type="number"
        id="price"
        label="Price"
        placeholder="ใส่ราคาที่นี่..."
        errorText="โปรดกรอกราคา"
        onInput={inputHandler}
        initialValue={initialValue.inputs.price.value}
        initialValid={initialValue.inputs.price.isValid}
        validator={[VALIDATOR_REQUIRE(), VALIDATOR_PRICE()]}
        min="0"
        step=".01"
        required
      />
      <ContainRadio
        id="duration"
        onInput={inputHandler}
        errorText={"โปรดระบุระยะเวลา"}
        initialValue={initialValue.inputs.duration.value}
        initialValid={initialValue.inputs.duration.isValid}
      />
    </div>
  );
};

export default CreatePortForm2;

// initialValue,
// initialValid,
// onInput,
// id,
// errorText,
