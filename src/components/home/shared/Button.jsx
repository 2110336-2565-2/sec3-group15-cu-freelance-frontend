import tw, { styled } from "twin.macro";

const VariantButton = styled.button(({ type }) => [
  type === "primary" && tw`bg-freelance-pink`,
  type === "secondary" && tw`bg-white`,
  type === "category" && tw`border border-freelance-pink bg-white`,
]);

const Button = () => {};
