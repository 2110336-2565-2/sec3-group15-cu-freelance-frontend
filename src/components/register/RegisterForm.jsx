import tw from "twin.macro";
import ProgressBar from "./ProgressBar";
import Input from "../share/Input";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MATCH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../share/Validate.jsx";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/form-hook";
import { authClient } from "../../utils/auth";
import { AuthContext } from "../../context/AuthProvider";
const styles = {
  container: () => [
    tw`flex flex-col font-inter items-center w-[50%] 
        max-w-[460px] border-[1px] rounded-[30px] px-6 py-4 h-fit`,
  ],
  content: () => [
    tw`flex flex-col box-border max-h-[95vh] w-full items-center px-[2%] gap-2`,
  ],
  title: () => [tw`text-3xl font-ibm font-bold`],
  show: ({ showState, nowState }) => [
    !(showState & (1 << (nowState - 1))) && tw`hidden`,
    tw`w-full`,
  ],
  button: () => [
    tw`w-full bg-[#D62B70] font-bold text-[20px] text-white rounded-[10px] font-inter py-2 mt-[1%] 
    // disabled:bg-gray-800 disabled:text-gray-600 
    disabled:opacity-30
    disabled:cursor-not-allowed
    `,
  ],
  or: () => [tw`my-[0%] text-center`],
  googleButton: () => [
    tw`flex flex-row justify-center items-center gap-x-[10px] w-full 
    border-[1px] border-slate-200 text-lg rounded-[10px] font-inter py-2`,
  ],
  googleLogo: () => [tw`h-[25px] w-[25px]`],
  checkbox: () => [tw`flex flex-row items-center text-[14px] gap-x-[10px]`],
  box: () => [tw``],
  login: () => [tw`flex flex-row justify-center`],
  loginText: () => [
    tw`whitespace-nowrap text-[16px] font-inter text-black p-[1%]`,
  ],
  loginLink: () => [
    tw`whitespace-nowrap text-[16px] font-inter text-[#D62B70] p-[1%]`,
  ],
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
  const authCtx = useContext(AuthContext);

  const onChangeStateHandler = (value) => {
    dispatch({ type: "CHANGESTATE", value: value });
  };

  const continueHandler = () => {
    dispatch({ type: "CHANGESTATE", value: state.value + 1 });
    setProgress(state.value + 1);
  };

  const checkboxChangeHandler = (event) => {
    setCheck((prev) => !prev);
  };

  const navigate = useNavigate();
  const submitHandler = async () => {
    // try {
    //   setLoading(true);
    //   let data = JSON.stringify({
    //     firstname: formState1.inputs.firstname.value,
    //     lastname: formState1.inputs.lastname.value,
    //     phonenumber: formState1.inputs.phonenumber.value,
    //     username: formState2.inputs.username.value,
    //     password: formState2.inputs.password.value,
    //     displayname: formState3.inputs.displayname.value,
    //     email: formState3.inputs.email.value,
    //   });
    //   let response = await authClient.post("/auth/register", data, {
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   console.log(response.data);

    //   response = await authClient.post(
    //     "/auth/login",
    //     JSON.stringify({
    //       username: formState2.inputs.username.value,
    //       password: formState2.inputs.password.value,
    //     }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   );
    //   const { access_token, refresh_token, expires_in } = response.data;

    //   let expiresOn = new Date();
    //   expiresOn.setSeconds(expiresOn.getSeconds() + expires_in);
    //   response = await authCtx.login(access_token, refresh_token, expiresOn);
    //   setLoading(false);
    //   navigate("/success");
    // } catch (err) {
    //   console.log(err);
    // }
    navigate("/success");
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
    <div css={styles.container()}>
      <div css={styles.content()}>
        <div css={styles.title()}>Sign Up</div>
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
        <div css={styles.show({ showState: 1, nowState: state.value })}>
          <Input
            type="text"
            id="firstname"
            label="Firstname"
            placeholder="Enter first name"
            errorText="Your first name should not be blank"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
          />
        </div>
        <div css={styles.show({ showState: 1, nowState: state.value })}>
          <Input
            type="text"
            id="lastname"
            label="Lastname"
            placeholder="Enter last name"
            errorText="Your last name should not be blank"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
          />
        </div>
        <div css={styles.show({ showState: 1, nowState: state.value })}>
          <Input
            type="tel"
            id="phonenumber"
            label="Phone Number"
            placeholder="0xx-xxx-xxx"
            errorText="Your phone should be in this format 0xx-xxx-xxx "
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler1}
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value })}>
          <Input
            type="text"
            id="username"
            label="Username"
            placeholder="Enter username"
            errorText="Your username should not be blank"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler2}
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value })}>
          <Input
            type="password"
            id="password"
            label="Password"
            placeholder="Enter password"
            errorText="Your password should be at least 8 characters"
            validator={[VALIDATOR_MINLENGTH(8)]}
            onInput={inputHandler2}
          />
        </div>
        <div css={styles.show({ showState: 2, nowState: state.value })}>
          <Input
            type="password"
            id="confirmPW"
            label="Confirm password"
            placeholder="Enter password"
            errorText="Your password did not match"
            validator={[VALIDATOR_MATCH(formState2.inputs.password.value)]}
            onInput={inputHandler2}
          />
        </div>
        <div css={styles.show({ showState: 4, nowState: state.value })}>
          <Input
            type="text"
            id="displayname"
            label="Display name"
            placeholder="Enter display name"
            errorText="Your display name should not be blank"
            validator={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler3}
          />
        </div>
        <div css={styles.show({ showState: 4, nowState: state.value })}>
          <Input
            type="text"
            id="email"
            label="Email"
            placeholder="example@example.com"
            errorText="Your email should not be blank | Example: example@example.com"
            validator={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            onInput={inputHandler3}
          />
        </div>
        <div css={styles.show({ showState: 3, nowState: state.value })}>
          <button
            css={styles.button()}
            onClick={continueHandler}
            disabled={disableButton}
          >
            Continue
          </button>
        </div>
        <div
          css={[
            styles.or(),
            styles.show({ showState: 1, nowState: state.value }),
          ]}
        >
          OR
        </div>
        <button
          css={[
            styles.googleButton(),
            styles.show({ showState: 1, nowState: state.value }),
          ]}
          disabled={true}
        >
          <img css={styles.googleLogo()} src={GoogleIcon} />
          Log in with Google
        </button>

        {/* <Link css={[styles.loginLink(),styles.show({showState:1, nowState:state.value})]} to="/home">
                    Already have an account? Login
                </Link> */}

        <div
          css={[
            styles.login(),
            styles.show({ showState: 1, nowState: state.value }),
          ]}
        >
          <p css={styles.loginText()}> Already have an account? </p>
          <Link css={[styles.loginLink()]} to="/login">
            Login Here
          </Link>
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
            I agree to <b>Terms of Service</b> and <b>Privacy Policy</b>.
          </label>
        </div>
        <button
          css={[
            styles.button(),
            styles.show({ showState: 4, nowState: state.value }),
          ]}
          onClick={submitHandler}
          disabled={disableButton | loading}
        >
          {(loading && "Loading...") || "Sign Up"}
        </button>
      </div>
    </div>
  );
};
export default loginForm;
