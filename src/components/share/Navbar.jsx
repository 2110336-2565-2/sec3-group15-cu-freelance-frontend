import tw from "twin.macro";
import React from "react";

import logo from "../../assets/logo.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";

const Navbar = (props) => {
  const { login } = props;
  const Wrapper = tw.div` w-[90%] max-w-[1200px] mt-[5vh] h-[5vh] mx-auto 
  z-10 fixed inset-0 
  flex justify-between `;
  const LeftWrapper = tw.div`items-center w-[30%] flex justify-between `;
  const RightWrapperLogin = tw.div`w-[30%] flex justify-between `;
  const RightWrapperNotLogin = tw.div`w-[20%] flex justify-between `;

  let Right;
  const Left = (
    <>
      <img src={logo} alt="logo" tw="w-[25%]" />
      <InputSearch />
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
      {login && <RightWrapperLogin>{Right}</RightWrapperLogin>}
      {!login && <RightWrapperNotLogin>{Right}</RightWrapperNotLogin>}
    </Wrapper>
  );
};

export default Navbar;
