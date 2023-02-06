import tw from "twin.macro";
import React from "react";

import logo from "../../assets/logo.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";

const Navbar = (props) => {
  const { login } = props;
  const BigWrapper = tw.div` w-[100vw] h-[10vh] mx-auto 
  z-10 fixed inset-0 pb-2 bg-white`;
  const Wrapper = tw.div` w-[90%] max-w-[1200px] h-[10vh] mx-auto 
 fixed inset-0 pb-2
  flex justify-between items-end `;
  const LeftWrapper = tw.div`items-center w-[30%] flex justify-between font-inter min-w-[295px]`;
  const RightWrapperLogin = tw.div`w-[30%] flex justify-between font-inter min-w-[200px]`;
  const RightWrapperNotLogin = tw.div`w-[20%] flex justify-between font-inter min-w-[160px]`;

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
    <BigWrapper>
      {" "}
      <Wrapper>
        <LeftWrapper>{Left}</LeftWrapper>
        {login && <RightWrapperLogin>{Right}</RightWrapperLogin>}
        {!login && <RightWrapperNotLogin>{Right}</RightWrapperNotLogin>}
      </Wrapper>
    </BigWrapper>
  );
};

export default Navbar;
