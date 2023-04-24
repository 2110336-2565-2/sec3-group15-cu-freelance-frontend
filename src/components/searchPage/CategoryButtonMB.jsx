import tw, { styled } from "twin.macro";
const Button = styled.button(({ isSelect }) => [
  tw`px-6 py-2 font-ibm rounded-[27px] flex gap-x-2 items-center transition-all duration-500 ease-linear`,
  isSelect && tw`py-2.5 bg-freelance-pink border-none text-white`,
  !isSelect && tw` bg-white border border-freelance-black-secondary text-black`,
]);
const ImgPink = styled.img(({ isSelect }) => [
  tw` w-[25px] dt:min-w-[34px]`,
  isSelect && tw`hidden`,
  !isSelect && tw`inline`,
]);
const ImgWhite = styled.img(({ isSelect }) => [
  tw`w-[25px] dt:min-w-[34px]`,
  isSelect && tw`inline`,
  !isSelect && tw`hidden`,
]);
const Text = styled.div(({ isSelect }) => [
  isSelect && tw`inline  `,
  !isSelect && tw`hidden`,
]);
const CategoryButtonMB = ({
  text,
  isSelect,
  imgPink,
  imgWhite,
  setSelect,
  value,
}) => {
  const handleClickCategoryButton = (event) => {
    event.preventDefault();
    setSelect("category", value);
  };

  return (
    <Button isSelect={isSelect} onClick={handleClickCategoryButton}>
      <ImgPink src={imgPink} isSelect={isSelect} alt="pink" />
      <ImgWhite src={imgWhite} isSelect={isSelect} alt="white" />
      <Text isSelect={isSelect}>{text}</Text>
    </Button>
  );
};

export default CategoryButtonMB;
