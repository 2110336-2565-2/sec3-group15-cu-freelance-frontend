import Input from "../share/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { DUMMY_options } from "../../store/portfolioForm";
import ImageUpload from "../share/ImageUpload";
import tw from "twin.macro";
const CreatedPortfolioForm = () => {
  const styles = {
    submitButton: () => [tw`w-full bg-[#D62B70] text-white rounded-lg p-2`],
  };

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
      image: {
        value: null,
        isValid: false,
      },
      isVisible: {
        value: false,
        isValid: false,
      },
    },
    false
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs.image.value);
  };

  return (
    <form
      tw="w-[80%] mx-auto h-[90%] flex flex-col gap-y-6 my-2.5"
      onSubmit={onSubmitHandler}
    >
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
        errorText="Please select category"
        validator={[VALIDATOR_REQUIRE()]}
      />
      <ImageUpload
        id="image"
        onInput={inputHandler}
        errorText="Please provide an image."
      />
      <div tw="flex  gap-x-2">
        {" "}
        <input type="checkbox" id="isVisible"  tw="border-4 border-[#D62B70]"/>
        <label htmlFor="isVisible">is visible?</label>
      </div>

      <button type="submit" css={styles.submitButton()}>
        Create
      </button>
    </form>
  );
};
export default CreatedPortfolioForm;
