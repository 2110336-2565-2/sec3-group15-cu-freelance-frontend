import tw from "twin.macro";
import CustomerAvatar from "../../assets/CustomerAvatar.svg";
import FreelanceAvatar from "../../assets/FreelanceAvatar.svg";
import { useNavigate } from "react-router-dom";
import AuthTypeCard from "../share/AuthTypeCard";
import LogoButton from "./LogoButton";
const styles = {
  container: () => [
    tw`flex flex-col items-center pt-[0.5%] h-[95vh] box-border`,
  ],
  image: () => [tw`my-[1%] w-[10%] box-border`],
  text: () => [
    tw`text-[40px] text-black font-normal font-ibm mb-[2%] box-border`,
  ],
  typeContainer: () => [
    tw`flex flex-row px-[10%] w-[100vw] box-border justify-between h-[48vh]`,
  ],
};
const AuthLayout = ({
  title,
  leftText,
  rightText,
  navigateLeft,
  navigateRight,
}) => {
  const navigate = useNavigate();
  const onAuthHandler = (endpoint) => {
    navigate(endpoint);
  };
  return (
    <div css={styles.container}>
      <LogoButton/>
      <div css={styles.text}>{title}</div>
      <div css={styles.typeContainer}>
        <AuthTypeCard
          text={leftText}
          avatar={CustomerAvatar}
          type="left"
          onClick={onAuthHandler.bind(null, navigateLeft)}
        />
        <AuthTypeCard
          text={rightText}
          avatar={FreelanceAvatar}
          type="right"
          onClick={navigateRight}
        />
      </div>
    </div>
  );
};

export default AuthLayout;
