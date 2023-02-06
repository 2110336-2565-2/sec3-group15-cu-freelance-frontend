import tw from "twin.macro";

const Footer = () => {
  const Wrapper = tw.div`w-[100vw]`;
  const HeaderWrapper = tw.div`w-[90%] max-w-[1150px] mx-auto h-[5vh] text-sm font-sans font-normal text-[#D62B70] flex justify-between`;
  return (
    <Wrapper>
      {" "}
      <HeaderWrapper>
        <div>© CU Freelance 2023</div>
        <div>Contact | Privacy Policy | Terms and Conditions</div>
      </HeaderWrapper>
    </Wrapper>
  );
};

export default Footer;
