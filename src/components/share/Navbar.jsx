import tw from "twin.macro";
import React from "react";

import logo from "../../assets/logo.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";

const Navbar = (props) => {
  const { login } = props;
  const Wrapper = tw.div`fixed inset-x-0 flex justify-between  w-[1500px] mt-[5vh] h-[5vh] mx-auto`;
  const LeftWrapper = tw.div`flex justify-between items-center w-[445px]`;
  const RightWrapperLogin = tw.div`flex justify-between w-[150px]`;
  const RightWrapperNotLogin = tw.div`flex justify-between w-[265px]`;

  let Right;
  const Left = (
    <>
      <img src={logo} alt="logo" tw="w-[116px]"/>
      <InputSearch/>
    </>
  );
  if (login) {
    Right = (
      <>
        <img src="" />
        <img src="" />
        <img src="" />
        <img src="" />
      </>
    );
  } else {
    Right = (
      <>
        <Button noBG>Login</Button>
        <Button>Sign Up</Button>
      </>
    );
  }

  return (
    <Wrapper>
      <LeftWrapper>{Left}</LeftWrapper>
      {login&&<RightWrapperLogin>{Right}</RightWrapperLogin>}
      {!login&&<RightWrapperNotLogin>{Right}</RightWrapperNotLogin>}
    </Wrapper>
  );
};

export default Navbar;
