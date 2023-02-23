import React from "react";
import tw from "twin.macro";

const Item = tw.li`flex h-[40px] items-center cursor-pointer hover:bg-gray-300 px-4 gap-x-2`;
const ImageItem = tw.img``;
const ItemOptionDropdown = ({ img, text,onClick }) => {
  return (
    <Item onClick={onClick}>
      <ImageItem src={img} alt="logo" />
      {text}
    </Item>
  );
};

export default ItemOptionDropdown;
