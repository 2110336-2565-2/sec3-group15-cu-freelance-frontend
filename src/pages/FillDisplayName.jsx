import Input from "../components/share/Input";
import tw from "twin.macro";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_SPECIALCHAR,
} from "../components/share/Validate";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { apiClient } from "../utils/axios";
import Button from "../components/share/Button"
const FillDisplayNamePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      displayName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const styles = {
    container: () => [
      tw`flex flex-col font-inter items-center w-fit dt:w-[50%] max-w-[460px] h-fit drop-shadow border-[1px] rounded-[30px] px-[3%] py-[1%]`,
    ],
    content: () => [
      tw`flex flex-col box-border h-full w-full  items-center px-2 pb-4`,
    ],
    title: () => [tw`text-mobile-h1 dt:text-[48px] font-bold my-4`],
    button: () => [
      tw`w-full bg-[#D62B70] font-bold text-[20px] text-white rounded-[10px] font-inter p-[1%] mt-[1%] disabled:bg-gray-600`,
    ],
    or: () => [tw`my-[3%]`],
    googleButton: () => [
      tw`flex flex-row justify-center items-center gap-x-[10px] w-full border-[#D62B70] border-[3px] text-[20px] text-[#D62B70] rounded-[10px] font-inter font-bold p-[1%]`,
    ],
    registerLink: () => [tw`text-[16px] font-inter text-[#D62B70] p-[1%]`],
  };

  const formSubmitHandler = async (event) => {
    console.log(authCtx)
    // event.preventDefault();
    try {
      await apiClient.patch(
        "/user",
        JSON.stringify({ display_name: formState.inputs.displayName.value }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const userInfo=JSON.parse(localStorage.getItem("userInfo"))
      userInfo.displayName=formState.inputs.displayName.value;
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      authCtx.setUserInfo(prev=>({...prev,display_name:formState.inputs.displayName.value}))
      navigate('/request-complete', {
        state:{
            title:"ลงทะเบียนสำเร็จ",
            desc:"ยินดีต้อนรับสู่ CU Freelance!",
            bt1Text:"กลับหน้าหลัก",
            path1:"/home",
        }
        //bt1OnclickHandler
    });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div tw="flex h-[95vh] items-center justify-center">
      <div css={styles.container()}>
        <div css={styles.content()}>
          <div css={styles.title()}>Login</div>
          <Input
            type="text"
            id="displayName"
            label="ชื่อที่ใช้เเสดงในเว็บ"
            placeholder="โปรดกรอกชื่อที่ใช้เเสดงในเว็บ"
            errorText="ชื่อที่ใช้เเสดงไม่ควรมีตัวอักษรพิเศษ เเละมีความยาวอยู่ระหว่าง 4-10 ตัวอักษร"
            onInput={inputHandler}
            validator={[VALIDATOR_REQUIRE(),VALIDATOR_SPECIALCHAR(),VALIDATOR_MINLENGTH(4),VALIDATOR_MAXLENGTH(10)]}
          />
          {/* <button
            css={styles.button()}
            onClick={formSubmitHandler}
            disabled={!formState.isValid || isLogin}
          >
            {(isLogin && "loading...") || "Login"}
          </button> */}
          <Button primary onClick={formSubmitHandler} disable={!formState.isValid || isLogin} width='100%'>
            {(isLogin && "loading...") || "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FillDisplayNamePage;
