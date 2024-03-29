import tw, { styled } from "twin.macro";
import ProgressBar from "../components/register/ProgressBar";
import React, { useReducer, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../context/AuthProvider";
import CreateOrder1 from "../components/order/CreateOrder1";
import CreateOrder2 from "../components/order/CreateOrder2";
import CreateOrder3 from "../components/order/CreateOrder3";
import CreateOrder4 from "../components/order/CreateOrder4";
import { authClient } from "../utils/auth";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button";
import LoadingSpinner from "../components/share/LoadingSpinner";
import { OrderContext } from "../context/OrderProvider";
function reducer(state, action) {
  if (action.type == "CHANGESTATE") {
    return {
      value: action.value,
    };
  }
}
const Container = tw.div`flex flex-col mt-[10vh] p-4 min-h-[85vh] items-center gap-y-2 
w-[90%] max-w-[500px] dt:w-[90%] dt:max-w-[700px]
relative mx-auto`;

const LoadingContainer = tw.div`fixed flex justify-center items-center w-full h-full top-0 left-0 bg-black/50 z-[80]`;

const Title = styled.div(({ show }) => [
  tw`font-ibm font-bold text-mobile-h1 dt:text-desktop-h1 text-center my-4`,
  !show && tw`hidden`,
]);
const Step = styled.div(({}) => [
  tw`font-ibm font-bold text-mobile-h1 dt:text-desktop-h1 text-freelance-black-primary text-center`,
]);
const StepDesc = styled.div(({}) => [
  tw`font-ibm font-bold text-mobile-small dt:text-desktop-base text-freelance-black-secondary px-4 text-center mb-4`,
]);
const Footer1 = styled.div(({}) => [
  tw`flex flex-row w-full gap-x-4 justify-between absolute bottom-8 dt:relative dt:bottom-auto`,
  // tw`flex flex-row w-full gap-x-4 justify-between dt:absolute bottom-8`
]);
const Footer2 = styled.div(({}) => [
  tw`flex flex-col items-center gap-y-4 dt:absolute bottom-8`,
]);
const Back2Edit = styled.button(({}) => [
  tw`text-center font-ibm decoration-solid font-medium text-mobile-small`,
]);
const step = ["รายละเอียด", "สถานะ", "การติดต่อ", "ยืนยัน"];
const stepDesc = [
  "ใส่รายละเอียดออเดอร์ของคุณ เพื่อให้ฟรีแลนซ์เข้าใจงานที่จะได้รับมอบหมาย",
  "ใส่ราคาและระยะเวลากำหนดส่งให้ออเดอร์ของคุณ ",
  "ใส่ช่องทางติดต่อให้ฟรีแลนซ์ติดต่อคุณกลับไปเมื่อต้องการรายละเอียดหรือตกลงเพิ่มเติม",
  "ตรวจสอบความถูกต้องของออเดอร์คุณอีกครั้ง ถ้าถูกต้องก็สร้างออเดอร์ได้เลย!!",
];
const CreateOrderTemplate = () => {
  const [state, dispatch] = useReducer(reducer, { value: 1 });
  const [check, setCheck] = useState(false);
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const orderCtx=useContext(OrderContext)
  const [isLoading, setIsLoading] = useState(false);


  const onChangeStateHandler = (value) => {
    dispatch({ type: "CHANGESTATE", value: value });
  };
  const continueHandler = () => {
    dispatch({ type: "CHANGESTATE", value: state.value + 1 });
    setProgress(state.value + 1);
  };
  const backHandler = () => {
    if (state.value == 1) {
      navigate(-1);
    }
    dispatch({ type: "CHANGESTATE", value: state.value - 1 });
    setProgress(state.value - 1);
  };
  const submitHandler = async () => {
    setIsLoading(true);
    let data = JSON.stringify({
      customer_id: authCtx.userInfo.id,
      description: formState1.inputs.desc.value,
      duration: parseInt(formState2.inputs.duration.value),
      email: formState3.inputs.email.value,
      price: parseInt(formState2.inputs.price.value),
      tel: formState3.inputs.phone.value,
      title: formState1.inputs.topic.value,
    });
    // console.log(data);
    let response = await apiClient.post("/order/template", data, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    setIsLoading(false);
    // const bt1OnclickHandler = () => {
    //   navigate("/search");
    // };
    // const bt2OnClickHandler = () => {
    //   navigate("/home");
    // };
    console.log(orderCtx);
    navigate("/request-complete", {
      state: {
        title: "การสร้างออเดอร์สำเร็จ",
        desc: "ยินดีด้วย ออเดอร์ของคุณถูกสร้าง เลือกฟรีแลนซ์ที่ถูกใจแล้วกดส่งได้เลย!",
        bt1Text: orderCtx.backToText,
        bt2Text: "กลับสู่หน้าออเดอร์ของฉัน",
        bt2: "true",
        path1: orderCtx.backTo,
        path2: "/my-order?q=template&pages=1",
      },
      //bt1OnclickHandler
    });
  };
  const [formState1, inputHandler1] = useForm(
    {
      topic: {
        value: "",
        isValid: false,
      },
      desc: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [formState2, inputHandler2] = useForm(
    {
      price: {
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
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const navigate = useNavigate();
  const disableButton =
    ((state.value === 1) & !formState1.isValid) |
    ((state.value === 2) & !formState2.isValid) |
    ((state.value === 3) & !formState3.isValid);
  return (
    <>
      {isLoading&&<LoadingContainer>
        <LoadingSpinner white={true}/>
      </LoadingContainer>}
      <Container>
        <Title show={state.value != 4}>สร้างแบบร่างแบบใหม่</Title>
        <ProgressBar
          onClick={onChangeStateHandler}
          state={state.value}
          progress={progress}
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
        <Step>
          {state.value == 4 ? "ตรวจสอบออเดอร์อีกครั้ง" : step[state.value - 1]}
        </Step>
        <StepDesc>{stepDesc[state.value - 1]}</StepDesc>
        <CreateOrder1 inputHandler1={inputHandler1} show={state.value == 1} />
        <CreateOrder2 inputHandler2={inputHandler2} show={state.value == 2} />
        <CreateOrder3 inputHandler3={inputHandler3} show={state.value == 3} />
        <CreateOrder4
          topic={formState1.inputs.topic.value}
          desc={formState1.inputs.desc.value}
          price={formState2.inputs.price.value}
          duration={formState2.inputs.duration.value}
          email={formState3.inputs.email.value}
          phone={formState3.inputs.phone.value}
          show={state.value == 4}
        />
        {state.value != 4 ? (
          <Footer1>
            <Button onClick={backHandler} width="50%" secondary>
              ย้อนกลับ
            </Button>
            <Button
              disable={disableButton}
              onClick={continueHandler}
              width="50%"
              primary
            >
              ถัดไป
            </Button>
          </Footer1>
        ) : (
          <Footer2>
            <Button onClick={submitHandler} width="w-full" primary>
              ยืนยันการสร้าง
            </Button>
            <Back2Edit onClick={backHandler}>
              <u>กลับไปแก้ไข</u>
            </Back2Edit>
          </Footer2>
        )}
      </Container>
    </>
  );
};
export default CreateOrderTemplate;
