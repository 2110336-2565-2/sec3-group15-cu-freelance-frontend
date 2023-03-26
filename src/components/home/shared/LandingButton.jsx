import tw, { styled } from "twin.macro";

const VariantButton = styled.button(({ type }) => [
  tw`font-ibm hover:outline-none dt:text-desktop-h2 rounded-[27px] px-10 py-2`,
  type === "primary" && tw`bg-freelance-pink text-white`,
  type === "secondary" && tw`bg-white text-black`,
  type === "onlyborder" &&
    tw`border border-freelance-pink bg-white text-freelance-pink`,
]);

const LandingButton = ({ children, type, onClick = null }) => {
  return (
    <VariantButton type={type} onClick={onClick}>
      {children}
    </VariantButton>
  );
};

export default LandingButton;
