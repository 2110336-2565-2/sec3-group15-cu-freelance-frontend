import React from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";

const BackdropConfirm = (props) => {
  return ReactDOM.createPortal(
    <div
      tw="fixed z-[80] w-screen h-screen bg-black/50 top-0 left-0"
      onClick={props.onClick}
    ></div>,
    document.getElementById("backdrop-confirm-hook")
  );
};

export default BackdropConfirm;
