import tw, { styled } from "twin.macro";
import React, { useState } from "react";
import ArrowFilter from "../../assets/ArrowFilter.svg";

const Container = tw.div`h-auto mb-5 w-full`;
const Header = tw.div`mb-4 text-xl font-bold flex justify-between w-full cursor-pointer`;
const Arrow = styled.img(({ isOpen }) => [
  tw`transition-all duration-500 ease-in-out`,
  isOpen && tw`rotate-180`,
  !isOpen && tw`rotate-0`,
]);
const ChoiceContainer = styled.div(({ isOpen }) => [
  tw`w-full h-auto overflow-hidden flex flex-col items-end transition-all duration-500 ease-in-out`,
  !isOpen && tw`max-h-0 opacity-0`,
  isOpen && tw`max-h-[200vh] opacity-100`,
]);
const TemplateFilter = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Header
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {props.header}
        <Arrow src={ArrowFilter} isOpen={isOpen} />
      </Header>
      <ChoiceContainer isOpen={isOpen}>{props.children}</ChoiceContainer>
    </Container>
  );
};

export default TemplateFilter;
