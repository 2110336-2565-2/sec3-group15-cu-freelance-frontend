import React from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";
import Backdrop from "./Backdrop";
import XIcon from "../../assets/XIcon.svg";

const FirstRow = tw.div`relative flex justify-center mb-2`;

const ModalOverlay = (props) => {
  const content = (
    <div tw="font-ibm fixed m-auto w-full h-full max-w-[600px] max-h-[800px] py-2 px-3 top-0 bottom-0 left-0 right-0 bg-white z-[70] dt:rounded-[20px]">
      <FirstRow>
        {props.header}
        <img src={XIcon} tw="absolute right-0 top-0" onClick={props.onClose} />
      </FirstRow>
      {props.content}
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modalorder-hook")
  );
};

const OrderModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default OrderModal;
