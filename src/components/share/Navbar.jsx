import tw, { styled } from "twin.macro";
import React, { useContext, useState } from "react";

import LogoutIcon from "../../assets/LogoutIcon.svg";
import Button from "./Button";
import InputSearch from "./InputSearch";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import Modal from "./Modal";
import NavDropdown from "../navbar/NavDropdown";
import NotificationIcon from "../../assets/NotificationIcon.svg";

const BigWrapper = styled.div(({ fixed, onSubmit }) => [
  tw`w-full h-[10vh]
z-30 bg-white flex justify-center`,
  fixed && tw`fixed  top-0 left-0  `,
]);
const Wrapper = tw.div` w-[90%] max-w-[1200px] h-[10vh] mx-auto 
flex justify-between items-center`;
const SearchWrapper = tw.div` items-center w-[30%] flex justify-between font-inter dt:min-w-[295px] h-[40%]`;
const RightWrapperLogin = tw.div`w-[12%] min-w-[80px] dt:w-1/4 dt:min-w-[205px] flex justify-end dt:justify-between items-center font-inter `;
const RightWrapperNotLogin = tw.div`w-[12%] min-w-[80px] dt:min-w-[290px] flex justify-end dt:justify-between font-inter `;
const Logo = tw.div`text-lg font-bold dt:text-2xl font-sans text-black cursor-pointer`;
const NotificationWrapper = tw.img`hidden dt:inline cursor-pointer`;

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
    } else if (url === "/my-order") {
      if (authCtx.userInfo.user_type === 1) url += "?q=request";
      else url += "?q=template&pages=1";
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
        <NavDropdown setIsShow={setIsShow} />
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
        text={"คุณแน่ใจหรือไม่ที่จะออกจากระบบ"}
        show={isShow}
        footer={
          <div tw="flex flex-row gap-2">
            <Button secondary onClick={onCancelHandler}>
              ยกเลิก
            </Button>
            <Button primary onClick={onClickButtonHandler.bind(null, "/modal")}>
              ออกจากระบบ
            </Button>
          </div>
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
              <InputSearch
                onSubmit={props.onSubmit}
                onChange={props.onChange}
                value={props.searchResult}
                placeholder="ค้นหางานที่ต้องการ..."
              />
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
