import tw from "twin.macro";
import XIcon from "../../assets/XIcon.svg";
const Container = tw.div`p-2 flex gap-2 items-center text-mobile-body text-freelance-black-primary font-ibm border rounded-2xl border-freelance-black-secondary`;
const Cross = tw.img`cursor-pointer`;

const FilterButton = (props) => {
  return (
    <Container>
      {props.text}
      <Cross src={XIcon} onClick={props.onClick} />
    </Container>
  );
};

export default FilterButton;
