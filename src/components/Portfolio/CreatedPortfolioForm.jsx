import { useContext, useState } from "react";
import Input from "../share/Input";
import { useForm } from "../../hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { DUMMY_options } from "../../store/portfolioForm";
import { apiClient } from "../../utils/axios";
import ImageUpload from "../share/ImageUpload";
import tw from "twin.macro";
import { AuthContext } from "../../context/AuthProvider";
const CreatedPortfolioForm = () => {
  const styles = {
    submitButton: () => [
      tw`w-full bg-[#D62B70] text-white rounded-lg p-2
    disabled:opacity-30
    disabled:cursor-not-allowed`,
    ],
  };
  const authCtx = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
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
    },
    false
  );

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    const { portfolioName, description, category, image } = formState.inputs;
    try {
      let data = JSON.stringify({
        category:category.value,
        description_th: description.value,
        description_en: description.value,
        is_public: isVisible,
        name_th: portfolioName.value,
        name_en: portfolioName.value,
        userID: authCtx.userInfo.id,
      });
      const response = await apiClient.post("/portfolio/", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <form
      tw="w-[80%] mx-auto flex flex-col gap-y-6 my-2.5"
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
        <input
          type="checkbox"
          id="isVisible"
          tw="border-4 border-[#D62B70]"
          checked={isVisible}
          onChange={() => {
            setIsVisible((prev) => !prev);
          }}
        />
        <label htmlFor="isVisible">is visible?</label>
      </div>

      <button
        type="submit"
        css={styles.submitButton()}
        disabled={!formState.isValid}
      >
        Create
      </button>
    </form>
  );
};
export default CreatedPortfolioForm;
