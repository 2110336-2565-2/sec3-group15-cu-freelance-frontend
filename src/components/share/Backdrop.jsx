import React from 'react';
import ReactDOM from 'react-dom';
import tw from "twin.macro";

const Backdrop = props => {
  return ReactDOM.createPortal(
    <div tw="fixed z-50 w-screen h-screen bg-black/50 top-0 left-0" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
