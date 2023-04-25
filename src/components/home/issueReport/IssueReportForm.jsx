import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/form-hook";
import tw from "twin.macro";
import IssueReportForm1 from "./IssueReportForm1";
import Button from "../../../components/share/Button";
import IssueReportForm2 from "./IssueReportForm2";
import { authClient } from "../../../utils/auth";
import LoadingSpinner from "../../share/LoadingSpinner";

const FormContainer = tw.form`w-full h-[72vh] dt:h-[70vh] overflow-y-auto px-[5%]`;
const ButtonContainer = tw.div`w-full h-[10vh] flex justify-between items-center px-[5%] mb-1 dt:mb-0`;

const IssueReportForm = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formState1, inputHandler1] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      device: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [formState2, inputHandler2] = useForm(
    {
      associateFeatures: {
        value: [],
        isValid: false,
      },
      reproduce: {
        value: "",
        isValid: false,
      },
      additionalContext: {
        value: "",
        isValid: true,
      },
      contractEmail: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const clickPrimaryHandler = async () => {
    if (stage === 1) setStage(2);
    else {
      setIsLoading(true);
      const name = formState1.inputs.name.value;
      const description = formState1.inputs.description.value;
      const device = formState1.inputs.device.value;
      const associateFeatures = formState2.inputs.associateFeatures.value;
      const reproduce = formState2.inputs.reproduce.value;
      const additionalContext = formState2.inputs.additionalContext.value;
      const contractEmail = formState2.inputs.contractEmail.value;
      const data = JSON.stringify({
        name,
        description,
        device,
        associateFeatures,
        reproduce,
        additionalContext,
        contractEmail,
        priority: "",
        attrachments: "",
        status: "",
        assignedTo: "",
        openedDated: "",
        bugSource: "",
      });
      try {
        const res = await authClient.post("/issue", data, {
          headers: { "Content-Type": "application/json" },
        });
        navigate(-1);
      } catch (err) {
        // console.log(err);
      }
      setIsLoading(false);
    }
  };

  const clickSecondaryHandler = () => {
    if (stage === 1) navigate(-1);
    else setStage(1);
  };

  let disablePrimary =
    (stage === 1 && !formState1.isValid) ||
    (stage === 2 && !formState2.isValid);

  return (
    <>
      {isLoading && (
        <div tw="fixed w-screen h-screen z-[80] top-0 left-0 bg-black/50 flex justify-center items-center">
          <LoadingSpinner white />
        </div>
      )}
      <FormContainer className="form-container">
        {stage === 1 && (
          <IssueReportForm1
            inputHandler={inputHandler1}
            initialValue={formState1}
          />
        )}
        {stage === 2 && (
          <IssueReportForm2
            inputHandler={inputHandler2}
            initialValue={formState2}
          />
        )}
      </FormContainer>
      <ButtonContainer>
        <Button secondary width="40%" onClick={clickSecondaryHandler}>
          ย้อนกลับ
        </Button>
        <Button
          primary
          width="40%"
          onClick={clickPrimaryHandler}
          disable={disablePrimary}
        >
          {stage === 1 ? "ถัดไป" : "ยืนยัน"}
        </Button>
      </ButtonContainer>
    </>
  );
};

export default IssueReportForm;
