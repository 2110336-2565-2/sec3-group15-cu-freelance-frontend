import { useState } from "react";
import tw, { styled } from "twin.macro";

const Button = styled.button(({ isSelect }) => [
  tw`px-5 font-ibm dt:text-desktop-h2 landing:px-10 py-1 rounded-[27px] flex gap-x-5 items-center transition-all duration-500 ease-linear`,
  isSelect && tw`bg-freelance-pink border-none text-white`,
  !isSelect && tw`bg-white border border-freelance-pink text-freelance-pink`,
]);
const ImgPink = styled.img(({ isSelect }) => [
  tw` w-[25px] landing:min-w-[34px]`,
  isSelect && tw`hidden`,
  !isSelect && tw`inline`,
]);
const ImgWhite = styled.img(({ isSelect }) => [
  tw`w-[25px] landing:min-w-[34px]`,
  isSelect && tw`inline`,
  !isSelect && tw`hidden`,
]);
const Text = styled.div(({ isSelect }) => [tw`hidden landing:inline`]);

const CategoryButton = ({
  text,
  isSelect,
  imgPink,
  imgWhite,
  setSelect,
  value,
}) => {
  console.log(text, isSelect);

  const handleClickCategoryButton = (event) => {
    event.preventDefault();
    console.log(value);
    setSelect(value);
  };

  return (
    <Button isSelect={isSelect} onClick={handleClickCategoryButton}>
      <ImgPink src={imgPink} isSelect={isSelect} alt="pink" />
      <ImgWhite src={imgWhite} isSelect={isSelect} alt="white" />
      <Text isSelect={isSelect}>{text}</Text>
    </Button>
  );
};

export default CategoryButton;
