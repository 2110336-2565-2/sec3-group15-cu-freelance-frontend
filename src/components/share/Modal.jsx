import React, { useRef, forwardRef } from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const animationTiming = {
  enter: 600,
  exit: 1000,
};

const ModalOverlay = forwardRef((props, ref) => {
  const content = (
    <div
      ref={ref}
      tw="font-ibm text-xl fixed m-auto w-[30vw] min-w-[300px] min-h-[350px] py-8 top-0 bottom-0 left-0 right-0 z-[70] h-[400px] rounded-xl bg-white flex flex-col items-center justify-between"
    >
      <img src={props.header} tw="w-[35%]"></img>
      <div tw="text-center w-[90%] mb-2">{props.text}</div>
      <footer tw="flex mx-auto justify-between w-fit gap-x-[10px]">
        {props.footer}
      </footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

const Modal = (props) => {
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
        ref={nodeRef}
        timeout={animationTiming}
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

export default Modal;
