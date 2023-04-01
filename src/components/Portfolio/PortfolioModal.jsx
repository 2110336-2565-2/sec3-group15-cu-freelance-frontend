import React from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";
import Backdrop from "../share/Backdrop";
import XIcon from "../../assets/XIcon.svg";

const FirstRow = tw.div`relative flex justify-center mb-2`;

const ModalOverlay = (props) => {
  const content = (
    <div tw="font-ibm fixed m-auto w-screen h-screen py-2 top-0 bottom-0 left-0 right-0 bg-white z-[70] dt:max-w-[850px] dt:max-h-[80vh] shadow rounded-[10px]">
      <FirstRow>
        {props.header}
        <img src={XIcon} tw="absolute right-2 top-0" onClick={props.onClose} />
      </FirstRow>
      {props.content}
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modalorder-hook")
  );
};

const PortfolioModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onClose} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default PortfolioModal;
