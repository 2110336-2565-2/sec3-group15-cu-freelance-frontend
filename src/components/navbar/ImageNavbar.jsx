import tw, { styled } from "twin.macro";
const ItemWrapper = styled.li(({ last }) => [
  tw`flex hover:bg-[#D62B70] hover:text-white items-center font-ibm gap-x-5 p-2 border-t-2`,
  last && tw`hover:rounded-b-[20px]`,
]);
const ImageNavbar = ({ image, onClick, text,last }) => {

  return (
    <ItemWrapper onClick={onClick} last={last}>
      <img src={image} tw="w-[20%]" />
      <span tw="text-base">{text}</span>
    </ItemWrapper >
  );
};

export default ImageNavbar;
