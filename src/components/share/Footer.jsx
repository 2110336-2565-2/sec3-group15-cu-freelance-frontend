import tw from "twin.macro";
import { useNavigate } from "react-router-dom";

const Footer = ({ isLogin }) => {
  const HeaderWrapper = tw.div`w-[90%] h-[5vh] max-w-[1150px] mx-auto text-[8px] dt:text-sm  font-normal  flex justify-between 
  font-ibm
  text-slate-600
  `;

  const navigate = useNavigate();

  const handleClickSupport = () => {
    navigate("/support");
  };

  return (
    <HeaderWrapper>
      <div>© CU Freelance 2023</div>
      {isLogin && (
        <div
          tw="hover:text-freelance-pink cursor-pointer"
          onClick={handleClickSupport}
        >
          เเจ้งปัญหา
        </div>
      )}
      {!isLogin && <div>ติดต่อเราได้ที่: support@cu-freelance.com</div>}
    </HeaderWrapper>
  );
};

export default Footer;
