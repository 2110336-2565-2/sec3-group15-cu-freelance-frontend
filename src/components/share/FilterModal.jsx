import React from "react";
import ReactDOM from "react-dom";
import tw from "twin.macro";
import XIcon from "../../assets/XIcon.svg";
import Button from "./Button";

const HeaderFilter = tw.div` relative flex justify-center w-[100%] text-mobile-h1 font-bold mb-2`;
const FooterFilter = tw.div`w-full flex justify-between`;
const ModalOverlay = (props) => {
  const content = (
    <div tw="overflow-auto flex flex-col items-center p-4 h-[80vh] w-[100vw] z-30 absolute top-[20vh] left-0 bg-white rounded-t-[20px] shadow-navbar font-ibm">
      <HeaderFilter>
        ตัวกรอง
        <img src={XIcon} tw="absolute right-0 top-0" onClick={props.onClose} />
      </HeaderFilter>
      {props.content}
      <FooterFilter>
        <Button secondary width="40%" onClick={props.onReset}>
          {props.textBLeft}
        </Button>
        <Button primary width="40%" onClick={props.onSubmitPrice}>
          {props.textBRight}
        </Button>
      </FooterFilter>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("filter-hook"));
};

const FilterModal = (props) => {
  return (
    <React.Fragment>{props.show && <ModalOverlay {...props} />}</React.Fragment>
  );
};

export default FilterModal;
