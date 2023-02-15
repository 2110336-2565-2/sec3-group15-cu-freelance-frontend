import tw from "twin.macro";
import React, { useContext, useState } from "react";

import logo from "../../assets/logo.svg";
import LogoutIcon from "../../assets/LogoutIcon.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";
import { useNavigate } from "react-router-dom";
import { navbarButton } from "../../store/navbar-store";
import ImageNavbar from "../navbar/ImageNavbar";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "./Modal";

const Navbar = (props) => {
  const BigWrapper = tw.div` w-[100vw] h-[10vh]
  z-30 fixed top-0 left-0 pb-2 bg-white flex justify-center`;
  const Wrapper = tw.div` w-[90%] max-w-[1200px] h-[10vh] mx-auto fixed 
 flex justify-between items-center `;
  const LeftWrapper = tw.div`items-center w-[30%] flex justify-between font-inter min-w-[295px] h-[40%]`;
  const RightWrapperLogin = tw.div`w-[30%] flex justify-between font-inter min-w-[205px]`;
  const RightWrapperNotLogin = tw.div`w-[20%] flex justify-between font-inter min-w-[205px]`;

  const [isShow, setIsShow] = useState(false);
  const authCtx = useContext(AuthContext);
  const { login } = props;

  const navigate = useNavigate();
  const onClickLoginHandler = () => {
    navigate("/login");
  };
  const OnClickRegisterHandler = () => {
    navigate("/register");
  };

  const onCancelHandler = () => {
    document.body.style.overflow = "";
    setIsShow(false);
  };

  const onClickButtonHandler = (url) => {
    if (url === "/logout") {
      document.body.style.overflow = "hidden";
      setIsShow(true);
      return;
    } else if (url === "/modal") {
      authCtx.logout();
      onCancelHandler();
      url = "/home";
    } else if (url === "/profile") {
      url += `/${authCtx.userInfo.id}`;
    }
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  let Right;
  const Left = (
    <>
      <img
        src={logo}
        alt="logo"
        tw="w-[25%] cursor-pointer"
        onClick={onClickButtonHandler.bind(null, "/home")}
      />
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
    <>
      <Modal
        header={LogoutIcon}
        onCancel={onCancelHandler}
        text={"Do you wish to leave and log out?"}
        show={isShow}
        footer={
          <>
            <Button cancel onClick={onCancelHandler}>
              Cancel
            </Button>
            <Button onClick={onClickButtonHandler.bind(null, "/modal")}>
              Logout
            </Button>
          </>
        }
      />
      <BigWrapper>
        <Wrapper>
          <LeftWrapper>{Left}</LeftWrapper>
          {login && <RightWrapperLogin>{Right}</RightWrapperLogin>}
          {!login && <RightWrapperNotLogin>{Right}</RightWrapperNotLogin>}
        </Wrapper>
      </BigWrapper>
    </>
  );
};

export default Navbar;
