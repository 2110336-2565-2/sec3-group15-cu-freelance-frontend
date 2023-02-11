import tw from "twin.macro";
import React, { useContext } from "react";

import logo from "../../assets/logo.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";
import { useNavigate } from "react-router-dom";
import { navbarButton } from "../../store/navbar-store";
import ImageNavbar from "../navbar/ImageNavbar";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = (props) => {

  const authCtx=useContext(AuthContext)
  const { login } = props;
  const BigWrapper = tw.div` w-[100vw] h-[10vh]
  z-10 fixed top-0 left-0 pb-2 bg-white flex justify-center`;
  const Wrapper = tw.div` w-[90%] max-w-[1200px] h-[10vh] mx-auto fixed 
 flex justify-between items-center `;
  const LeftWrapper = tw.div`items-center w-[30%] flex justify-between font-inter min-w-[295px] h-[40%]`;
  const RightWrapperLogin = tw.div`w-[30%] flex justify-between font-inter min-w-[205px]`;
  const RightWrapperNotLogin = tw.div`w-[20%] flex justify-between font-inter min-w-[205px]`;
  const navigate = useNavigate();
  const onClickLoginHandler = () => {
    navigate("/login");
  };
  const OnClickRegisterHandler = () => {
    navigate("/register");
  };
  const onClickButtonHandler = (url) => {
    if(url==="/login"){
      authCtx.logout()
      url="/home"
    }
    else if(url==="/profile"){
      url+=`/${authCtx.userInfo.id}`
    }
    navigate(url);
  };
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
        {navbarButton.map((button, idx) => (
          <ImageNavbar
            key={idx}
            image={button.img}
            onClick={onClickButtonHandler.bind(null, button.to)}
          />
        ))}
      </>
    );
  } else {
    Right = (
      <>
        <Button noBG onClick={onClickLoginHandler}>
          Login
        </Button>
        <Button onClick={OnClickRegisterHandler}>Sign Up</Button>
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
