import React from "react";
import ReactDOM from "react-dom";
import tw, { styled } from "twin.macro";
import Backdrop from "./Backdrop";
import Button from "./Button";
const ModalOverlay = (props) => {
  const Container = styled.div(({}) => [
    tw`bg-white rounded-[20px] w-[90vw] h-1/3 flex flex-col fixed m-auto top-0 left-0 bottom-0 right-0 items-center p-2  justify-between z-[70]`,
  ]);

  const content = <Container>{props.content}</Container>;
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const ConfirmModal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default ConfirmModal;
