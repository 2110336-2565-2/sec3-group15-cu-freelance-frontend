import tw from "twin.macro";
import React from "react";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import Input from "../share/Input";

const CreatePortForm1 = ({ inputHandler, initialValue }) => {
  if (!initialValue) return;
  return (
    <div tw="w-[90%]">
      <Input
        type="text"
        id="portfolioName"
        label="หัวข้องาน"
        placeholder="ใส่หัวข้องานที่นี่..."
        errorText="โปรดกรอกหัวข้องาน"
        onInput={inputHandler}
        initialValue={initialValue.inputs.portfolioName.value}
        initialValid={initialValue.inputs.portfolioName.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
      <Input
        type="textarea"
        id="description"
        label="รายละเอียดงาน"
        placeholder="ใส่รายละเอียดงานที่นี่..."
        errorText="โปรดกรอกคำอธิบาย"
        onInput={inputHandler}
        initialValue={initialValue.inputs.portfolioName.value}
        initialValid={initialValue.inputs.portfolioName.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
    </div>
  );
};

export default CreatePortForm1;
