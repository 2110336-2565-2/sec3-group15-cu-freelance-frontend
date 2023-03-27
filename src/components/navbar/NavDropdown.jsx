import React, { useContext, useEffect, useState, useRef } from "react";
import tw, { styled } from "twin.macro";
import { AuthContext } from "../../context/AuthProvider";
import NavAvatar from "../../assets/NavAvatar.svg";
import DownButton from "../../assets/ArrowFilter.svg";
import { useNavigate } from "react-router-dom";
import { navbarButton } from "../../store/navbar-store";
import ImageNavbar from "./ImageNavbar";

const NavWrapper = styled.div(({ visible }) => [
  tw`relative w-[90%] h-[35px] dt:w-[70%] dt:h-[50px] rounded-[20px] px-2 flex shadow-navbar items-center justify-between cursor-pointer z-50`,
  visible && tw`rounded-b-none`,
]);
const DisplayNameWrapper = tw.div`hidden dt:inline`;
const AvatarWrapper = tw.img`w-[50%] dt:w-[22%]`;
const DownButtonWrapper = tw.img``;
const DropdownWrapper = tw.div`w-[150%]  absolute right-0 top-full rounded-b-[20px] h-auto bg-white   shadow-dropnav dt:left-0  dt:w-full  `;
const DropdownItemWrapper = tw.ul`flex flex-col`;

const NavDropdown = ({ setIsShow }) => {
  const authCtx = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const closeHandler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", closeHandler);

    return () => {
      document.removeEventListener("mousedown", closeHandler);
    };
  }, []);

  const openDropdownHandler = () => {
    setIsVisible((prev) => !prev);
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
      url += `/${authCtx.userInfo.id}?pages=1`;
    } else if (url === "/my-order") {
      if (authCtx.userInfo.user_type === 1) url += "?q=request";
      else url += "?q=template";
    }
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  function getWindowSize() {
    const { innerWidth } = window;
    return innerWidth;
  }
  const [windowSize, setWindowSize] = useState(getWindowSize());
  console.log(windowSize);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <>
      {!authCtx.userInfo.display_name && "Loading..."}
      {authCtx.userInfo.display_name && (
        <NavWrapper
          onClick={openDropdownHandler}
          visible={isVisible}
          ref={menuRef}
        >
          <AvatarWrapper src={NavAvatar} alt="Avatar" />
          <DisplayNameWrapper>
            {authCtx.userInfo.display_name}
          </DisplayNameWrapper>
          <DownButtonWrapper src={DownButton} />
          {isVisible && (
            <DropdownWrapper>
              <DropdownItemWrapper>
                {navbarButton.map((navbar, idx) => (
                  <ImageNavbar
                    key={idx}
                    image={navbar.img}
                    onClick={onClickButtonHandler.bind(null, navbar.to=='/edit-profile' && windowSize<850 ? "/home" : navbar.to)}
                    text={navbar.text}
                    last={idx === navbarButton.length - 1}
                  />
                ))}
              </DropdownItemWrapper>
            </DropdownWrapper>
          )}
        </NavWrapper>
      )}
    </>
  );
};

export default NavDropdown;
