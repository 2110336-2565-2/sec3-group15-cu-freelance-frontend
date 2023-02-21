import React, { useContext, useEffect, useState, useRef } from "react";
import tw, { styled } from "twin.macro";
import { AuthContext } from "../../context/AuthProvider";
import NavAvatar from "../../assets/NavAvatar.svg";
import DownButton from "../../assets/DownButton.svg";
import { useNavigate } from "react-router-dom";
import { navbarButton } from "../../store/navbar-store";
import ImageNavbar from "./ImageNavbar";

const NavWrapper = styled.div(({ visible }) => [
  tw`relative w-[70%] h-[50px] rounded-[20px] px-2 flex shadow-navbar items-center justify-between cursor-pointer z-50`,
  visible && tw`rounded-b-none`,
]);
const AvatarWrapper = tw.img`w-[22%]`;
const DownButtonWrapper = tw.img``;
const DropdownWrapper = tw.div`absolute top-full left-0  w-full h-auto bg-white  rounded-b-[20px] shadow-dropnav`;
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
      url += `/${authCtx.userInfo.id}`;
    }
    navigate(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          {authCtx.userInfo.display_name}
          <DownButtonWrapper src={DownButton} />
          {isVisible && (
            <DropdownWrapper>
              <DropdownItemWrapper>
                {navbarButton.map((navbar, idx) => (
                  <ImageNavbar
                    key={idx}
                    image={navbar.img}
                    onClick={onClickButtonHandler.bind(null, navbar.to)}
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
