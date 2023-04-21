import React from "react";
import tw from "twin.macro";
import Input from "../../share/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../../share/Validate";
import InputCheckBox from "../../share/InputCheckbox";
import { checkboxData } from "../../../store/issue-store";

const IssueReportForm2 = ({ inputHandler, initialValue }) => {
  return (
    <>
      <InputCheckBox
        initialValue={initialValue.inputs.associateFeatures.value}
        initialValid={initialValue.inputs.associateFeatures.isValid}
        dataCheckboxs={checkboxData}
        id="associateFeatures"
        onInput={inputHandler}
        label="หมวดหมู่ปัญหา"
        required
        requiredText="โปรดเลือกอย่างน้อย 1 หมวดหมู่ปัญหา"
      />
      <Input
        type="textarea"
        id="reproduce"
        label="ขั้นตอนสู่ปัญหา"
        placeholder="เพื่อถอดแบบขั้นตอนสู่ปัญหาระบุขั้นตอน เช่น
        1.ไปสู่ ‘...’
        2.คลิ้กที่ ‘...’
        3.เลื่อนไปที่ ‘...’
        4.พบปัญหา"
        errorText="โปรดกรอกขั้นตอนสู่ปัญหา"
        onInput={inputHandler}
        initialValue={initialValue.inputs.reproduce.value}
        initialValid={initialValue.inputs.reproduce.isValid}
        validator={[VALIDATOR_REQUIRE()]}
        required
      />
      <Input
        type="text"
        id="additionalContext"
        label="บริบทเกี่ยวกับปัญหาเพิ่มเติม"
        placeholder="ใส่บริบทเพิ่มเติม..."
        // errorText="โปรดกรอกอุปกรณ์และ/หรือระบบปฏิบัติการ"
        onInput={inputHandler}
        initialValue={initialValue.inputs.additionalContext.value}
        initialValid={initialValue.inputs.additionalContext.isValid}
        validator={[]}
      />
      <Input
        type="text"
        id="contractEmail"
        label="อีเมลติดต่อกลับ"
        placeholder="ใส่อีเมลเพื่อติดต่อกลับ..."
        errorText="โปรดกรอกอีเมลเพื่อติดต่อกลับ"
        onInput={inputHandler}
        initialValue={initialValue.inputs.contractEmail.value}
        initialValid={initialValue.inputs.contractEmail.isValid}
        validator={[VALIDATOR_REQUIRE(),VALIDATOR_EMAIL()]}
        required
      />
    </>
  );
};

export default IssueReportForm2;
