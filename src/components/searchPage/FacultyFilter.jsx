import tw, { styled } from "twin.macro";

const ButtonText = styled.div(({ isSelected }) => [
  tw`w-[95%] cursor-pointer  mb-4 hover:underline-offset-8 hover:underline hover:decoration-[#D62B70] hover:decoration-2`,
  isSelected &&
    tw`underline-offset-8 underline decoration-[#D62B70] decoration-2
    `,
]);

const FacultyFilter = (props) => {
 
  return (
    <ButtonText
      isSelected={props.value === props.selectedFilter}
      onClick={() => {
        props.setSelectedFilter("faculty", props.value);
      }}
    >
      {props.text}
    </ButtonText>
  );
};

export default FacultyFilter;
