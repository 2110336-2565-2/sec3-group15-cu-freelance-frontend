import tw from "twin.macro";
import React, { useContext, useEffect, useState } from "react";
import PortfolioExample from "../../assets/PortfolioExample.svg";
import DeleteProIcon from "../../assets/DeleteProIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import HiddenIcon from "../../assets/HiddenIcon.svg";
import CloseEyeIcon from "../../assets/SmallCloseEyeIcon.svg";
import ImageUpload from "../share/ImageUpload";
import Input from "../share/Input";
import Button from "../share/Button";
import Modal from "../share/Modal";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { useForm } from "../../hooks/form-hook";
import {
  DUMMY_duration_options,
  DUMMY_options,
} from "../../store/portfolioForm";
import { useNavigate, useParams } from "react-router-dom";
import { authClient } from "../../utils/auth";
import { apiClient } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";

const styles = {
  submitButton: () => [
    tw`w-[5%] bg-[#D62B70] text-white rounded-lg p-2 mb-[10px]
      disabled:opacity-30
      disabled:cursor-not-allowed`,
  ],
  imageButtonHidden: ({ hidden }) => [
    tw`hover:cursor-pointer`,
    hidden && tw`hidden`,
  ],
};

const EditPortfolioForm = () => {
  

  const FirstRow = tw.div`w-full flex justify-between pb-3`;
  const ContainButton = tw.div`flex justify-between w-[10%] h-[50px]`;
  const ImageButtonDelete = tw.img`hover:cursor-pointer`;
  const ImageContainer = tw.img`rounded-3xl`;

  const authCtx = useContext(AuthContext);
  const params = useParams();
  const id = params.portId;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [portfolio, setPortfolio] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isShow, setIsShow] = useState(false);

  const toggleHandler = () => {
    setIsVisible((prev) => !prev);
  };

  const onClickDeleteHandler = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.delete(`/portfolio/${id}`);
      console.log(response.data);
      document.body.style.overflow = "";
      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const onDeleteHandler = () => {
    setIsShow(true);
    document.body.style.overflow = "hidden";
  };

  const onCancelHandler = () => {
    setIsShow(false);
    document.body.style.overflow = "";
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const { portfolioName, description, category, image, price, duration } =
      formState.inputs;
    try {
      setIsLoading(true);
      let data = JSON.stringify({
        category: category.value,
        description: description.value,
        price: parseFloat(price.value),
        duration: parseInt(duration.value),
        is_public: isVisible,
        name: portfolioName.value,
        userID: authCtx.userInfo.id,
      });
      const response = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      navigate(-1, { replace: true });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(`/portfolio/me/${id}`);
        console.log(response.data);
        setFormData(
          {
            portfolioName: {
              value: response.data.portfolio.name,
              isValid: true,
            },
            price: {
              value: response.data.portfolio.price,
              isValid: true,
            },
            description: {
              value: response.data.portfolio.description,
              isValid: true,
            },

            category: {
              value: response.data.portfolio.category,
              isValid: true,
            },
            duration: {
              value: response.data.portfolio.duration,
              isValid: true,
            },
          },
          true
        );
        setPortfolio(response.data.portfolio);
        setIsVisible(response.data.portfolio.is_public);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const [formState, inputHandler, setFormData] = useForm(
    {
      portfolioName: {
        value: "",
        isValid: false,
      },
      price: {
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
      duration: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: true,
      },
    },
    false
  );

  if (portfolio) {
    return (
      <>
        <Modal
          header={DeleteIcon}
          onCancel={onCancelHandler}
          text={
            "Do you really want to delete this portfolio? This process cannot be undone."
          }
          show={isShow}
          footer={
            <>
              <Button cancel disable={isLoading} onClick={onCancelHandler}>
                Cancel
              </Button>
              <Button
                deleted
                disable={isLoading}
                onClick={onClickDeleteHandler}
              >
                Delete
              </Button>
            </>
          }
        />
        <form
          tw="w-full h-full gap-y-6 flex flex-col"
          onSubmit={onSubmitHandler}
        >
          <FirstRow>
            <ImageContainer src={PortfolioExample} />
            <ContainButton>
              <img
                css={styles.imageButtonHidden({hidden:isVisible})}
                src={CloseEyeIcon}
                onClick={toggleHandler}
              />

              <img
                css={styles.imageButtonHidden({hidden:!isVisible})}
                src={HiddenIcon}
                onClick={toggleHandler}
              />

              <ImageButtonDelete
                src={DeleteProIcon}
                onClick={onDeleteHandler}
              />
            </ContainButton>
          </FirstRow>

          <ImageUpload
            id="image"
            onInput={inputHandler}
            text="Change Photo"
            errorText="Please provide an image."
            isValid={true}
          />

          <Input
            type="select"
            id="category"
            label="Category"
            options={DUMMY_options}
            onInput={inputHandler}
            errorText="Please select category"
            validator={[VALIDATOR_REQUIRE()]}
            initialValue={portfolio.category}
            initialValid={true}
            required
          />
          <Input
            type="select"
            id="duration"
            label="Duration"
            options={DUMMY_duration_options}
            onInput={inputHandler}
            errorText="Please select duration"
            validator={[VALIDATOR_REQUIRE()]}
            initialValue={portfolio.duration}
            initialValid={true}
            required
          />
          <Input
            type="text"
            id="portfolioName"
            label="Portfolio Name"
            placeholder="Enter portfolio name"
            errorText="Your portfolio name should not be blank"
            onInput={inputHandler}
            validator={[VALIDATOR_REQUIRE()]}
            initialValue={portfolio.name}
            initialValid={true}
            required
          />
          <Input
            type="textarea"
            id="description"
            label="Description"
            placeholder="Enter description"
            errorText="Description should not be blank"
            onInput={inputHandler}
            validator={[VALIDATOR_REQUIRE()]}
            initialValue={portfolio.description}
            initialValid={true}
            required
          />
          <Input
            type="number"
            id="price"
            label="Price"
            placeholder="Enter price"
            errorText="Your price should not be blank"
            onInput={inputHandler}
            validator={[VALIDATOR_REQUIRE()]}
            min="0"
            step=".01"
            initialValue={portfolio.price}
            initialValid={true}
            required
          />
          <button
            type="submit"
            css={styles.submitButton()}
            disabled={!formState.isValid | isLoading}
          >
            {(isLoading && "Loading...") || "Edit"}
          </button>
        </form>
      </>
    );
  } else {
    return "loading...";
  }
};

export default EditPortfolioForm;
