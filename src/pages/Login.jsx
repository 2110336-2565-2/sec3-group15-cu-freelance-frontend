import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
import { APP_URL, SSO_URL } from "../config/env";

import AuthLayout from "../components/share/AuthLayout";
const styles = {
  container: () => [
    tw`flex flex-col items-center pt-[0.5%] h-[95vh] box-border`,
  ],
  image: () => [tw`my-[1%] w-[10%] box-border`],
  text: () => [
    tw`text-[40px] text-[#D62B70] font-bold font-inter mb-[2%] box-border`,
  ],
  typeContainer: () => [
    tw`flex flex-row px-[10%] w-[100vw] box-border justify-between h-[48vh]`,
  ],
};
const Login = () => {
  const navigate = useNavigate();
  const onLoginHandler = () => {
    navigate("/login/customer");
  };
  const onFreelanceLoginHandler = () => {
    window.location.href = `${SSO_URL}/login?service=${APP_URL}/auth`;
  };
  return (
    <AuthLayout
      title="Login"
      leftText="ล็อคอินเป็นผู้รับจ้าง"
      rightText="ล็อคอินเป็นฟรีแลนซ์"
      navigateLeft="/login/customer"
      navigateRight={onFreelanceLoginHandler}
    />
  );
};

export default Login;
