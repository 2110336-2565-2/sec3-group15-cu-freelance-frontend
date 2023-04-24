import React from "react";
import tw from "twin.macro";
import Input from "../../share/Input";
import { VALIDATOR_REQUIRE } from "../../share/Validate";

const IssueReportForm1 = ({ inputHandler, initialValue }) => {
  return (
    <>
      <Input
        type="text"
        id="name"
        label="หัวข้อปัญหา"
        placeholder="ใส่หัวข้อปัญหาที่นี่..."
        errorText="โปรดกรอกหัวข้อปัญหา"
        onInput={inputHandler}
        initialValue={initialValue.inputs.name.value}
        initialValid={initialValue.inputs.name.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
       <Input
        type="textarea"
        id="description"
        label="รายละเอียดปัญหา"
        placeholder="รายละเอียดปัญหา"
        errorText="โปรดกรอกรายละเอียดปัญหา"
        onInput={inputHandler}
        initialValue={initialValue.inputs.description.value}
        initialValid={initialValue.inputs.description.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
      <Input
        type="text"
        id="device"
        label="อุปกรณ์"
        placeholder="ใส่อุปกรณ์และ/หรือระบบปฏิบัติการที่นี่..."
        errorText="โปรดกรอกอุปกรณ์และ/หรือระบบปฏิบัติการ"
        onInput={inputHandler}
        initialValue={initialValue.inputs.device.value}
        initialValid={initialValue.inputs.device.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
    </>
  );
};

export default IssueReportForm1;
