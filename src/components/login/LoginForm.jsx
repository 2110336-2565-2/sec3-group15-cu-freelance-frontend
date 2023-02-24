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
const styles = {
  container: () => [
    tw`flex flex-col font-inter items-center w-[50%] max-w-[460px] 
    border-[1px] rounded-[30px] px-6 py-8`,
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
  registerText: () => [tw`whitespace-nowrap text-[16px] font-inter text-black p-[1%]`],
  registerLink: () => [tw`whitespace-nowrap text-[16px] font-inter text-[#D62B70] p-[1%]`],
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLogin(true);
      let response = await authClient.post(
        "/auth/login",
        JSON.stringify({
          username: formState.inputs.username.value,
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
    }
    setIsLogin(false);
  };

  return (
    <div css={styles.container()}>
      <div css={styles.content()}>
        <div css={styles.title()}>Login</div>
        <Input
          type="text"
          id="username"
          label="Username"
          placeholder="Enter username"
          errorText="Your username should not be blank"
          onInput={inputHandler}
          validator={[VALIDATOR_REQUIRE()]}
        />
        <Input
          type="password"
          id="password"
          label="Password"
          placeholder="Enter Password"
          errorText="Your password must be at least 6 characters"
          onInput={inputHandler}
          validator={[VALIDATOR_MINLENGTH(6)]}
        />
        <button
          css={styles.button()}
          onClick={formSubmitHandler}
          disabled={!formState.isValid || isLogin}
        >
          {(isLogin && "Loading...") || "Login"}
        </button>
        <div css={styles.or()}> OR </div>
        <button css={styles.googleButton()} disabled={true}>
          <img css={styles.googleIcon()} src={GoogleIcon} />
          Login with Google
        </button>

        <div css={styles.register()}>
          <p css={styles.registerText()}> Don't have an account? </p>
          <Link  css={styles.registerLink()} to="/register">
             Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
