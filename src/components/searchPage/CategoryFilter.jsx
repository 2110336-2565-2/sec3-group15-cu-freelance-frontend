import tw, { styled } from "twin.macro";

const ButtonText = styled.div(({ isSelected }) => [
  tw`cursor-pointer w-full mb-4 hover:underline-offset-8 hover:underline hover:decoration-[#D62B70] hover:decoration-2`,
  isSelected &&
    tw`underline-offset-8 underline decoration-[#D62B70] decoration-2
    `,
]);

const CategoryFilter = (props) => {
  return (
    <ButtonText
      isSelected={props.value === props.selectedFilter}
      onClick={() => {
        props.setSelectedFilter(props.value);
      }}
    >
      {props.text}
    </ButtonText>
  );
};

export default CategoryFilter;
