import React, { useRef, forwardRef } from "react";
import ReactDOM from "react-dom";
import tw, { styled } from "twin.macro";
import Backdrop from "./Backdrop";
import Button from "./Button";
import { CSSTransition } from "react-transition-group";
import "./ConfirmModal.css";

const animationTiming = {
  enter: 500,
  exit: 500,
};

const ModalOverlay = forwardRef((props, ref) => {
  const content = (
    <div
      ref={ref}
      tw="bg-white rounded-[20px] max-w-[351px] max-h-[280px] w-[90vw] h-fit flex flex-col fixed m-auto top-0 left-0 bottom-0 right-0 items-center p-2  justify-between z-[70]"
    >
      {props.content}
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

const ConfirmModal = (props) => {
  const nodeRef = useRef(null);
  return (
    <React.Fragment>
      <CSSTransition
        timeout={animationTiming}
        in={props.show}
        mountOnEnter
        unmountOnExit
      >
        <Backdrop onClick={props.onCancel} />
      </CSSTransition>
      <CSSTransition
        timeout={animationTiming}
        ref={nodeRef}
        in={props.show}
        mountOnEnter
        unmountOnExit
        classNames="fade"
      >
        <ModalOverlay {...props} ref={nodeRef} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default ConfirmModal;
