import tw from "twin.macro";
import React from "react";

import logo from "../../assets/logo.svg";
import Button from "./Button";

const Navbar = (props) => {
  const { login } = props;
  const Wrapper = tw.div`flex justify-around w-full mt-[5%] h-[20px]`;
  const LeftWrapper = tw.div`flex justify-around w-[100px]`;
  const RightWrapper = tw.div`flex justify-between w-[200px]`;

  let Right;
  const Left = (
    <>
      <img src={logo} alt="logo" />
      hello
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
      <RightWrapper>{Right}</RightWrapper>
    </Wrapper>
  );
};

export default Navbar;
