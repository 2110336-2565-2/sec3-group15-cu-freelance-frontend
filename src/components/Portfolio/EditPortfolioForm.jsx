import tw from "twin.macro";
import React, { useContext, useEffect, useState } from "react";
import PortfolioExample from "../../assets/portFolioExample.svg";
import DeleteProIcon from "../../assets/DeleteProIcon.svg";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import HiddenIcon from "../../assets/HiddenIcon.svg";
import ImageUpload from "../share/ImageUpload";
import Input from "../share/Input";
import Button from "../share/Button";
import Modal from "../share/Modal";
import { VALIDATOR_REQUIRE } from "../share/Validate";
import { useForm } from "../../hooks/form-hook";
import { DUMMY_options } from "../../store/portfolioForm";
import { useNavigate, useParams } from "react-router-dom";
import { authClient } from "../../utils/auth";
import { apiClient } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";

const EditPortfolioForm = () => {
  const styles = {
    submitButton: () => [
      tw`w-[5%] bg-[#D62B70] text-white rounded-lg p-2 mb-[10px]
        disabled:opacity-30
        disabled:cursor-not-allowed`,
    ],
  };

  const FirstRow = tw.div`w-full flex justify-between pb-3`;
  const ContainButton = tw.div`flex justify-between w-[10%] h-[50px]`;
  const ImageButtonNotHidden = tw.img`hover:cursor-pointer`;
  const ImageButtonHidden = tw.img`opacity-25 hover:cursor-pointer`;
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
      navigate(`/profile/${authCtx.userInfo.id}`, { replace: true });
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
    const { portfolioName, description, category, image, price } =
      formState.inputs;
    try {
      setIsLoading(true);
      let data = JSON.stringify({
        category: category.value,
        description: description.value,
        price: parseInt(price.value),
        is_public: isVisible,
        name: portfolioName.value,
        userID: authCtx.userInfo.id,
      });
      const response = await apiClient.patch(`/portfolio/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log(response.data);
      navigate(`/profile/${authCtx.userInfo.id}`, { replace: true });
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
              {!isVisible && (
                <ImageButtonHidden src={HiddenIcon} onClick={toggleHandler} />
              )}
              {isVisible && (
                <ImageButtonNotHidden
                  src={HiddenIcon}
                  onClick={toggleHandler}
                />
              )}
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
