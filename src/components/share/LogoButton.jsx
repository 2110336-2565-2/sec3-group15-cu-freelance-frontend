import Logo from "../../assets/logo.svg";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
const LogoButton = () => {
  
  const styles = {
    logo: () => [tw`font-bold text-5xl font-sans text-black cursor-pointer`],
  };

  const navigate=useNavigate()

  return (
    <div
      css={styles.logo}
      onClick={() => {
        navigate('/home');
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >CU FREELANCE</div>
  );
};

export default LogoButton;
