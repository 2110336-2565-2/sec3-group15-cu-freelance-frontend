import tw from "twin.macro";
import StateButton from "../register/StateButton";
import { useState } from "react";
import { useForm } from "../../hooks/form-hook";
import CreatePortForm1 from "./CreatePortForm1";
import CreatePortForm2 from "./CreatePortForm2";
import CreatePortForm3 from "./CreatePortForm3";
import ProgressBar from "../register/ProgressBar";
import Button from "../share/Button";
import { useNavigate } from "react-router-dom";
import CreatePortForm4 from "./CreatePortForm4";

const Container = tw.div`relative w-full mx-auto h-auto flex flex-col items-center font-ibm gap-y-[3%] max-w-[600px] dt:py-3`;
const Header = tw.div`font-bold text-xl`;
const ProgressBarContainer = tw.div`w-full px-[5%] mb-[5%] mx-auto flex justify-center items-center`;
const FormContainer = tw.div`min-h-[60vh] h-full w-full flex flex-col items-center gap-y-2`;
const ButtonContainer = tw.div`flex bottom-[0%] justify-between w-[90%]`;
const step = ["รายละเอียด", "สถานะ", "รูปภาพ", "ยืนยัน"];

const CreatePortfolioForm = () => {
  const [stage, setStage] = useState(1);
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(true);
  let disableButton;
  const [formState1, inputHandler1] = useForm(
    {
      portfolioName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const handleSetIsPublic = () => {
    setIsPublic((prev) => !prev);
  };
  const [formState2, inputHandler2] = useForm(
    {
      price: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      duration: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [formState3, inputHandler3] = useForm(
    {
      image: {
        value: [],
        isValid: true,
      },
      thumbnail: {
        value: [],
        isValid: false,
      },
    },
    false
  );
  const handleLeftClick = () => {
    if (stage === 1) {
      navigate(-1);
    } else {
      setStage((prev) => prev - 1);
    }
  };
  const handleRightClick = () => {
    setStage((prev) => prev + 1);
  };
  disableButton =
    (stage === 1 && !formState1.isValid) ||
    (stage === 2 && !formState2.isValid) ||
    (stage === 3 && !formState3.isValid);
  return (
    <Container>
      <Header>สร้างพอร์ตฟอลิโอใหม่</Header>
      <ProgressBarContainer>
        {" "}
        <ProgressBar
          onClick={setStage}
          state={stage}
          progress={stage}
          formValid={{
            form1: formState1.isValid,
            form2: formState2.isValid,
            form3: formState3.isValid,
          }}
          text1={step[0]}
          text2={step[1]}
          text3={step[2]}
          text4={step[3]}
          step={4}
        />
      </ProgressBarContainer>

      <FormContainer>
        {stage === 1 && (
          <CreatePortForm1
            initialValue={formState1}
            inputHandler={inputHandler1}
          />
        )}
        {stage === 2 && (
          <CreatePortForm2
            initialValue={formState2}
            inputHandler={inputHandler2}
          />
        )}
        {stage === 3 && (
          <CreatePortForm3
            formState={formState3}
            inputHandler={inputHandler3}
          />
        )}
        {stage === 4 && (
          <CreatePortForm4
            formState1={formState1}
            formState2={formState2}
            formState3={formState3}
            setStage={setStage}
            isPublic={isPublic}
            setIsPublic={handleSetIsPublic}
          />
        )}
      </FormContainer>
      <ButtonContainer>
        {stage !== 4 && (
          <Button secondary width="45%" onClick={handleLeftClick}>
            ย้อนกลับ
          </Button>
        )}
        {stage !== 4 && (
          <Button
            primary
            width="45%"
            onClick={handleRightClick}
            disable={disableButton}
          >
            ถัดไป
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
};
export default CreatePortfolioForm;
