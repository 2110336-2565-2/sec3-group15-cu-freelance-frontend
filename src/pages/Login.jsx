import tw, {styled} from "twin.macro";
import { useNavigate } from "react-router-dom";
import { APP_URL, SSO_URL } from "../config/env";
import LogoButton from "../components/share/LogoButton";
import customerAvatar from "../assets/CustomerAvatar.svg"
import freelanceAvatar from "../assets/FreelanceAvatar.svg"
import AuthTypeCard from "../components/share/AuthTypeCard";
const Container = styled.div(()=>[
  tw`box-border flex flex-col items-center min-h-[90vh] mt-8 w-full px-4 ip8:px-8`
]);
const Title = styled.div(()=>[
  tw`text-center font-ibm font-bold text-2xl tbl:text-3xl`
])
const AuthChoiceContainer = styled.div(()=>[
  tw`flex flex-col dt:flex-row px-8 dt:px-16 w-full items-center dt:justify-center gap-y-10 gap-x-16 pf:gap-x-32`
])
const DummyDiv = tw.div``
const Login = () => {
  const navigate = useNavigate();
  const onLoginHandler = () => {
    navigate("/login/customer");
  };
  const onFreelanceLoginHandler = () => {
    window.location.href = `${SSO_URL}/login?service=${APP_URL}/auth`;
  };
  return (
    <Container>
      <LogoButton/>
      <div tw="flex flex-col justify-center gap-16 items-center h-full min-h-[90vh]">
      <Title>เข้าสู่ระบบ</Title>
      <AuthChoiceContainer>
        <AuthTypeCard text="เข้าสู่ระบบเป็นผู้รับจ้าง" avatar={customerAvatar} onClick={onLoginHandler}/>
        <AuthTypeCard text="เข้าสู่ระบบเป็นฟรีแลนซ์" avatar={freelanceAvatar} onClick={onFreelanceLoginHandler}/>
      </AuthChoiceContainer>
      <DummyDiv/>
      </div>
    </Container>

  );
};

export default Login;
