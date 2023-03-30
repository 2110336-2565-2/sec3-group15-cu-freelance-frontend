import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import LoadingSpinner from "./LoadingSpinner";
import tw from "twin.macro";

const ModalOverlay = (props) => {
  const content = (
    <div tw="w-screen h-screen m-auto z-[70] fixed top-0 left-0 flex justify-center items-center font-ibm">
      <div tw="w-[300px] h-[300px] flex flex-col items-center justify-center bg-white rounded-[20px] gap-y-[5%]">
        {props.pic ? props.pic : <LoadingSpinner />}
        <div tw="font-bold text-mobile-h1">{props.header}</div>
        <div tw="text-freelance-black-secondary w-[80%] text-center text-mobile-h2">
          {props.desc}
        </div>
      </div>
      {props.footer}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const LoadingModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default LoadingModal;
