import React from "react";
import ReactDOM from "react-dom";
import tw, { styled } from "twin.macro";

const BackdropContainer = styled.div(({ z }) => [
  tw`fixed w-screen h-screen bg-black/50 top-0 left-0`,
  z === true && tw`z-[80]`,
  z === false && tw`z-[70]`,
]);

const Backdrop = ({ z = false, onClick }) => {
  console.log(onClick);
  return ReactDOM.createPortal(
    <BackdropContainer z={z} onClick={onClick} />,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
