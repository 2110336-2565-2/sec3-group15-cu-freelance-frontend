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
import { delay } from "../../utils/delay";
import { useWindow } from "../../hooks/window-hook";
import Suggestion from "./Suggestion";
const BigWrapper = styled.div(({ fixed, onSubmit }) => [
  tw`w-full py-1 dt:py-4
z-30 bg-white flex justify-center`,
  fixed && tw`fixed  top-0 left-0  `,
]);
const Wrapper = tw.div`h-[5vh] w-[90%] max-w-[1200px]  mx-auto 
flex justify-between items-center mt-2`;
const SearchWrapper = tw.div` hidden dt:flex dt:flex-col items-center w-[40%] max-w-[300px]  justify-between font-inter dt:min-w-[295px] h-[30px] dt:h-[45px]`;
const SuggestionList = styled.div(({ isHidden }) => [
  tw`flex flex-col place-self-start w-full bg-white border-2 border-gray-200 mt-1 rounded-lg`,
  isHidden && tw`hidden`,
]);
const RightWrapperLogin = tw.div` min-w-[80px] dt:w-1/4 dt:min-w-[250px] flex justify-end dt:justify-between items-center font-inter `;
const RightWrapperNotLogin = tw.div`min-w-[200px] flex justify-end gap-2 dt:gap-4 font-inter `;
const Logo = tw.div`text-sm whitespace-nowrap ip8:text-lg font-bold dt:text-2xl font-sans text-black cursor-pointer`;
const NotificationWrapper = tw.img` cursor-pointer w-[60px]`;

const Navbar = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [isSuggestHidden, setIsSuggestHidden] = useState(true);
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
  const onClickButtonHandler = async (url) => {
    if (url === "/logout") {
      document.body.style.overflow = "hidden";
      setIsShow(true);
      return;
    } else if (url === "/modal") {
      onCancelHandler();
      await delay(700);
      authCtx.logout();
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
  const suggestOnclickHandler = (text) => {
    props.setSearchResult(text);
    setIsSuggestHidden(true);
    navigate(`/search?pages=1&limit=6&keyword=${text}`);
  };
  const onFocusHandler = (event) => {
    event.preventDefault();
    // console.log('gg');
    setIsSuggestHidden(false);
  };
  let Right;
  const windowSize = useWindow();

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
        <Button
          secondary
          onClick={onClickLoginHandler}
          px={
            // windowSize >= 375 ? "1.5rem" : "0.75rem"
            windowSize >= 400
              ? windowSize >= 550
                ? "1.5rem"
                : "1.25rem"
              : "0.75rem"
          }
        >
          เข้าสู่ระบบ
        </Button>
        <Button
          primary
          onClick={OnClickRegisterHandler}
          px={
            windowSize >= 400
              ? windowSize >= 550
                ? "1.5rem"
                : "1.25rem"
              : "0.75rem"
          }
        >
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
                onFocus={onFocusHandler}
                placeholder={
                  props.placeholder
                    ? props.placeholder
                    : "ค้นหางานที่ต้องการ..."
                }
              />
              {props.suggestList && (
                <SuggestionList
                  isHidden={
                    isSuggestHidden ||
                    !props.searchResult ||
                    !props.fetchFinished
                  }
                >
                  {props.suggestList.length != 0 ? (
                    props.suggestList.map((suggest, i) => {
                      return (
                        <Suggestion
                          text={suggest}
                          key={i}
                          onClick={suggestOnclickHandler.bind(null, suggest)}
                        />
                      );
                    })
                  ) : (
                    <Suggestion def />
                  )}
                </SuggestionList>
              )}
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
