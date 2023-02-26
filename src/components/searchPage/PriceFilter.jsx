import tw from "twin.macro";

const Container = tw.form`w-full flex justify-between h-[40px] items-center font-bold font-ibm`;
const PriceBox = tw.input`w-2/5 h-full text-center font-medium focus:outline-none border rounded-md border-[#BCBCBC]`;

const PriceFilter = (props) => {
  
  return (
    <Container onSubmit={props.onSubmitPrice}>
      <PriceBox
        name="min"
        value={props.priceMin}
        onChange={props.onChangePrice}
        type="number"
        placeholder={props.placeMin}
      />
      -
      <PriceBox
        name="max"
        value={props.priceMax}
        onChange={props.onChangePrice}
        type="number"
        placeholder={props.placeMax}
      />
      <input type="submit" hidden/>
    </Container>
  );
};

export default PriceFilter;

