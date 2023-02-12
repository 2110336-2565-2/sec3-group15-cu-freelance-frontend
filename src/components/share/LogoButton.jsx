import Logo from "../../assets/logo.svg";
import tw from "twin.macro";
import { useNavigate } from "react-router-dom";
const LogoButton = () => {
  
  const styles = {
    image: () => [tw`my-[1%] w-[10%] box-border cursor-pointer`],
  };

  const navigate=useNavigate()

  return (
    <img
      css={styles.image}
      src={Logo}
      onClick={() => {
        navigate('/home');
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    />
  );
};

export default LogoButton;
