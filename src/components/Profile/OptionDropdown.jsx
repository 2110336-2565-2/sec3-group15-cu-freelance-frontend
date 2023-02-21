import tw from "twin.macro";
import React, { useRef, useEffect } from "react";
import { optionButton } from "../../store/option-store";
import ItemOptionDropdown from "./ItemOptionDropdown";

const DropdownContainer = tw.div`absolute h-auto bg-white w-1/2 right-0 top-full shadow-dropnav z-40`;
const ItemContainer = tw.ul`font-ibm flex flex-col`;

const OptionDropdown = ({
  onClickPencil,
  onClickOpenEye,
  onClickClosedEye,
  isVisible,
}) => {
  
  return (
    <>
      <DropdownContainer>
        <ItemContainer>
          {optionButton.map((option, idx) => {
            let onClick;
            if (option.click === "edit") onClick = onClickPencil;
            else if (option.click === "open") onClick = onClickOpenEye;
            else if (option.click === "hide") onClick = onClickClosedEye;
            else if (option.click === "delete") onClick = () => {};
            return (
              <ItemOptionDropdown
                key={idx}
                img={option.img}
                text={option.text}
                onClick={onClick}
              />
            );
          })}
        </ItemContainer>
      </DropdownContainer>
    </>
  );
};

export default OptionDropdown;
