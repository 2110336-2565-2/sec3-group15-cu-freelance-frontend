import tw from "twin.macro";
import ProgressBar from "./ProgressBar";
import Input from "../share/Input";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import failIcon from "../../assets/FailIcon.svg"
import Button from "../share/Button";
import { useContext, useReducer, useState } from "react";
import React from "react";
import {AnimatePresence} from "framer-motion";
import { useNavigate } from "react-router-dom";
import Toast from "../share/Toast";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MATCH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_NOT_CONTAIN_NUMBER,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
  VALIDATOR_SPECIALCHAR,
} from "../share/Validate.jsx";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { authClient } from "../../utils/auth";
import { AuthContext } from "../../context/AuthProvider";
const styles = {
  container: () => [
    tw`flex flex-col font-inter items-center w-full max-w-[460px] 
    dt:border-[1px] dt:shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-[30px] ip8:px-6 py-8 min-h-[75vh] pf:min-h-[566px]`,
  ],
  content: () => [
    tw`flex flex-col box-border h-full w-full  items-center px-[2%] gap-x-6 gap-y-2`,
  ],
  title: () => [tw`py-4 text-3xl font-ibm font-bold`],
  show: ({ showState, nowState, input }) => [
    !(showState & (1 << (nowState - 1))) && tw`hidden`,
    tw`w-full`,
    input && tw`min-h-[84px]`
  ],
  button: () => [
    tw`w-full font-ibm bg-[#D62B70] font-bold text-[20px] text-white rounded-[10px] py-2 mt-[1%] 
    // disabled:bg-gray-800 disabled:text-gray-600 
    disabled:opacity-30
    disabled:cursor-not-allowed
    `,
  ],
  or: () => [tw`my-[0%] text-center`],
  checkbox: () => [tw`flex flex-row items-center text-[14px] gap-x-[10px] mb-4`],
  box: () => [tw``],
  login: () => [tw`flex flex-row justify-center`],
  loginText: () => [
    tw`whitespace-nowrap text-[16px] font-ibm text-black p-[1%]`,
  ],
  loginLink: () => [
    tw`whitespace-nowrap text-[16px] font-ibm text-[#D62B70] p-[1%]`,
  ],
  buttonContainer: () => [
    tw`w-full flex flex-row gap-x-2`
  ]
};

