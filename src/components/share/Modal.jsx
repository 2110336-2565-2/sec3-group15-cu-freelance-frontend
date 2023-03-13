import React from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";
import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const content = (
    <div tw="font-ibm text-xl fixed m-auto w-[400px] min-h-[350px] py-8 top-0 bottom-0 left-0 right-0 z-[70] h-[35vh] rounded-xl bg-white flex flex-col items-center justify-between">
      <img src={props.header} tw="w-[35%]"></img>
      <div tw="text-center w-[90%]">{props.text}</div>
      <footer tw="flex mx-auto justify-between">{props.footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default Modal;
