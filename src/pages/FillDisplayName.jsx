import Input from "../components/share/Input";
import tw from "twin.macro";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/share/Validate";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/form-hook";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { apiClient } from "../utils/axios";

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
      tw`flex flex-col font-inter items-center w-[50%] max-w-[460px] h-[85%] drop-shadow border-[1px] rounded-[30px] px-[3%] py-[1%]`,
    ],
    content: () => [
      tw`flex flex-col box-border h-full w-full  items-center px-[2%] gap-y-[20px]`,
    ],
    title: () => [tw`text-[48px] font-bold`],
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
    event.preventDefault();
    try {
      await apiClient.patch(
        "/user/",
        JSON.stringify({ display_name: formState.inputs.displayName.value }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // const userInfo=localStorage.getItem("userInfo")
      navigate("/success", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div css={styles.container()}>
      <div css={styles.content()}>
        <div css={styles.title()}>Login</div>
        <Input
          type="text"
          id="displayName"
          label="Display Name"
          placeholder="Enter display name"
          errorText="Your display name should not be blank"
          onInput={inputHandler}
          validator={[VALIDATOR_REQUIRE()]}
        />
        <button
          css={styles.button()}
          onClick={formSubmitHandler}
          disabled={!formState.isValid || isLogin}
        >
          {(isLogin && "loading...") || "Login"}
        </button>
      </div>
    </div>
  );
};

export default FillDisplayNamePage;
