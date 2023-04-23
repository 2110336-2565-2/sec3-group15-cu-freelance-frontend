import tw from "twin.macro";
import Input from "../share/Input";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../share/Validate";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { authClient } from "../../utils/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { apiClient } from "../../utils/axios";
import { AnimatePresence } from "framer-motion";
import Toast from "../share/Toast";
import Button from "../share/Button";
import React from "react";
import failIcon from "../../assets/FailIcon.svg"
const styles = {
  container: () => [
    tw`flex flex-col font-inter items-center w-full max-w-[460px] 
    dt:border-[1px] dt:rounded-[30px] px-6 py-8`,
  ],
  content: () => [
    tw`flex flex-col box-border h-full w-full  items-center px-[2%] gap-6`,
  ],
  title: () => [tw`font-ibm text-3xl font-bold mt-4`],
  button: () => [
    tw`w-full bg-[#D62B70] font-bold text-[20px] text-white rounded-[10px] font-inter py-2 mt-[1%] 
    // disabled:bg-gray-800 disabled:text-gray-600 
    disabled:opacity-30
    disabled:cursor-not-allowed
    `,
  ],
  or: () => [tw``],
  googleButton: () => [
    tw`flex flex-row justify-center items-center gap-x-[10px] w-full 
    border-[1px] border-slate-200 text-lg rounded-[10px] font-inter py-2 disabled:cursor-not-allowed`,
  ],
  googleIcon: () => [tw`w-[25px] h-[25px]`],
  register: () => [tw`flex flex-row`],
  registerText: () => [
    tw`whitespace-nowrap text-[16px] font-inter text-black p-[1%]`,
  ],
  registerLink: () => [
    tw`whitespace-nowrap text-[16px] font-inter text-[#D62B70] p-[1%]`,
  ],
};
const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const [submitState, setSubmitState] = useState(0);
  const formSubmitHandler = async (event) => {
    // event.preventDefault();
    try {
      setIsLogin(true);
      let response = await authClient.post(
        "/auth/login",
        JSON.stringify({
          username: formState.inputs.username.value.trim(),
          password: formState.inputs.password.value,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { access_token, refresh_token, expires_in } = response.data;

      let expiresOn = new Date();
      expiresOn.setSeconds(expiresOn.getSeconds() + expires_in);
      response = await authCtx.login(access_token, refresh_token, expiresOn);
      console.log(response);
      navigate("/search?pages=1&keyword=", { replace: true });
    } catch (err) {
      console.log(err);
      setSubmitState(1);
      setTimeout(() => { setSubmitState(0); }, 2000);
    }
    setIsLogin(false);
  };

  return (
    <>
    <AnimatePresence>
      {submitState==1&&<Toast type='fail' title='ผิดพลาด' description='usernameหรือรหัสผ่านไม่ถูกต้อง' icon={failIcon}/>}
    </AnimatePresence>
    <div css={styles.container()}>
      <div css={styles.content()}>
        <div css={styles.title()}>เข้าสู่ระบบ</div>
        <Input
          type="text"
          id="username"
          label="ชื่อผู้ใช้"
          placeholder="ชื่อผู้ใช้ของคุณ"
          errorText="กรุณาใส่ชื่อผู้ใช้"
          onInput={inputHandler}
          validator={[VALIDATOR_REQUIRE()]}
        />
        <Input
          type="password"
          id="password"
          label="รหัสผ่าน"
          placeholder="ใส่รหัสผ่านของคุณ "
          errorText="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
          onInput={inputHandler}
          validator={[VALIDATOR_MINLENGTH(8)]}
        />
        {/* <button
          css={styles.button()}
          onClick={formSubmitHandler}
          disabled={!formState.isValid || isLogin}
        >
          {(isLogin && "กำลังดึงข้อมูล...") || "เข้าสู่ระบบ"}
        </button> */}
        <Button primary width='100%'
          onClick={formSubmitHandler}
          disable={!formState.isValid || isLogin}
        >
          {(isLogin && "กำลังดึงข้อมูล...") || "เข้าสู่ระบบ"}
        </Button>
        {/* <div css={styles.or()}> OR </div>
        <button css={styles.googleButton()} disabled={true}>
          <img css={styles.googleIcon()} src={GoogleIcon} />
          Login with Google
        </button> */}

        <div css={styles.register()}>
          <p css={styles.registerText()}> ยังไม่มีบัญชีผู้ใช้​ ? </p>

          <Link css={styles.registerLink()} to="/register">
            กดที่นี่เพื่อสมัคร
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};
export default LoginForm;
