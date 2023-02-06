import tw from "twin.macro";

const Footer = () => {
  const HeaderWrapper = tw.div`w-[100vw] h-[5vh] max-w-[1150px] mx-auto text-sm font-sans font-normal text-[#D62B70] flex justify-between`;
  return (
      <HeaderWrapper>
        <div>© CU Freelance 2023</div>
        <div>Contact | Privacy Policy | Terms and Conditions</div>
      </HeaderWrapper>
  );
};

export default Footer;
