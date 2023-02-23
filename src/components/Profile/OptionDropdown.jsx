import tw from "twin.macro";
import React from "react";
import { optionButton } from "../../store/option-store";
import ItemOptionDropdown from "./ItemOptionDropdown";

const DropdownContainer = tw.div`absolute h-auto bg-white w-1/2 right-0 top-full shadow-dropnav z-30`;
const ItemContainer = tw.ul`font-ibm flex flex-col`;

const OptionDropdown = ({
  onClickPencil,
  onClickOpenEye,
  onClickClosedEye,
  onClickDelete,
  isVisible,
}) => {
  return (
    <>
      <DropdownContainer>
        <ItemContainer>
          {optionButton.map((option, idx) => {
            let onClick,
              ch = 0;
            if (option.click === "edit") onClick = onClickPencil;
            else if (option.click === "open") {
              ch = 1;
              onClick = onClickOpenEye;
            } else if (option.click === "hide") {
              ch = 1;
              onClick = onClickClosedEye;
            } else if (option.click === "delete") onClick =onClickDelete;
            return (
              ((option.click === "open" && isVisible === false) ||
                (option.click === "hide" && isVisible === true) ||
                (option.click !== "hide" && option.click !== "open")) && (
                <ItemOptionDropdown
                  key={idx}
                  img={option.img}
                  text={option.text}
                  onClick={onClick}
                />
              )
            );
          })}
        </ItemContainer>
      </DropdownContainer>
    </>
  );
};

export default OptionDropdown;
