import Input from "../share/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { DUMMY_options } from "../../store/portfolioForm";
import tw from "twin.macro";
const CreatedPortfolioForm = () => {
  const [formState, inputHandler] = useForm(
    {
      portfolioName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      
    },
    false
  );
  return (
    <form tw="w-[80%] mx-auto h-[90%]">
      <Input
        type="text"
        id="portfolioName"
        label="Portfolio Name"
        placeholder="Enter portfolio name"
        errorText="Your portfolio name should not be blank"
        onInput={inputHandler}
        validator={[VALIDATOR_REQUIRE()]}
      />
       <Input
        type="textarea"
        id="description"
        label="Description"
        placeholder="Enter description"
        errorText="Description should not be blank"
        onInput={inputHandler}
        validator={[VALIDATOR_REQUIRE()]}
      />
      <Input
        type="select"
        id="category"
        label="Category"
        options={DUMMY_options}
        onInput={inputHandler}
        validator={[]}
      />
    </form>
  );
};
export default CreatedPortfolioForm;
