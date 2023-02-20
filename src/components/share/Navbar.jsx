import tw, { styled } from "twin.macro";
import React, { useContext, useState } from "react";

import LogoutIcon from "../../assets/LogoutIcon.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";
import { useNavigate } from "react-router-dom";
import { navbarButton } from "../../store/navbar-store";
import ImageNavbar from "../navbar/ImageNavbar";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "./Modal";
import NavDropdown from "../navbar/NavDropdown";
import NotificationIcon from "../../assets/NotificationIcon.svg";

const BigWrapper = styled.div(({ fixed }) => [
  tw`w-full h-[10vh]
z-30 pb-2 bg-white flex justify-center`,
  fixed && tw`fixed  top-0 left-0 `,
]);
const Wrapper = tw.div` w-[90%] max-w-[1200px] h-[10vh] mx-auto 
flex justify-between items-center `;
const SearchWrapper = tw.div`items-center w-[30%] flex justify-between font-inter min-w-[295px] h-[40%]`;
const RightWrapperLogin = tw.div`w-[25%] flex justify-between items-center font-inter min-w-[205px]`;
const RightWrapperNotLogin = tw.div`w-[25%] flex justify-between font-inter min-w-[290px]`;
const Logo = tw.div`font-bold text-2xl font-sans text-black cursor-pointer`;
const NotificationWrapper = tw.img`cursor-pointer`;

const Navbar = (props) => {
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

  if (login) {
    Right = (
      <>
        {authCtx.userInfo.display_name && (
          <NotificationWrapper src={NotificationIcon} />
        )}
        {/* {navbarButton.map((button, idx) => (
          <ImageNavbar
            key={idx}
            image={button.img}
            onClick={onClickButtonHandler.bind(null, button.to)}
          />
        ))} */}
        <NavDropdown setIsShow={setIsShow}/>
      </>
    );
  } else {
    Right = (
      <>
        <Button secondary onClick={onClickLoginHandler}>
          เข้าสู่ระบบ
        </Button>
        <Button primary onClick={OnClickRegisterHandler}>
          สมัครสมาชิก
        </Button>
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
            <Button primary onClick={onClickButtonHandler.bind(null, "/modal")}>
              Logout
            </Button>
          </>
        }
      />
      <BigWrapper fixed={props.fixed}>
        <Wrapper>
          <Logo
            onClick={() => {
              navigate("/home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            CU FREELANCE
          </Logo>
          {props.search && (
            <SearchWrapper>
              {" "}
              <InputSearch />
            </SearchWrapper>
          )}

          {login && <RightWrapperLogin>{Right}</RightWrapperLogin>}
          {!login && <RightWrapperNotLogin>{Right}</RightWrapperNotLogin>}
        </Wrapper>
      </BigWrapper>
    </>
  );
};

export default Navbar;