function reducer(state, action) {
  if (action.type == "CHANGESTATE") {
    return {
      value: action.value,
    };
  }
}
const loginForm = () => {
  const [state, dispatch] = useReducer(reducer, { value: 1 });
  const [check, setCheck] = useState(false);
  const [progress, setProgress] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitState, setSubmitState] = useState(0);
  const authCtx = useContext(AuthContext);

  const onChangeStateHandler = (value) => {
    dispatch({ type: "CHANGESTATE", value: value });
  };

  const continueHandler = () => {
    dispatch({ type: "CHANGESTATE", value: state.value + 1 });
    setProgress(state.value + 1);
  };
  const backHandler = () => {
    dispatch({type: "CHANGESTATE", value: state.value - 1});
    setProgress(state.value - 1);
  }

  const checkboxChangeHandler = (event) => {
    setCheck((prev) => !prev);
  };

  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      setLoading(true);
      let data = JSON.stringify({
        firstname: formState1.inputs.firstname.value,
        lastname: formState1.inputs.lastname.value,
        phone: formState1.inputs.phonenumber.value,
        username: formState2.inputs.username.value,
        password: formState2.inputs.password.value,
        display_name: formState3.inputs.displayname.value,
        email: formState3.inputs.email.value,
      });
      let response = await authClient.post("/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);

      response = await authClient.post(
        "/auth/login",
        JSON.stringify({
          username: formState2.inputs.username.value,
          password: formState2.inputs.password.value,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { access_token, refresh_token, expires_in } = response.data;

      let expiresOn = new Date();
      expiresOn.setSeconds(expiresOn.getSeconds() + expires_in);
      response = await authCtx.login(access_token, refresh_token, expiresOn);
      navigate('/request-complete', {
        state:{
            title:"ลงทะเบียนสำเร็จ",
            desc:"ยินดีต้อนรับสู่ CU Freelance!",
            bt1Text:"กลับหน้าหลัก",
            path1:"home",
        }
        //bt1OnclickHandler
    });
      // navigate("/success");
    } catch (err) {
      console.log(err);
      setSubmitState(1);
      setTimeout(() => { setSubmitState(0); }, 2000);
    }
    setLoading(false);
  };
  const [formState1, inputHandler1] = useForm(
    {
      firstname: {
        value: "",
        isValid: false,
      },
      lastname: {
        value: "",
        isValid: false,
      },
      phonenumber: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [formState2, inputHandler2] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPW: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [formState3, inputHandler3] = useForm(
    {
      displayname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const disableButton =
    ((state.value === 1) & !formState1.isValid) |
    ((state.value === 2) & !formState2.isValid) |
    ((state.value === 3) & (!formState3.isValid | !check));

  return (
    <>
    <AnimatePresence>
      {submitState==1&&<Toast type='fail' title='ผิดพลาด' description='ชื่อผู้ใช้หรืออีเมลล์ถูกใช้งานแล้ว' icon={failIcon}/>}
    </AnimatePresence>
    <div css={styles.container()}>
      <div css={styles.content()}>
        <div css={styles.title()}> สมัครสมาชิก </div>
        <ProgressBar
          onClick={onChangeStateHandler}
          state={state.value}
          progress={progress}
          formValid={{
            form1: formState1.isValid,
            form2: formState2.isValid,
            form3: formState3.isValid,
          }}
        />
        <div css={styles.show({ showState: 1, nowState: state.value, input:true })}>
          <Input
            type="text"
            id="firstname"
            label="ชื่อจริง"
            placeholder="ใส่ชื่อจริงของคุณ"
            errorText="ชื่อจริงไม่ควรเว้นว่าง หรือมีตัวอักษรพิเศษ"
            validator={[VALIDATOR_REQUIRE(),VALIDATOR_SPECIALCHAR(),VALIDATOR_NOT_CONTAIN_NUMBER(),VALIDATOR_MAXLENGTH(30)]}
            onInput={inputHandler1}
            required
          />
        </div>
        <div css={styles.show({ showState: 1, nowState: state.value, input:true })}>
          <Input
            type="text"
            id="lastname"
            label="นามสกุล"
            placeholder="ใส่นามสกุลของคุณ"
            errorText="นามสกุลไม่ควรเว้นว่าง หรือมีตัวอักษรพิเศษ"
            validator={[VALIDATOR_REQUIRE(),VALIDATOR_SPECIALCHAR(),VALIDATOR_NOT_CONTAIN_NUMBER(),VALIDATOR_MAXLENGTH(30)]}
            onInput={inputHandler1}
            required
          />
        </div>
        <div css={styles.show({ showState: 1, nowState: state.value, input:true})}>
          <Input
            type="tel"
            id="phonenumber"
            label="เบอร์โทรศัพท์"
            placeholder="ใส่ในรูปแบบ 0xxxxxxxxx"
            errorText="เบอร์โทรศัพท์ควรอยู่ในรูปแบบ 0xxxxxxxxx"
            validator={[VALIDATOR_PHONE()]}
            onInput={inputHandler1}
            required
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value, input:true })}>
          <Input
            type="text"
            id="username"
            label="ชื่อผู้ใช้"
            placeholder="ใส่ชื่อผู้ใช้"
            errorText="ชื่อผู้ใช้ไม่ควรเว้นว่างหรือมีตัวอักษรพิเศษ และความยาวอยู่ระหว่าง 5-25 ตัวอักษร"
            validator={[VALIDATOR_REQUIRE(),VALIDATOR_SPECIALCHAR(),VALIDATOR_MAXLENGTH(25),VALIDATOR_MINLENGTH(5)]}
            onInput={inputHandler2}
            required
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value, input:true })}>
          <Input
            type="password"
            id="password"
            label="รหัสผ่าน"
            placeholder="ใส่รหัสผ่าน"
            errorText="รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว!"
            validator={[VALIDATOR_MINLENGTH(8),VALIDATOR_MAXLENGTH(20)]}
            onInput={inputHandler2}
            required
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value, input:true })}>
          <Input
            type="password"
            id="confirmPW"
            label="ยืนยันรหัสผ่าน"
            placeholder="ใส่รหัสผ่าน"
            errorText="รหัสผ่านไม่ตรงกัน!"
            validator={[VALIDATOR_MATCH(formState2.inputs.password.value)]}
            onInput={inputHandler2}
            required
          />
        </div>
        <div css={styles.show({ showState: 4, nowState: state.value, input:true })}>
          <Input
            type="text"
            id="displayname"
            label="ชื่อที่ใช้เเสดงในเว็บ"
            placeholder="ใส่ชื่อที่ใช้แสดงในเว็บ"
            errorText="ชื่อที่ใช้เเสดงไม่ควรมีตัวอักษรพิเศษ เเละมีความยาวอยู่ระหว่าง 4-10 ตัวอักษร"
            validator={[VALIDATOR_REQUIRE(),VALIDATOR_SPECIALCHAR(),VALIDATOR_MAXLENGTH(10),VALIDATOR_MINLENGTH(4)]}
            onInput={inputHandler3}
            required
          />
        </div>
        <div css={styles.show({ showState: 4, nowState: state.value, input:true })}>
          <Input
            type="text"
            id="email"
            label="อีเมล"
            placeholder="example@example.com"
            errorText="อีเมลไม่สามารถเว้นว่าง! | ตัวอย่างอีเมล: example@example.com"
            validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL(),VALIDATOR_MAXLENGTH(30)]}
            onInput={inputHandler3}
            required
          />
        </div>
        <div
          css={[
            styles.checkbox(),
            styles.show({ showState: 4, nowState: state.value }),
          ]}
        >
          <input
            css={styles.box()}
            type="checkbox"
            id="privacy"
            name="privacy"
            checked={check}
            onChange={checkboxChangeHandler}
          ></input>
          <label htmlFor="privacy">
          <p tw="font-ibm text-base">
            ฉันยอมรับใน <b>ข้อกำหนดในการให้บริการ</b> และ <b>นโยบายความเป็นส่วนตัว</b>.
          </p>
          </label>
        </div>
        <div css={styles.buttonContainer()}>
        <div css={styles.show({ showState: 6, nowState: state.value })}>
            {/* <button
              css={styles.button()}
              onClick={backHandler}
            >
              ย้อนกลับ
            </button> */}
            <Button secondary onClick={backHandler} width={state.value<=2 ? '100%' : '100%'}>
              ย้อนกลับ
            </Button>
          </div>
          <div css={styles.show({ showState: 7, nowState: state.value })}>
            {/* <button
              css={styles.button()}
              onClick={continueHandler}
              disabled={disableButton}
            >
              Continue
            </button> */}
            <Button primary onClick={state.value<=2 ? continueHandler : submitHandler} disable={disableButton} width={state.value<=2 ? '100%' : '100%'}>
              {state.value<=2 ? 'ถัดไป' : 'ยืนยันการสมัคร'}
            </Button>
          </div>
        </div>

        {/* <Link css={[styles.loginLink(),styles.show({showState:1, nowState:state.value})]} to="/home">
                    Already have an account? Login
                </Link> */}

        <div
          css={[
            styles.login(),
            styles.show({ showState: 1, nowState: state.value }),
          ]}
        >
          <p css={styles.loginText()}> มีบัญชีผู้ใช้อยู่แล้ว ?​ </p>
          <Link css={[styles.loginLink()]} to="/login">
            เข้าสู่ระบบที่นี่
          </Link>
        </div>

        {/* <div
          css={[
            styles.checkbox(),
            styles.show({ showState: 4, nowState: state.value }),
          ]}
        >
          <input
            css={styles.box()}
            type="checkbox"
            id="privacy"
            name="privacy"
            checked={check}
            onChange={checkboxChangeHandler}
          ></input>
          <label htmlFor="privacy">
          <p tw="font-ibm text-base">
            ฉันยอมรับใน <b>ข้อกำหนดในการให้บริการ</b> และ <b>นโยบายความเป็นส่วนตัว</b>.
          </p>
          </label>
        </div> */}
        {/* <button
          css={[
            styles.button(),
            styles.show({ showState: 4, nowState: state.value }),
          ]}
          onClick={submitHandler}
          disabled={disableButton | loading}
        >
          {(loading && "กำลังโหลด...") || "บืนยันการสมัคร"}
        </button> */}
        {/* <div css={styles.show({ showState: 4, nowState: state.value })}>
          <Button primary onClick={submitHandler} disable={disableButton} width="100%">
            {(loading && "กำลังโหลด...") || "ยืนยันการสมัคร"}
          </Button>
        </div> */}
      </div>
    </div>
    </>
  );
};
export default loginForm;
