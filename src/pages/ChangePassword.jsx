import tw from "twin.macro";
import Input from "../components/share/Input";
import lockIcon from "../assets/LockIcon.svg";
import failIcon from "../assets/FailIcon.svg"
import {AnimatePresence} from "framer-motion";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MATCH,
  VALIDATOR_UNMATCH,
} from "../components/share/Validate";
import { useForm } from "../hooks/form-hook";
// import {useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { apiClient } from "../utils/axios";
import { useState } from "react";
import React from "react";
import MenuList from "../components/userSetting/MenuList";
import Toast from "../components/share/Toast";
import { useWindow } from "../hooks/window-hook";
import { useEffect } from "react";
const Container = tw.div`flex justify-center pt-[10vh] dt:pt-[20vh] min-h-[95vh] mb-4 w-3/4 dt:w-full m-auto`;
const Form = tw.form`flex flex-col shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-4 rounded-[20px] gap-y-2 w-[420px] h-fit pf:w-1/4`;
const Title = tw.div`text-center font-bold text-xl dt:text-3xl font-ibm`;
const LockIcon = tw.img`mx-auto mt-4`;
const Caution = tw.div`text-center font-bold text-xs dt:text-sm font-inter my-4`;
const SubmitButton = tw.button`bg-[#D62B70] text-center m-2 text-white font-inter font-bold rounded-[10px] p-2 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none`;
const CancelButton = tw.button`text-[#D62B70] font-medium font-inter p-2`;
const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  // const history = useHistory();
  // console.log(history);
  const [submitState, setSubmitState] = useState(0);
  const handleCancel = (event) => {
    event.preventDefault();
    console.log("click cancel!");
    navigate(-1);
  };
  const windowSize = useWindow();
  useEffect(()=>{
    if(windowSize>=550){
      navigate('/user-setting-entrance-dt');
    }
  }, [windowSize])
  const [formState, inputHandler, setFormData] = useForm(
    {
      Current: {
        value: "",
        isValid: false,
      },
      New: {
        value: "",
        isValid: false,
      },
      Confirm: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const { Current, New, Confirm } = formState.inputs;
    console.log("button click!")
    try {
      setIsLoading(true);
      let data = JSON.stringify({
        current_password: Current.value,
        new_password: New.value,
        username: authCtx.userInfo.username,
      });
      console.log(data);
      const response = await apiClient.post(`/auth/ChangePassword`, data, {
        headers: { "Content-Type": "application/json" },
      });
      setIsLoading(false);
      //console.log(response.data);
      navigate('/request-complete', {
        state:{
            title:"เปลี่ยนรหัสผ่านสำเร็จ",
            desc:"ยินดีด้วย!",
            bt1Text:"กลับหน้าหลัก",
            path1:"/home",
        }
      });
      // navigate("/success", {
      //   state: { text: "เปลี่ยนรหัสผ่านสำเร็จ", mid: "true" },
      // });
    } catch (err) {
      console.log(err);
      setSubmitState(2);
      setTimeout(() => { setSubmitState(0); }, 2000);
      setIsLoading(false);
    }
  };
  return (
    <>
    {/* <MenuList state={2}/> */}
    <AnimatePresence>
      {submitState==2&&<Toast type='fail' title='ผิดพลาด' description='รหัสผ่านเก่าไม่ตรง' icon={failIcon}/>}
    </AnimatePresence>
    <Container>
      <Form onSubmit={formSubmitHandler}>
        <Title>เปลี่ยนรหัสผ่าน</Title>
        <LockIcon src={lockIcon}></LockIcon>
        <Caution>make sure you remember your password</Caution>
        <Input
          type="password"
          id="Current"
          label="รหัสผ่านปัจจุบัน"
          errorText=""
          onInput={inputHandler}
          placeholder="กรอกรหัสผ่านปัจจุบัน"
          validator={[]}
        />
        <Input
          type="password"
          id="New"
          label="รหัสผ่านใหม่"
          errorText="รหัสผ่านควรมีความยาวอย่างน้อย 8 ตัวอักษร และไม่ควรตรงกับรหัสผ่านเก่า"
          onInput={inputHandler}
          placeholder="กรอกรหัสผ่านใหม่"
          validator={[VALIDATOR_MINLENGTH(8), VALIDATOR_UNMATCH(formState.inputs.Current.value)]}
        />
        <Input
          type="password"
          id="Confirm"
          label="ยืนยันรหัสผ่าน"
          errorText="รหัสผ่านไม่ตรงกัน"
          onInput={inputHandler}
          placeholder="ยืนยันรหัสผ่านใหม่"
          validator={[VALIDATOR_MATCH(formState.inputs.New.value)]}
        />
        <SubmitButton type="submit" disabled={!formState.isValid || isLoading}>
          เปลี่ยนรหัสผ่าน
        </SubmitButton>
        <CancelButton onClick={handleCancel}>ย้อนกลับ</CancelButton>
      </Form>
    </Container>
    </>
  );
};
export default ChangePasswordPage;
