import tw from "twin.macro";

const Footer = () => {
  const HeaderWrapper = tw.div`w-[90%] h-[5vh] max-w-[1150px] mx-auto text-[8px] dt:text-sm font-sans font-normal  flex justify-between 
  
  text-slate-600
  `;
  return (
      <HeaderWrapper>
        <div>© CU Freelance 2023</div>
        <div>Contact | Privacy Policy | Terms and Conditions</div>
      </HeaderWrapper>
  );
};

export default Footer;
